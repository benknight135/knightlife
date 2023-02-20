import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import BankConnectButton, { AuthService } from './BankConnectButton';

type BankViewProps = {
    appStartURL: URL | null
};

function bankCodeFromURL(url: URL | null): string | null {
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
  
const useBankAuthToken = (apiEndpoint: string) => {
const [isLoadingAuthToken, setLoadingAuthToken] = useState<boolean>(true);
const [authToken, setAuthToken] = useState<string | null>(null);

useEffect(() => {
    const getAuthTokenAsync = async () => {
    try {
        const requestData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        };
        const response = await fetch(apiEndpoint, requestData);
        try {
            const json = await response.json();
            // TODO proces response for bank auth api to get auth token
            setAuthToken(json.token);
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
    var bankCode: string | null = bankCodeFromURL(appStartURL);
    console.log(appStartURL);
    if (bankCode != null){
        // TODO replace with bank auth api endpoint
        const { authToken, isLoadingAuthToken } = useBankAuthToken("/api/Version");
        if (isLoadingAuthToken){
            return <Text>{"Bank token:" + authToken}</Text>
        } else {
            return <Text>{"Bank code:" + bankCode}</Text>
        }
    }
    
    return <BankConnectButton
        title='Connect Bank'
        authService={authService}
        redirectUri={appStartURL + "bankConnectCallback"}
    />
};

export default BankView;