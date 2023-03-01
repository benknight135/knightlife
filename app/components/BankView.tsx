import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { OpenBankingApiConfig } from './Banking';
import BankConnectButton from './BankConnectButton';
import BankAccountList from './BankAccountList';
import SpendingView from './SpendingView';

type BankViewProps = {
    authCode: string | null,
    redirectUri: string | null,
    openBankingApiConfig: OpenBankingApiConfig;
};

type UseBankAuthTokenProps = {
    apiEndpoint: string,
    authCode: string,
    openBankingApiConfig: OpenBankingApiConfig,
    redirectUri: string
};

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

const BankView = ({authCode, redirectUri, openBankingApiConfig}: BankViewProps) => {
    if (redirectUri == null){
        return <ActivityIndicator />
    }

    if (authCode != null){
        var apiEndpoint: string = "/api/BankToken";
        const { authToken, isLoadingAuthToken } = useBankAuthToken(
            {apiEndpoint, authCode, openBankingApiConfig, redirectUri});
        if (isLoadingAuthToken){
            return <ActivityIndicator />
        } else {
            return (
                <div>
                    <BankAccountList
                        authToken={authToken}
                        openBankingApiConfig={openBankingApiConfig}
                    />
                    <SpendingView
                        authToken={authToken}
                        openBankingApiConfig={openBankingApiConfig}
                    />
                </div>
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