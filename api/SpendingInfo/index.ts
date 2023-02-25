import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { AccountsResponse, OpenBankingApiConfig, OpenBankingApiHelper } from "../Shared/Banking";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a bank transactions request.');

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

    var accountsUrl = OpenBankingApiHelper.getAccountsUrl(openBankingApiConfig);
    var requestData = OpenBankingApiHelper.getAuthorisedRequestData(token);

    try {
        const response = await fetch(accountsUrl, requestData);
        try {
            const resText = await response.text();
            try {
                const resJson = JSON.parse(resText);
                try {
                    const { accounts, error }: AccountsResponse = OpenBankingApiHelper.processAccountsResponse(
                        openBankingApiConfig, resJson);
                    if (response.ok) {
                        if (accounts) {
                            context.res = {
                                status: 200,
                                body: {
                                    accounts: accounts
                                }
                            };
                            return;
                        } else {
                            var errorMsg = "Did not find 'accounts' in response data";
                            context.log(errorMsg);
                            context.res = {
                                status: 400,
                                body: { error: errorMsg }
                            };
                            return;
                        }
                    } else {
                        var errorMsg: string = "Response not ok: " + error;
                        context.log(errorMsg);
                        context.log(resJson);
                        context.res = {
                            status: 400,
                            body: { error: errorMsg }
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