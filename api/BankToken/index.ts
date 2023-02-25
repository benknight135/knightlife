import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { OpenBankingApiProivder, OpenBankingApiHelper, OpenBankingApiConfig } from "../Shared/Banking";
import { BankTokenJSONResponse } from "../Shared/Banking";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a bank token request.');

    if (!req.body){
        var reason = "Missing request body";
        context.log(reason);
        context.res = {
            status: 400,
            body: { reason: reason }
        };
    }

    var code = req.body.code;
    var openBankingApiConfigReq = req.body.openBankingApiConfig;
    var redirectUri = req.body.redirectUri;
    if (!code || !openBankingApiConfigReq || !redirectUri){
        var reason = "Missing parameters: ";
        if (!code) { reason += " code ";}
        if (!openBankingApiConfigReq) { reason += " openBankingApiConfig ";}
        if (!redirectUri) { reason += " redirectUri ";}
        context.log(reason);
        context.res = {
            status: 400,
            body: { reason: reason }
        };
        return;
    }

    var openBankingApiConfig: OpenBankingApiConfig = Object.assign(openBankingApiConfigReq);

    if (openBankingApiConfig.provider == OpenBankingApiProivder.Tink){
        var reason: string = "Tink not currently working";
        context.log(reason);
        context.res = {
            status: 400,
            body: { reason: reason }
        };
        return;
    }

    var tokenUrl = OpenBankingApiHelper.getTokenUrl(openBankingApiConfig);
    context.log(tokenUrl);
    var requestData = OpenBankingApiHelper.generateTokenRequestData(
        openBankingApiConfig, redirectUri, code)
    context.log(JSON.stringify(requestData));

    try {
        const response = await fetch(tokenUrl, requestData);
        const {access_token, errors}: BankTokenJSONResponse = await response.json()
        if (response.ok) {
            if (access_token) {
                context.res = {
                    status: 200,
                    body: {
                        access_token: access_token
                    }
                };
                return;
            } else {
                var reason = "Did not find 'access_token' in response data";
                context.log(reason);
                context.res = {
                    status: 400,
                    body: { reason: reason }
                };
                return;
            }
        } else {
            // handle the graphql errors
            const error = new Error(errors?.map(e => e.message).join('\n') ?? 'unknown')
            var reason: string = error.message;
            context.log(reason);
            context.res = {
                status: 400,
                body: { reason: reason }
            };
            return;
        }
    } catch (error) {
        var reason: string = "Failed to fetch response: " + (error);
        context.log(reason);
        context.res = {
            status: 400,
            body: { reason: reason }
        };
        return;
    }
};

export default httpTrigger;