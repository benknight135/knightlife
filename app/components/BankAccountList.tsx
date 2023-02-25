import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import BankConnectButton, { OpenBankingApi } from './BankConnectButton';

type BankAccoutLinkProps = {
    openBankingApi: OpenBankingApi;
    authToken: string | null;
};

const useAccountList = (apiEndpoint: string, authToken: string, openBankingApi: OpenBankingApi) => {
    const [isLoadingAccountList, setLoadingAccoutList] = useState<boolean>(true);
    const [accountList, setAccountList] = useState<string | null>(null);

    useEffect(() => {
        const getAuthTokenAsync = async () => {
            if (apiEndpoint == null){
                setAccountList(null);
                setLoadingAccoutList(false);
                return;
            }
            try {
                const requestBody = {
                    token: authToken,
                    openBankingApi: OpenBankingApi[openBankingApi]
                }
                const requestData = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                };
                const response = await fetch(apiEndpoint, requestData);
                try {
                    const json = await response.json();
                    setAccountList(json.results);
                } catch (error) {
                    console.error(error);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingAccoutList(false);
            }
        };

        getAuthTokenAsync();
    }, []);

    return { accountList, isLoadingAccountList };
};

const BankAccountList = ({openBankingApi, authToken}: BankAccoutLinkProps) => {
    if (authToken != null){
        var apiEndpoint: string = "/api/BankAccounts";
        const { accountList, isLoadingAccountList } = useAccountList(apiEndpoint, authToken, openBankingApi);
        if (isLoadingAccountList){
            return <ActivityIndicator />
        } else {
            return <Text>{accountList}</Text>
        }
    }
    
    return <ActivityIndicator />
};

export default BankAccountList;
export { OpenBankingApi };