import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { OpenBankingApiHelper, OpenBankingApiConfig } from "../Shared/Banking";
import { BankTokenResponse } from "../Shared/Banking";

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
        openBankingApiConfig, redirectUri, code)

    context.log(requestData);

    try {
        const response = await fetch(tokenUrl, requestData);
        try {
            const resText = await response.text();
            try {
                const resJson = JSON.parse(resText);
                try {
                    const { access_token, errorMessage, error_details }: BankTokenResponse = Object.assign(resJson);
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
                            var error = "Did not find 'access_token' in response data";
                            context.log(error);
                            context.res = {
                                status: 400,
                                body: { error: error }
                            };
                            return;
                        }
                    } else {
                        var error: string = "Response not ok: ";
                        if (error_details){
                            error += JSON.stringify(error_details);
                        }
                        if (errorMessage){
                            error += errorMessage;
                        }
                        context.log(error);
                        context.log(resJson);
                        context.res = {
                            status: 400,
                            body: { error: error }
                        };
                        return;
                    }
                } catch (error) {
                    var errorMsg: string = "Failed to process json response: " + (error);
                    context.log(errorMsg);
                    context.log(resJson);
                    context.res = {
                        status: 400,
                        body: { error: errorMsg }
                    };
                    return;
                }
            } catch (error) {
                var errorMsg: string = "Failed to parse json response: " + (error);
                context.log(errorMsg);
                context.log(resText);
                context.res = {
                    status: 400,
                    body: { error: errorMsg }
                };
                return;
            }
        } catch (error) {
            var errorMsg: string = "Failed to read response text: " + (error);
            context.log(errorMsg);
            context.res = {
                status: 400,
                body: { error: errorMsg }
            };
            return;
        }
    } catch (error) {
        var errorMsg: string = "Failed to fetch response: " + (error);
        context.log(errorMsg);
        context.res = {
            status: 400,
            body: { error: errorMsg }
        };
        return;
    }
};

export default httpTrigger;