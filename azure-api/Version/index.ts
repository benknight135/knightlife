import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { version as apiVersion } from "knightlife-api";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a version request.');
    const body = {
        apiVersion: apiVersion,
        azureApiVersion: "1.0.6"
    }

    context.res = {
        status: 200,
        body: body
    };

};

export default httpTrigger;