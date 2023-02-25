import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { OpenBankingApiConfig } from './Banking';
import { AccountsResults, AccountsJSONResponse } from './Banking';

type BankAccoutLinkProps = {
    openBankingApiConfig: OpenBankingApiConfig;
    authToken: string | null;
};

const useAccountsResults = (apiEndpoint: string, authToken: string, openBankingApiConfig: OpenBankingApiConfig) => {
    const [isLoadingAccountsResults, setLoadingAccountsResults] = useState<boolean>(true);
    const [accountsResults, setAccountsResults] = useState<AccountsResults | null>(null);

    useEffect(() => {
        const getAuthTokenAsync = async () => {
            if (apiEndpoint == null){
                setAccountsResults(null);
                setLoadingAccountsResults(false);
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
                    const {results, errors}: AccountsJSONResponse = await response.json()
                    if (response.ok) {
                        if (results) {
                            var accountListResult = Object.assign(results)
                            setAccountsResults(accountListResult);
                        } else {
                            console.error(results);
                            console.error("Did not find 'results' in response data");
                        }
                    } else {
                        // handle the graphql errors
                        const error = new Error(errors?.map(e => e.message).join('\n') ?? 'unknown')
                        console.error(error);
                    }
                } catch (error) {
                    console.error(error);
                }
            } catch (error) {
                console.error(error);
            }
            setLoadingAccountsResults(false);
        };

        getAuthTokenAsync();
    }, []);

    return { accountsResults, isLoadingAccountsResults };
};

const BankAccountList = ({openBankingApiConfig, authToken}: BankAccoutLinkProps) => {
    if (authToken != null){
        var apiEndpoint: string = "/api/BankAccounts";
        const { accountsResults, isLoadingAccountsResults } = useAccountsResults(apiEndpoint, authToken, openBankingApiConfig);
        if (isLoadingAccountsResults){
            return <ActivityIndicator />
        } else {
            if (accountsResults == null){
                return <ActivityIndicator />
            }
            const accountItems = accountsResults.map((account) =>
                <li>{account.display_name}</li>
            );
            return (
                <ul>{accountItems}</ul>
            );
        }
    }
    
    return <ActivityIndicator />
};

export default BankAccountList;