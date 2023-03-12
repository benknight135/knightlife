import Constants from 'expo-constants';

type EnvProps = {
    API_BASE_URL: string
    API_ACCESS_KEY: string
    OPEN_BANKING_PROVIDER: string
    OPEN_BANKING_USE_SANDBOX: boolean
};

function getEnvs(): EnvProps {
    var API_BASE_URL = "/api";
    var API_ACCESS_KEY = "";
    var OPEN_BANKING_PROVIDER = "truelayer";
    var OPEN_BANKING_USE_SANDBOX = true;

    if (Constants.expoConfig){
        if (Constants.expoConfig.extra){
            API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL || API_BASE_URL;
            API_ACCESS_KEY = Constants.expoConfig.extra.API_ACCESS_KEY || API_ACCESS_KEY;
            OPEN_BANKING_PROVIDER = Constants.expoConfig.extra.OPEN_BANKING_PROVIDER || OPEN_BANKING_PROVIDER;
            if (Constants.expoConfig.extra.OPEN_BANKING_USE_SANDBOX){
                if (Constants.expoConfig.extra.OPEN_BANKING_USE_SANDBOX == "true"){
                    OPEN_BANKING_USE_SANDBOX = true;
                }
                if (Constants.expoConfig.extra.OPEN_BANKING_USE_SANDBOX == "false"){
                    OPEN_BANKING_USE_SANDBOX = false;
                }
            }
        }
    }

    return {
        API_BASE_URL, 
        API_ACCESS_KEY,
        OPEN_BANKING_PROVIDER,
        OPEN_BANKING_USE_SANDBOX
    };
}

const env = getEnvs();

export { env };