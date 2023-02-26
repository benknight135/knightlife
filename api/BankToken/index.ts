import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { OpenBankingApiHelper, OpenBankingApiConfig } from "../Shared/Banking";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a bank token request.');

    if (!req.body) {
        var error = "Missing request body";
        context.log(error);
        context.res = {
            status: 400,
            body: { error: error }
        };
    }

    var code = req.body.code;
    var openBankingApiConfigReq = req.body.openBankingApiConfig;
    var redirectUri = req.body.redirectUri;
    if (!code || !openBankingApiConfigReq || !redirectUri) {
        var error = "Missing parameters: ";
        if (!code) { error += " code "; }
        if (!openBankingApiConfigReq) { error += " openBankingApiConfig "; }
        if (!redirectUri) { error += " redirectUri "; }
        context.log(error);
        context.res = {
            status: 400,
            body: { error: error }
        };
        return;
    }

    var openBankingApiConfig: OpenBankingApiConfig = Object.assign(openBankingApiConfigReq);

    var tokenUrl = OpenBankingApiHelper.getTokenUrl(openBankingApiConfig);
    context.log(tokenUrl);
    var requestData = OpenBankingApiHelper.getTokenRequestData(
        openBankingApiConfig, code, redirectUri)

    context.log(requestData);

    context.res = await OpenBankingApiHelper.fetchToken(
        openBankingApiConfig, code, redirectUri);
    context.log(context.res);
    return;
};

export default httpTrigger;