import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { OpenBankingApiConfig, OpenBankingApiHelper, SpendingInfoResponse } from "../Shared/Banking";
import { AccountsFetchResponse, TransactionsFetchResponse } from "../Shared/Banking";
import { BalanceFetchResponse } from "../Shared/Banking";
import { Account, AccountsInfo } from "../Shared/Banking";
import { getDuplicates } from "../Shared/Common";

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

    var accountsInfo: AccountsInfo = []
    for (var i = 0; i < accountsFetch.body.accounts.length; i++) {
        var account: Account = accountsFetch.body.accounts[i];
        var accountId: string = account.id;

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

        var transactionsFetch: TransactionsFetchResponse = await OpenBankingApiHelper.fetchTransactions(
            openBankingApiConfig, token, accountId);
        if (transactionsFetch.body.error) {
            var error = "Failed to fetch transactions: " + transactionsFetch.body.error;
            context.log(error);
            context.res = {
                status: 400,
                body: { error: error }
            };
            return;
        }

        var transactionNames: Array<string> = []
        for (var j = 0; j < transactionsFetch.body.transactions.length; j++) {
            transactionNames.push(transactionsFetch.body.transactions[j].description);
        }
        const duplicateCounts = {};
        transactionNames.forEach(function (x) { duplicateCounts[x] = (duplicateCounts[x] || 0) + 1; });

        context.log(duplicateCounts);

        accountsInfo.push({
            account: account,
            balance: balanceFetch.body.balance,
            transactions: transactionsFetch.body.transactions,
            duplicateTransactions: duplicateCounts
        })
    }

    var spendingInfo: SpendingInfoResponse = {
        spendingInfo: {
            accountsInfo: accountsInfo
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