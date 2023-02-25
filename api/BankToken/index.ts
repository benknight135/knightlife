import { AzureFunction, Context, HttpRequest } from "@azure/functions"

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

    context.log(req.body);

    var code = req.body.code;
    var openBankingApi = req.body.openBankingApi;
    if (!code || !openBankingApi){
        var reason = "Missing parameters: ";
        if (!code) { reason += " code ";}
        if (!openBankingApi) { reason += " openBankingApi ";}
        context.log(reason);
        context.res = {
            status: 400,
            body: { reason: reason }
        };
        return;
    }

    if (openBankingApi != "Tink" && openBankingApi != "TrueLayer"){
        var reason = "openBankingApi: expected 'Tink' / 'TrueLayer' got '" + openBankingApi + "'";
        context.log(reason);
        context.res = {
            status: 400,
            body: { reason: reason }
        };
        return;
    }

    context.log('Getting token from code: ' + code);

    var apiEndpoint: string;
    var clientId: string;
    var clientSecret: string;
    var redirectUri: string;
    if (openBankingApi == "Tink"){
        apiEndpoint = "https://api.tink.com/api/v1/oauth/token";
        clientId = "sandbox-knightlife-c74f1f";
        clientSecret = "42485d39-d77e-4d7e-a24e-fded84cdd7f7";
        redirectUri = "https://console.truelayer-sandbox.com/redirect-page";
    } else if (openBankingApi == "TrueLayer"){
        apiEndpoint = "https://auth.truelayer-sandbox.com/connect/token";
        clientId = "sandbox-knightlife-c74f1f";
        clientSecret = "42485d39-d77e-4d7e-a24e-fded84cdd7f7";
        redirectUri = "https://4280-benknight135-knightlife-ef6oiv6dvsu.ws-eu88.gitpod.io/bankConnectCallback";
    } else {
        var reason = "openBankingApi: expected 'Tink' / 'TrueLayer' got '" + openBankingApi + "'";
        context.log(reason);
        context.res = {
            status: 400,
            body: { reason: reason }
        };
        return;
    }

    context.log(apiEndpoint);
    context.log(clientId);
    context.log(clientSecret);
    context.log(redirectUri);

    const requestBody = {
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code: code
    }
    const requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    try {
        const response = await fetch(apiEndpoint, requestData);
        try {
            const json = await response.json();
            context.log(response.status);
            if (response.status != 200){
                var reason: string = "Invalid response: " + JSON.stringify(json);
                context.log(reason);
                context.res = {
                    status: 400,
                    body: { reason: reason }
                };
                return;
            }
            context.log("Valid response: " + JSON.stringify(json));
            var access_token = json.access_token;
            context.log("Returning access_token: " + access_token);
            context.res = {
                status: 200,
                body: {
                    access_token: access_token
                }
            };
            return;
        } catch (error) {
            var reason: string = error;
            context.log(reason);
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