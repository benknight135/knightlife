import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a version request.');
    const body = {
        version: "1.0.2.0"
    }

    context.res = {
        status: 200,
        body: body
    };

};

export default httpTrigger;