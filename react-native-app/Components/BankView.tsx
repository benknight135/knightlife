import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { env } from '../Utils/Env';
import { OpenBankingApiConfig } from 'knightlife-api';
import BankConnectButton from './BankConnectButton';
import SpendingView from './SpendingView';

interface BankViewProps {
    openBankingApiAuthCode: string | null,
    redirectUri: string | null,
    openBankingApiConfig: OpenBankingApiConfig;
};

type UseBankAuthTokenProps = {
    openBankingApiAuthCode: string,
    openBankingApiConfig: OpenBankingApiConfig,
    redirectUri: string
};

const useBankAuthToken = (
        {openBankingApiAuthCode, openBankingApiConfig, redirectUri}: UseBankAuthTokenProps) => {
    const [isLoadingAuthToken, setLoadingAuthToken] = useState<boolean>(true);
    const [authToken, setAuthToken] = useState<string | null>(null);

    const apiEndpoint: string = env.API_BASE_URL + "/BankToken";
    const apiCode: string = env.API_ACCESS_KEY;

    useEffect(() => {
        const getAuthTokenAsync = async () => {
            if (apiEndpoint == null){
                setAuthToken(null);
                setLoadingAuthToken(false);
                return;
            }
            try {
                const requestBody = {
                    code: openBankingApiAuthCode,
                    openBankingApiConfig: openBankingApiConfig,
                    redirectUri: redirectUri
                }
                const requestData = {
                    method: 'POST',
                    headers: {
                        'x-functions-key': apiCode,
                        'Content-Type': 'application/json'
                    },
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

const BankView: React.FC<BankViewProps> = ({openBankingApiAuthCode, redirectUri, openBankingApiConfig}) => {
    if (redirectUri == null){
        return <ActivityIndicator />
    }

    if (openBankingApiAuthCode != null){
        const { authToken, isLoadingAuthToken } = useBankAuthToken(
            {openBankingApiAuthCode, openBankingApiConfig, redirectUri});
        if (isLoadingAuthToken){
            return <ActivityIndicator />
        } else {
            return (
                <SpendingView
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