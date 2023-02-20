import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import BankConnectButton, { AuthService } from './BankConnectButton';

type BankViewProps = {
    appStartURL: URL | null
};

function authCodeFromURL(url: URL | null): string | null {
    if (url == null){
        return null;
    }
    // only process code if correct callback is in url e.g. https://X.X.X/bankConnectCallback
    console.log(url.pathname);
    if (url.pathname != "/bankConnectCallback"){
        return null;
    }
    const urlParams: URLSearchParams = new URLSearchParams(url.search);
    const code: string | null = urlParams.get("code");
    console.log(code);
    return code;
}
  
const useBankAuthToken = (apiEndpoint: string, authCode: string) => {
    const [isLoadingAuthToken, setLoadingAuthToken] = useState<boolean>(true);
    const [authToken, setAuthToken] = useState<string | null>(null);

    useEffect(() => {
        const getAuthTokenAsync = async () => {
        try {
            const requestData = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        grant_type: "authorization_code",
                        client_id: "sandbox-knightlife-c74f1f",
                        client_secret: "4bf70dd5-2b6e-4a8e-ae84-3a55f5c68340", // TODO replace with secret env varibale or something
                        redirect_uri: "https://console.truelayer.com/redirect-page",
                        code: authCode
                    }
                )
            };
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

const BankView = ({appStartURL}: BankViewProps) => {
    const authService: AuthService = AuthService.TrueLayer;
    var authCode: string | null = authCodeFromURL(appStartURL);
    console.log(appStartURL);
    if (authCode != null){
        // TODO replace with bank auth api endpoint
        const apiEndpoint = "https://auth.truelayer-sandbox.com/connect/token";
        const { authToken, isLoadingAuthToken } = useBankAuthToken(apiEndpoint, authCode);
        if (isLoadingAuthToken){
            return <Text>{"Bank auth token:" + authToken}</Text>
        } else {
            return <Text>{"Bank auth code:" + authCode}</Text>
        }
    }
    
    return <BankConnectButton
        title='Connect Bank'
        authService={authService}
        redirectUri={appStartURL + "bankConnectCallback"}
    />
};

export default BankView;