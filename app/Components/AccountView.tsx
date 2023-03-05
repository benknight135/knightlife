import { View, Text } from 'react-native';
import styles from '../Utils/Styles';
import { AccountInfo } from '../Shared/Banking';
import SpendingAnalysisView from './SpendingAnalysisView';
import TransactionTable from './TransactionTable';

type AccountViewProps = {
    accountInfo: AccountInfo
};

const AccountView: React.FC<AccountViewProps> = ({accountInfo}) => {
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