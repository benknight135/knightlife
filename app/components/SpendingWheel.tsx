import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { OpenBankingApiConfig } from './Banking';
import { SpendingInfoResponse, SpendingInfo } from './Banking';

type SpendingWheelProps = {
    openBankingApiConfig: OpenBankingApiConfig;
    authToken: string | null;
};

const useSpendingInfo = (apiEndpoint: string, authToken: string, openBankingApiConfig: OpenBankingApiConfig) => {
    const [isLoadingSpendingInfo, setLoadingSpendingInfo] = useState<boolean>(true);
    const [spendingInfo, setSpendingInfo] = useState<SpendingInfo | null>(null);

    useEffect(() => {
        const getAuthTokenAsync = async () => {
            if (apiEndpoint == null){
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
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                };
                const response = await fetch(apiEndpoint, requestData);
                try {
                    const {spendingInfo: spendingInfoJson, error}: SpendingInfoResponse = await response.json()
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

const SpendingWheel = ({openBankingApiConfig, authToken}: SpendingWheelProps) => {
    if (authToken != null){
        var apiEndpoint: string = "/api/SpendingInfo";
        const { spendingInfo, isLoadingSpendingInfo } = useSpendingInfo(apiEndpoint, authToken, openBankingApiConfig);
        if (isLoadingSpendingInfo){
            return <ActivityIndicator />
        } else {
            if (spendingInfo == null){
                return <ActivityIndicator />
            }
            return <Text>{JSON.stringify(spendingInfo)}</Text>
        }
    }
    
    return <ActivityIndicator />
};

export default SpendingWheel;