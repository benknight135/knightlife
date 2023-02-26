import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { OpenBankingApiConfig } from './Banking';
import { SpendingInfoResponse, SpendingInfo } from './Banking';
import { AccountInfo } from './Banking';

type SpendingViewProps = {
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

type TransactionTableProps = {
    accountInfo: AccountInfo;
};

const TransactionTable = ({accountInfo}: TransactionTableProps) => {
    const tableId = accountInfo.account.id + "table";
    var noData = (
        <Text>No Data</Text>
    )
    var tableRows = accountInfo.transactions.map((transaction, index) => {
        const tableRowId = index + tableId + transaction.id + transaction.timestamp + transaction.description;
        return (
            <tr key={tableRowId}>
                <td key={tableRowId + "description"}>{transaction.description}</td>
                <td key={tableRowId + "amount"}>{transaction.amount}</td>
                <td key={tableRowId + "timestamp"}>{transaction.timestamp}</td>
            </tr>
        )
    })
    var table = (
        <table>
            <thead key={accountInfo.account.id + "transactionsHead"}>
                <tr key={accountInfo.account.id + "transactionsHeader"}>
                    <th key={accountInfo.account.id + "transactionsHeaderDescription"}>Description</th>
                    <th key={accountInfo.account.id + "transactionsHeaderAmount"}>Amount</th>
                    <th key={accountInfo.account.id + "transactionsHeaderTime"}>Time</th>
                </tr>
            </thead>
            <tbody key={accountInfo.account.id + "transactionsBody"}>
                {tableRows}
            </tbody>
        </table>
    )
    return (
        <div>
            {accountInfo.transactions.length ? table : noData}
        </div>
    )
}

const SpendingView = ({openBankingApiConfig, authToken}: SpendingViewProps) => {
    if (authToken != null){
        var apiEndpoint: string = "/api/SpendingInfo";
        const { spendingInfo, isLoadingSpendingInfo } = useSpendingInfo(apiEndpoint, authToken, openBankingApiConfig);
        if (isLoadingSpendingInfo){
            return <ActivityIndicator />
        } else {
            if (spendingInfo == null){
                return <ActivityIndicator />
            }
            const accountTables = spendingInfo.accountsInfo.map((accountInfo, index) => (
                <div key={index + accountInfo.account.id + "tableDiv"}>
                    <Text key={index + accountInfo.account.id + "textHeader"}>{accountInfo.account.name}</Text>
                    <TransactionTable key={index + accountInfo.account.id + "transactionTable"} accountInfo={accountInfo}/>
                </div>
            ));
            return (
                <div>
                    {accountTables}
                </div>
            )
        }
    }
    
    return <ActivityIndicator />
};

export default SpendingView;