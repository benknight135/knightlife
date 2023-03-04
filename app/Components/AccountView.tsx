import { Text } from 'react-native';
import { AccountInfo } from '../Shared/Banking';
import SpendingAnalysisView from './SpendingAnalysisView';
import SpendingTable from './SpendingTable';

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
            <SpendingTable
                accountInfo={accountInfo}
            />
        </div>
    )
}

export default AccountView;