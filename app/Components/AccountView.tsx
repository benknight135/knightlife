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
    return (
        <div>
            <Text>
                {accountInfo.account.name}
            </Text>
            <SpendingAnalysisView
                accountInfo={accountInfo}
            />
            <TransactionTable
                accountInfo={accountInfo}
            />
        </div>
    )
}

export default AccountView;