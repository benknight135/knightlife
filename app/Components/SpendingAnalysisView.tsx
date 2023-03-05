import { numberToCurrency, CurrencyCode } from '../Utils/Convert';
import styles from '../Utils/Styles';
import { AccountInfo } from '../Shared/Banking';

type SpendingAnalysisViewProps = {
    accountInfo: AccountInfo
};

const SpendingAnalysisView = ({ accountInfo }: SpendingAnalysisViewProps) => {
    const currencyCode = CurrencyCode.GDP;
    return (
        <table style={styles.baseText}>
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
                    <td>{numberToCurrency(accountInfo.analysis.startBalance, currencyCode)}</td>
                    <td>{numberToCurrency(accountInfo.analysis.debit, currencyCode)}</td>
                    <td>{numberToCurrency(accountInfo.analysis.credit, currencyCode)}</td>
                    <td>{numberToCurrency(accountInfo.analysis.net, currencyCode)}</td>
                    <td>{numberToCurrency(accountInfo.analysis.endBalance, currencyCode)}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default SpendingAnalysisView;