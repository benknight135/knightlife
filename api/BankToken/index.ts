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

    // if failed with 400 probably a refresh while debugging so try to use the developer access token
    if (context.res.status == 400){
        var dev_access_token = process.env.OPEN_BANKING_DEV_ACCESS_TOKEN || undefined;
        context.log("Dev access token: "+ dev_access_token);
        if (dev_access_token !== undefined){
            context.res = {
                status: 200,
                body: {
                    access_token: dev_access_token,
                    error: undefined
                }
            }
        }
    }

    context.log(context.res);
    return;
   
};

export default httpTrigger;