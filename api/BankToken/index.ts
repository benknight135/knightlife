import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { OpenBankingApiProivder, OpenBankingApiHelper, OpenBankingApiConfig } from "../Shared/Banking";

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
    if (!code || !openBankingApiConfigReq){
        var reason = "Missing parameters: ";
        if (!code) { reason += " code ";}
        if (!openBankingApiConfigReq) { reason += " openBankingApiConfig ";}
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
        openBankingApiConfig,
        "https://4280-benknight135-knightlife-ef6oiv6dvsu.ws-eu88.gitpod.io/bankConnectCallback",
        code
    )
    context.log(JSON.stringify(requestData));

    try {
        const response = await fetch(tokenUrl, requestData);
        if (response.ok){
            try {
                const text = await response.text();
                try {
                    const json = JSON.parse(text);
                    if (response.status != 200){
                        var reason: string = "Invalid response: " + JSON.stringify(json);
                        context.log(reason);
                        context.res = {
                            status: 400,
                            body: { reason: reason }
                        };
                        return;
                    }
                    var access_token = json.access_token;
                    context.res = {
                        status: 200,
                        body: {
                            access_token: access_token
                        }
                    };
                    return;
                } catch (error) {
                    var reason: string = "Failed to process response json: " + (error);
                    context.log(text);
                    context.log(reason);
                    context.res = {
                        status: 400,
                        body: { reason: reason }
                    };
                    return;
                }
            } catch (error) {
                var reason: string = "Failed to process response text: " + (error);
                context.log(reason);
                context.res = {
                    status: 400,
                    body: { reason: reason }
                };
                return;
            }
        } else {
            var reason: string = "Response not ok";
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