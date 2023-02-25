import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { OpenBankingApiHelper, OpenBankingApiConfig } from "../Shared/Banking";
import { BankTokenJSONResponse } from "../Shared/Banking";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a bank token request.');

    if (!req.body) {
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
    if (!code || !openBankingApiConfigReq || !redirectUri) {
        var reason = "Missing parameters: ";
        if (!code) { reason += " code "; }
        if (!openBankingApiConfigReq) { reason += " openBankingApiConfig "; }
        if (!redirectUri) { reason += " redirectUri "; }
        context.log(reason);
        context.res = {
            status: 400,
            body: { reason: reason }
        };
        return;
    }

    var openBankingApiConfig: OpenBankingApiConfig = Object.assign(openBankingApiConfigReq);

    var tokenUrl = OpenBankingApiHelper.getTokenUrl(openBankingApiConfig);
    context.log(tokenUrl);
    var requestData = OpenBankingApiHelper.generateTokenRequestData(
        openBankingApiConfig, redirectUri, code)

    context.log(requestData);

    try {
        const response = await fetch(tokenUrl, requestData);
        try {
            const resText = await response.text();
            try {
                const resJson = JSON.parse(resText);
                try {
                    const { access_token, errorMessage, error_details }: BankTokenJSONResponse = Object.assign(resJson);
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
                        var reason: string = "Response not ok: ";
                        if (error_details){
                            reason += JSON.stringify(error_details);
                        }
                        if (errorMessage){
                            reason += errorMessage;
                        }
                        context.log(reason);
                        context.log(resJson);
                        context.res = {
                            status: 400,
                            body: { reason: reason }
                        };
                        return;
                    }
                } catch (error) {
                    var reason: string = "Failed to process json response: " + (error);
                    context.log(reason);
                    context.log(resJson);
                    context.res = {
                        status: 400,
                        body: { reason: reason }
                    };
                    return;
                }
            } catch (error) {
                var reason: string = "Failed to parse json response: " + (error);
                context.log(reason);
                context.log(resText);
                context.res = {
                    status: 400,
                    body: { reason: reason }
                };
                return;
            }
        } catch (error) {
            var reason: string = "Failed to read response text: " + (error);
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