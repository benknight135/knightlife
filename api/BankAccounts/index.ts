import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { OpenBankingApiConfig, OpenBankingApiHelper } from "../Shared/Banking";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a bank accounts request.');

    if (!req.body){
        var reason = "Missing request body";
        context.log(reason);
        context.res = {
            status: 400,
            body: { reason: reason }
        };
    }

    var token = req.body.token;
    var openBankingApiConfigReq = req.body.openBankingApiConfig;
    if (!token || !openBankingApiConfigReq){
        var reason = "Missing parameters: ";
        if (!token) { reason += " token ";}
        if (!openBankingApiConfigReq) { reason += " openBankingApiConfig ";}
        context.log(reason);
        context.res = {
            status: 400,
            body: { reason: reason }
        };
        return;
    }

    var openBankingApiConfig: OpenBankingApiConfig = Object.assign(openBankingApiConfigReq);

    var accountsUrl = OpenBankingApiHelper.getAccountsUrl(openBankingApiConfig);
    var requestData = OpenBankingApiHelper.generateAccountsRequestData(token);

    try {
        const response = await fetch(accountsUrl, requestData);
        try {
            const json = await response.json();
            var results = json.results;
            context.res = {
                status: 200,
                body: {
                    results: results
                }
            };
            return;
        } catch (error) {
            var reason: string = error;
            context.log(reason);
            context.log(response.text());
            context.res = {
                status: 400,
                body: { reason: reason }
            };
            return;
        }
    } catch (error) {
        var reason: string = error;
        context.log(reason);
        context.res = {
            status: 400,
            body: { reason: reason }
        };
        return;
    }

};

export default httpTrigger;