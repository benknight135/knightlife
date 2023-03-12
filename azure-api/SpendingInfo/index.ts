import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { OpenBankingApiConfig, OpenBankingApiHelper, SpendingInfoResponse, SpendingInfoSavingCategory } from "knightlife-api";
import { AccountsFetchResponse, TransactionsFetchResponse } from "knightlife-api";
import { BalanceFetchResponse } from "knightlife-api";
import { Account, AccountsInfo } from "knightlife-api";
import { SpendingAnalysis } from "knightlife-api";
import { SpendingInfoCategory } from "knightlife-api";
import { SpendingInfoIncomeCategory, SpendingInfoSubscriptionCategory } from "knightlife-api";
import { SpendingInfoSpendingCategory } from "knightlife-api";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a spending info request.');

    if (!req.body) {
        var error = "Missing request body";
        context.log(error);
        context.res = {
            status: 400,
            body: { error: error }
        };
    }

    var token = req.body.token;
    var openBankingApiConfigReq = req.body.openBankingApiConfig;
    if (!token || !openBankingApiConfigReq) {
        var error = "Missing parameters: ";
        if (!token) { error += " token "; }
        if (!openBankingApiConfigReq) { error += " openBankingApiConfig "; }
        context.log(error);
        context.res = {
            status: 400,
            body: { error: error }
        };
        return;
    }

    var openBankingApiConfig: OpenBankingApiConfig = Object.assign(openBankingApiConfigReq);
    var accountsFetch: AccountsFetchResponse = await OpenBankingApiHelper.fetchAccounts(openBankingApiConfig, token);
    if (accountsFetch.body.error) {
        var error = "Failed to fetch accounts: " + accountsFetch.body.error;
        context.log(error);
        context.res = {
            status: 400,
            body: { error: error }
        };
        return;
    }

    context.log("Processing accounts...");

    var accountsInfo: AccountsInfo = []
    for (var i = 0; i < accountsFetch.body.accounts.length; i++) {
        var account: Account = accountsFetch.body.accounts[i];
        var accountId: string = account.id;

        context.log("Fetching balance for account: " + account.name);

        var balanceFetch: BalanceFetchResponse = await OpenBankingApiHelper.fetchBalance(
            openBankingApiConfig, token, accountId);
        if (balanceFetch.body.error) {
            var error = "Failed to fetch balance: " + balanceFetch.body.error;
            context.log(error);
            context.res = {
                status: 400,
                body: { error: error }
            };
            return;
        }

        context.log("Fetching transactions for account: " + account.name);

        var transactionsFetch: TransactionsFetchResponse = await OpenBankingApiHelper.fetchTransactions(
            openBankingApiConfig, token, account);
        if (transactionsFetch.body.error) {
            var error = "Failed to fetch transactions: " + transactionsFetch.body.error;
            context.log(error);
            context.res = {
                status: 400,
                body: { error: error }
            };
            return;
        }

        context.log("Sorting transactions for account: " + account.name);

        var sortedTransactions = [...transactionsFetch.body.transactions].sort(function(a, b){
            return Date.parse(b.timestamp) - Date.parse(a.timestamp);
        });

        context.log("Filtering transactions for account: " + account.name);
        
        const now = new Date();
        var fromUnix = 0;
        var untilUnix = 0;
        if (now.getDate() < 5){ // when we are at the start of a new month show last months data
            // From start of last month to the start of this month
            var lastMonth: number = now.getMonth()-1;
            var lastMonthYear: number = now.getFullYear();
            if (lastMonth < 0){
                lastMonth = 11;
                lastMonthYear -= 1;
            }
            fromUnix = new Date(lastMonthYear, lastMonth, 1).getTime() / 1000;
            untilUnix = new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000;
        } else { // once we are 5 days into the current month show this months data
            // From start of this month to now
            fromUnix = new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000;
            untilUnix = now.getTime() / 1000;
        }

        var filteredTransactions = sortedTransactions.filter(transaction =>
            (new Date(transaction.timestamp).getTime() / 1000) >= fromUnix && 
            (new Date(transaction.timestamp).getTime() / 1000) <= untilUnix);

        context.log("Analysing transactions for account: " + account.name);

        var income = {}
        var subscriptions = {}
        var spending = {}
        var saving = {}
        for (var subCategory in SpendingInfoIncomeCategory) {
            income[subCategory] = 0;
        }
        for (var subCategory in SpendingInfoSubscriptionCategory) {
            subscriptions[subCategory] = 0;
        }
        for (var subCategory in SpendingInfoSpendingCategory) {
            spending[subCategory] = 0;
        }
        for (var subCategory in SpendingInfoSavingCategory) {
            saving[subCategory] = 0;
        }
        var endBalance = balanceFetch.body.balance.current;
        var startBalance: number = endBalance;
        var debit: number = 0;
        var credit: number = 0;
        var categorisedTransactions = [];
        for (var j = 0; j < filteredTransactions.length; j++) {
            var transaction = filteredTransactions[j];
            startBalance -= transaction.amount;
            if (transaction.amount < 0){
                debit += -transaction.amount;
            }
            if (transaction.amount > 0){
                credit += transaction.amount;
            }
            var categoryDetails = OpenBankingApiHelper.getSpendingInfoCategory(transaction, openBankingApiConfig);
            if (categoryDetails.spendingInfoCategory == SpendingInfoCategory.Income){
                income[categoryDetails.spendingInfoSubCategory] += transaction.amount;
            }
            if (categoryDetails.spendingInfoCategory == SpendingInfoCategory.Subscription){
                subscriptions[categoryDetails.spendingInfoSubCategory] += transaction.amount;
            }
            if (categoryDetails.spendingInfoCategory == SpendingInfoCategory.Spending){
                spending[categoryDetails.spendingInfoSubCategory] += transaction.amount;
            }
            if (categoryDetails.spendingInfoCategory == SpendingInfoCategory.Saving){
                saving[categoryDetails.spendingInfoSubCategory] += transaction.amount;
            }
            categorisedTransactions.push(
                {
                    transaction: transaction,
                    category: categoryDetails.spendingInfoCategory,
                    subCategory: categoryDetails.spendingInfoSubCategory
                }
            );
        }

        var analysis: SpendingAnalysis = {
            income: income,
            subscriptions: subscriptions,
            spending: spending,
            saving: saving,
            startBalance: startBalance,
            endBalance: endBalance,
            debit: debit,
            credit: credit,
            net: undefined
        }
        analysis.net = analysis.credit - analysis.debit;

        accountsInfo.push({
            account: account,
            balance: balanceFetch.body.balance,
            transactions: categorisedTransactions,
            analysis: analysis
        })
    }

    var spendingInfo: SpendingInfoResponse = {
        spendingInfo: {
            accountsInfo: accountsInfo,
        }
    }

    context.res = {
        status: 200,
        body: spendingInfo
    };

    context.log(context.res);
    return;

};

export default httpTrigger;