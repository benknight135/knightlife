import { View, Text } from 'react-native';
import styles from '../Utils/Styles';
import { AccountInfo } from '../Shared/Banking';
import SpendingAnalysisView from './SpendingAnalysisView';
import TransactionTable from './TransactionTable';

type AccountViewProps = {
    accountInfo: AccountInfo;
    index: number;
};

const AccountView = ({ accountInfo }: AccountViewProps) => {
    return (
        <View style={styles.accountView}>
            <Text style={styles.baseText}>
                {accountInfo.account.name}
            </Text>
            <SpendingAnalysisView
                accountInfo={accountInfo}
            />
            <TransactionTable
                accountInfo={accountInfo}
            />
        </View>
    )
}

export default AccountView;