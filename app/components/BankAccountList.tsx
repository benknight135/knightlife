import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { OpenBankingApiConfig } from './Banking';
import { AccountsResponse, Accounts } from './Banking';

type BankAccoutLinkProps = {
    openBankingApiConfig: OpenBankingApiConfig;
    authToken: string | null;
};

const useAccounts = (apiEndpoint: string, authToken: string, openBankingApiConfig: OpenBankingApiConfig) => {
    const [isLoadingAccounts, setLoadingAccounts] = useState<boolean>(true);
    const [accounts, setAccounts] = useState<Accounts | null>(null);

    useEffect(() => {
        const getAuthTokenAsync = async () => {
            if (apiEndpoint == null){
                setAccounts(null);
                setLoadingAccounts(false);
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
                    const {accounts: accountsJson, error}: AccountsResponse = await response.json()
                    if (response.ok) {
                        if (accountsJson) {
                            var accounts: Accounts = Object.assign(accountsJson)
                            setAccounts(accounts);
                        } else {
                            console.error("Did not find 'accounts' in response data");
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
            setLoadingAccounts(false);
        };

        getAuthTokenAsync();
    }, []);

    return { accounts, isLoadingAccounts };
};

const BankAccountList = ({openBankingApiConfig, authToken}: BankAccoutLinkProps) => {
    if (authToken != null){
        var apiEndpoint: string = "/api/BankAccounts";
        const { accounts, isLoadingAccounts } = useAccounts(apiEndpoint, authToken, openBankingApiConfig);
        if (isLoadingAccounts){
            return <ActivityIndicator />
        } else {
            if (accounts == null){
                return <ActivityIndicator />
            }
            const accountItems = accounts.map((account) =>
                <li key={account.id}>{account.name}</li>
            );
            return (
                <ul>{accountItems}</ul>
            );
        }
    }
    
    return <ActivityIndicator />
};

export default BankAccountList;