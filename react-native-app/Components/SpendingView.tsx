import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { env } from '../Utils/Env';
import styles from '../Utils/Styles';
import { OpenBankingApiConfig } from 'knightlife-api';
import { SpendingInfoIncomeCategory, SpendingInfoSavingCategory } from 'knightlife-api';
import { SpendingInfoSpendingCategory, SpendingInfoSubscriptionCategory } from 'knightlife-api';
import { SpendingInfoResponse, SpendingInfo } from 'knightlife-api';
import SpendingPieChart, { PieChartSegmentData } from './SpendingPieChart';
import AccountView from './AccountView';

interface SpendingViewProps {
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

const SpendingView: React.FC<SpendingViewProps> = ({openBankingApiConfig, authToken}) => {
    if (authToken != null) {
        const { spendingInfo, isLoadingSpendingInfo } = useSpendingInfo(authToken, openBankingApiConfig);
        if (isLoadingSpendingInfo) {
            return <ActivityIndicator />
        } else {
            if (spendingInfo == null) {
                return <ActivityIndicator />
            }
            
            var income: any = {}
            var subscriptions: any = {}
            var spending: any = {}
            var saving: any = {}
            
            for (var subCategory in SpendingInfoIncomeCategory) {
                income[subCategory] = 0;
            }
            for (var subCategory in SpendingInfoSubscriptionCategory) {
                subscriptions[subCategory] = 0;
            }
            for (var subCategory in SpendingInfoSpendingCategory) {
                spending[subCategory] = 0;
            }
            for (var subCategory in SpendingInfoSavingCategory) {
                saving[subCategory] = 0;
            }
            for (var i = 0; i < spendingInfo.accountsInfo.length; i++) {
                for (var category in SpendingInfoSubscriptionCategory){
                    subscriptions[category] += spendingInfo.accountsInfo[i].analysis.subscriptions[category];
                }
                for (var category in SpendingInfoSpendingCategory){
                    spending[category] += spendingInfo.accountsInfo[i].analysis.spending[category];
                }
                for (var category in SpendingInfoIncomeCategory){
                    income[category] += spendingInfo.accountsInfo[i].analysis.income[category];
                }
                for (var category in SpendingInfoSavingCategory){
                    saving[category] += spendingInfo.accountsInfo[i].analysis.saving[category];
                }
            }
            
            var subscriptionDatas: Array<PieChartSegmentData> = [];
            var spendingDatas: Array<PieChartSegmentData> = [];
            var incomeDatas: Array<PieChartSegmentData> = [];
            var savingDatas: Array<PieChartSegmentData> = [];
            for (var category in SpendingInfoSubscriptionCategory){
                subscriptionDatas.push(
                    {
                        name: category,
                        amount: subscriptions[category]
                    }
                );
            }
            for (var category in SpendingInfoSpendingCategory){
                spendingDatas.push(
                    {
                        name: category,
                        amount: spending[category]
                    }
                );
            }
            for (var category in SpendingInfoIncomeCategory){
                incomeDatas.push(
                    {
                        name: category,
                        amount: income[category]
                    }
                );
            }
            for (var category in SpendingInfoSavingCategory){
                savingDatas.push(
                    {
                        name: category,
                        amount: saving[category]
                    }
                );
            }
            
            const accountViews = spendingInfo.accountsInfo.map((accountInfo, index) => (
                <AccountView
                    accountInfo={accountInfo}
                    key={accountInfo.account.id + "AccountView"}
                />
            ));
            const pieChartRadius = 70;
            return (
                <View style={styles.container}>
                    <View style={styles.card}>
                        <SpendingPieChart
                            segmentData={incomeDatas}
                            redNegative={true}
                            radius={pieChartRadius}
                            title={"Income"}
                        />
                        <SpendingPieChart
                            segmentData={subscriptionDatas}
                            redNegative={false}
                            radius={pieChartRadius}
                            title={"Subscriptions"}
                        />
                        <SpendingPieChart
                            segmentData={spendingDatas}
                            redNegative={false}
                            radius={pieChartRadius}
                            title={"Spending"}
                        />
                        <SpendingPieChart
                            segmentData={savingDatas}
                            redNegative={true}
                            radius={pieChartRadius}
                            title={"Saving"}
                        />
                    </View>
                    <View style={styles.accountsCard}>
                        {accountViews}
                    </View>
                </View>
            )
        }
    }

    return <ActivityIndicator />
};

export default SpendingView;