import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import BankConnectButton, { OpenBankingApi } from './BankConnectButton';

type BankAccoutLinkProps = {
    openBankingApi: OpenBankingApi;
    authToken: string | null;
};

const useAccountList = (apiEndpoint: URL | null, authToken: string, ) => {
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
                let headers = new Headers();
                headers.append("Authorization", "Bearer " + authToken);
                const requestBody = {}
                const requestData = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                };
                const response = await fetch(apiEndpoint, requestData);
                try {
                    const json = await response.json();
                    setAccountList(json.access_token);
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
        var apiEndpoint: URL | null = null;
        switch(openBankingApi){
            case OpenBankingApi.TrueLayer:
                apiEndpoint = new URL("https://api.truelayer.com/data/v1/accounts");
                break;
            case OpenBankingApi.Tink:
                apiEndpoint = new URL("https://api.tink.com/data/v2/accounts");
                break;
            default:
                var error = "Open Bankking API " + openBankingApi + " not implimented";
                console.error(error);
                break;
        }
        const { accountList, isLoadingAccountList } = useAccountList(apiEndpoint, authToken);
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