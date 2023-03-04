import { Text } from 'react-native';
import { AccountInfo, SpendingInfoIncomeCategory, SpendingInfoSpendingCategory, SpendingInfoSubscriptionCategory } from '../Shared/Banking';
import SpendingAnalysisView from './SpendingAnalysisView';
import TransactionTable from './TransactionTable';
import PieChart from './PieChart';

type AccountViewProps = {
    accountInfo: AccountInfo;
    index: number;
};

const AccountView = ({ accountInfo }: AccountViewProps) => {
    const pieChartRadius = 70;
    var values = []
    if (accountInfo.account.name == "Automatic"){
        for (var subCategory in SpendingInfoSubscriptionCategory) {
            var val = accountInfo.analysis.subscriptions[subCategory];
            values.push(val);
        }
    }
    if (accountInfo.account.name == "Spending"){
        for (var subCategory in SpendingInfoSpendingCategory) {
            var val = accountInfo.analysis.spending[subCategory];
            values.push(val);
        }
    }
    return (
        <div>
            <Text>
                {accountInfo.account.name}
            </Text>
            <SpendingAnalysisView
                accountInfo={accountInfo}
            />
            <PieChart
                values={values}
                radius={pieChartRadius}
            />
            <TransactionTable
                accountInfo={accountInfo}
            />
        </div>
    )
}

export default AccountView;