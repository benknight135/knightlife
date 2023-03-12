import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { OpenBankingApiConfig, OpenBankingApiHelper } from "knightlife-api";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a bank accounts request.');

    if (!req.body){
        var error = "Missing request body";
        context.log(error);
        context.res = {
            status: 400,
            body: { error: error }
        };
    }

    var token = req.body.token;
    var openBankingApiConfigReq = req.body.openBankingApiConfig;
    if (!token || !openBankingApiConfigReq){
        var error = "Missing parameters: ";
        if (!token) { error += " token ";}
        if (!openBankingApiConfigReq) { error += " openBankingApiConfig ";}
        context.log(error);
        context.res = {
            status: 400,
            body: { error: error }
        };
        return;
    }

    var openBankingApiConfig: OpenBankingApiConfig = Object.assign(openBankingApiConfigReq);

    context.res = await OpenBankingApiHelper.fetchAccounts(openBankingApiConfig, token);
    context.log(context.res);
    return;
};

export default httpTrigger;