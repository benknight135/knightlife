import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import BankConnectButton from './BankConnectButton';
import BankAccountList from './BankAccountList';
import { OpenBankingApiConfig } from './Banking';

type BankViewProps = {
    appStartURL: URL | null,
    openBankingApiConfig: OpenBankingApiConfig;
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

const useBankAuthToken = (apiEndpoint: string, authCode: string, openBankingApiConfig: OpenBankingApiConfig) => {
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

const BankView = ({appStartURL, openBankingApiConfig}: BankViewProps) => {
    
    var authCode: string | null = authCodeFromURL(appStartURL);
    if (authCode != null){
        var apiEndpoint: string = "/api/BankToken";
        const { authToken, isLoadingAuthToken } = useBankAuthToken(apiEndpoint, authCode, openBankingApiConfig);
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
        redirectUri={appStartURL + "bankConnectCallback"}
    />
};

export default BankView;