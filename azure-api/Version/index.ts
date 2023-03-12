import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { version as apiVersion } from "knightlife-api";
import { version as azureApiVersion } from '../package.json';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a version request.');
    const body = {
        apiVersion: apiVersion,
        azureApiVersion: azureApiVersion
    }

    context.res = {
        status: 200,
        body: body
    };

};

export default httpTrigger;