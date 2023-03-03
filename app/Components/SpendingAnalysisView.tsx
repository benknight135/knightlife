import { Text } from 'react-native';
import { AccountInfo } from '../Shared/Banking';

type SpendingAnalysisViewProps = {
    accountInfo: AccountInfo
};

const RoundTo2dp = (num: number): string => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

const SpendingAnalysisView = ({ accountInfo }: SpendingAnalysisViewProps) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Start</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Net</th>
                    <th>End</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{RoundTo2dp(accountInfo.analysis.startBalance)}</td>
                    <td>{RoundTo2dp(accountInfo.analysis.debit)}</td>
                    <td>{RoundTo2dp(accountInfo.analysis.credit)}</td>
                    <td>{RoundTo2dp(accountInfo.analysis.net)}</td>
                    <td>{RoundTo2dp(accountInfo.analysis.endBalance)}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default SpendingAnalysisView;