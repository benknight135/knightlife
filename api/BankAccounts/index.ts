import { AzureFunction, Context, HttpRequest } from "@azure/functions"

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

    context.log(req.body);

    var token = req.body.token;
    var openBankingApi = req.body.openBankingApi;
    if (!token || !openBankingApi){
        var reason = "Missing parameters: ";
        if (!token) { reason += " token ";}
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

    context.log('Getting accouts using token: ' + token);

    var apiEndpoint: string;
    if (openBankingApi == "Tink"){
        apiEndpoint = "https://api.tink.com/data/v2/accounts";
    } else if (openBankingApi == "TrueLayer"){
        apiEndpoint = "https://api.truelayer.com/data/v1/accounts";
    } else {
        var reason = "openBankingApi: expected 'Tink' / 'TrueLayer' got '" + openBankingApi + "'";
        context.log(reason);
        context.res = {
            status: 400,
            body: { reason: reason }
        };
        return;
    }
    
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    
    const requestBody = {}
    const requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    try {
        const response = await fetch(apiEndpoint, requestData);
        try {
            const json = await response.json();
            context.log(json);
            var results = json.results;
            context.log("Returning results: " + results);
            context.res = {
                status: 200,
                body: {
                    results: results
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