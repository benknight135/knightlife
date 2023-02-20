import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import BankConnectButton, { OpenBankingApi } from './BankConnectButton';
import BankAccountList from './BankAccountList';

type BankViewProps = {
    appStartURL: URL | null,
    openBankingApi: OpenBankingApi;
};

function authCodeFromURL(url: URL | null): string | null {
    if (url == null){
        return null;
    }
    // only process code if correct callback is in url e.g. https://X.X.X/bankConnectCallback
    if (url.pathname != "/bankConnectCallback"){
        return null;
    }
    const urlParams: URLSearchParams = new URLSearchParams(url.search);
    const code: string | null = urlParams.get("code");
    return code;
}
  
const useBankAuthToken = (apiEndpoint: string, authCode: string, openBankingApi: OpenBankingApi) => {
    const [isLoadingAuthToken, setLoadingAuthToken] = useState<boolean>(true);
    const [authToken, setAuthToken] = useState<string | null>(null);

    useEffect(() => {
        const getAuthTokenAsync = async () => {
            if (apiEndpoint == null){
                setAuthToken(null);
                setLoadingAuthToken(false);
                return;
            }
            try {
                const requestBody = {
                    // grant_type: "authorization_code",
                    // client_id: "sandbox-knightlife-c74f1f",
                    // client_secret: "4bf70dd5-2b6e-4a8e-ae84-3a55f5c68340", // TODO replace with secret env variable or something
                    // redirect_uri: "https://console.truelayer.com/redirect-page", // https://console.tink.com/callback
                    code: authCode,
                    openBankingApi: OpenBankingApi[openBankingApi],
                }
                const requestData = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                };
                console.log(apiEndpoint);
                const response = await fetch(apiEndpoint, requestData);
                try {
                    const json = await response.json();
                    setAuthToken(json.access_token);
                } catch (error) {
                    console.error(error);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingAuthToken(false);
            }
        };

        getAuthTokenAsync();
    }, []);

    return { authToken, isLoadingAuthToken };
};

const BankView = ({appStartURL, openBankingApi}: BankViewProps) => {
    
    var authCode: string | null = authCodeFromURL(appStartURL);
    if (authCode != null){
        var apiEndpoint: string = "/api/BankToken";
        // switch(openBankingApi){
        //     case OpenBankingApi.TrueLayer:
        //         apiEndpoint = new URL("https://auth.truelayer-sandbox.com/connect/token");
        //         break;
        //     case OpenBankingApi.Tink:
        //         apiEndpoint = new URL("https://api.tink.com/api/v1/oauth/token");
        //         break;
        //     default:
        //         var error = "Open Bankking API " + openBankingApi + " not implimented";
        //         console.error(error);
        //         break;
        // }
        const { authToken, isLoadingAuthToken } = useBankAuthToken(apiEndpoint, authCode, openBankingApi);
        if (isLoadingAuthToken){
            return <Text>{"Bank auth code:" + authCode}</Text>
        } else {
            return (
                <BankAccountList
                    authToken={authToken}
                    openBankingApi={openBankingApi}
                />
            )
        }
    }
    
    return <BankConnectButton
        title='Connect Bank'
        openBankingApi={openBankingApi}
        redirectUri={appStartURL + "bankConnectCallback"}
    />
};

export default BankView;
export { OpenBankingApi };