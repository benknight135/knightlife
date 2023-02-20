import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a bank token request.');
    var code = req.get("code");
    var openBankingApi = req.get("openBankingApi");

    if (code == null || openBankingApi == null){
        var reason = "Missing parameters: ";
        if (code == null) { reason += "'code'";}
        if (openBankingApi == null) { reason += "'openBankingApi'";}
        context.res = {
            status: 400,
            body: { reason: reason }
        };
        return;
    }

    context.log('Getting token from code: ' + code);
    
    // TODO get token from code using Truelayer or Tink
    var token = "abc123";
    
    context.log('Returning token: ' + token);

    context.res = {
        status: 200,
        body: {
            token: "abc123"
        }
    };

};

export default httpTrigger;