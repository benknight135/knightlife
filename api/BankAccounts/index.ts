import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { AccountsResponse, OpenBankingApiConfig, OpenBankingApiHelper } from "../Shared/Banking";

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
                            var reason = "Did not find 'accounts' in response data";
                            context.log(reason);
                            context.res = {
                                status: 400,
                                body: { reason: reason }
                            };
                            return;
                        }
                    } else {
                        var reason: string = "Response not ok: " + error;
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