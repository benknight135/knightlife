import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { env } from '../utils/env';
import { OpenBankingApiConfig } from './Banking';
import { SpendingInfoResponse, SpendingInfo } from './Banking';
import AccountView from './AccountView';

type SpendingViewProps = {
    openBankingApiConfig: OpenBankingApiConfig;
    authToken: string | null;
};

const useSpendingInfo = (authToken: string, openBankingApiConfig: OpenBankingApiConfig) => {
    const [isLoadingSpendingInfo, setLoadingSpendingInfo] = useState<boolean>(true);
    const [spendingInfo, setSpendingInfo] = useState<SpendingInfo | null>(null);

    const apiEndpoint: string = env.API_BASE_URL + "/SpendingInfo";
    const apiCode: string = env.API_ACCESS_KEY;

    useEffect(() => {
        const getAuthTokenAsync = async () => {
            if (apiEndpoint == null) {
                setSpendingInfo(null);
                setLoadingSpendingInfo(false);
                return;
            }
            try {
                const requestBody = {
                    token: authToken,
                    openBankingApiConfig: openBankingApiConfig
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
                    const { spendingInfo: spendingInfoJson, error }: SpendingInfoResponse = await response.json()
                    if (response.ok) {
                        if (spendingInfoJson) {
                            var spendingInfo: SpendingInfo = Object.assign(spendingInfoJson)
                            setSpendingInfo(spendingInfo);
                        } else {
                            console.error("Did not find 'spendingInfo' in response data");
                        }
                    } else {
                        console.error(error);
                    }
                } catch (error) {
                    console.error(error);
                }
            } catch (error) {
                console.error(error);
            }
            setLoadingSpendingInfo(false);
        };

        getAuthTokenAsync();
    }, []);

    return { spendingInfo, isLoadingSpendingInfo };
};

const SpendingView = ({ openBankingApiConfig, authToken }: SpendingViewProps) => {
    if (authToken != null) {
        const { spendingInfo, isLoadingSpendingInfo } = useSpendingInfo(authToken, openBankingApiConfig);
        if (isLoadingSpendingInfo) {
            return <ActivityIndicator />
        } else {
            if (spendingInfo == null) {
                return <ActivityIndicator />
            }
            const accountViews = spendingInfo.accountsInfo.map((accountInfo, index) => (
                <AccountView
                    accountInfo={accountInfo}
                    index={index}
                    key={accountInfo.account.id + "AccountView"}
                />
            ));
            return (
                <div>
                    {accountViews}
                </div>
            )
        }
    }

    return <ActivityIndicator />
};

export default SpendingView;