import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import BankConnectButton from './BankConnectButton';
import BankAccountList from './BankAccountList';
import { OpenBankingApiConfig } from './Banking';

type BankViewProps = {
    appStartUrl: URL | null,
    openBankingApiConfig: OpenBankingApiConfig;
};

type UseBankAuthTokenProps = {
    apiEndpoint: string,
    authCode: string,
    openBankingApiConfig: OpenBankingApiConfig,
    redirectUri: string
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

const useBankAuthToken = (
        {apiEndpoint, authCode, openBankingApiConfig, redirectUri}: UseBankAuthTokenProps) => {
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
                    code: authCode,
                    openBankingApiConfig: openBankingApiConfig,
                    redirectUri: redirectUri
                }
                const requestData = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
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

const BankView = ({appStartUrl, openBankingApiConfig}: BankViewProps) => {
    if (appStartUrl == null){
        console.error("appStartUrl is null");
        return <ActivityIndicator />
    }
    var authCode: string | null = authCodeFromURL(appStartUrl);
    var redirectUri: string = new URL("/bankConnectCallback", appStartUrl.origin).toString();
    if (authCode != null){
        var apiEndpoint: string = "/api/BankToken";
        const { authToken, isLoadingAuthToken } = useBankAuthToken(
            {apiEndpoint, authCode, openBankingApiConfig, redirectUri});
        if (isLoadingAuthToken){
            return <ActivityIndicator />
        } else {
            return (
                <BankAccountList
                    authToken={authToken}
                    openBankingApiConfig={openBankingApiConfig}
                />
            )
        }
    }
    
    return <BankConnectButton
        title='Connect Bank'
        openBankingApiConfig={openBankingApiConfig}
        redirectUri={redirectUri}
    />
};

export default BankView;