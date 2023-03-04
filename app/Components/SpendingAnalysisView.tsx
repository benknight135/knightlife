import { NumberToCurrency, CurrencyCode } from '../Utils/Convert';
import { AccountInfo } from '../Shared/Banking';

type SpendingAnalysisViewProps = {
    accountInfo: AccountInfo
};

const SpendingAnalysisView = ({ accountInfo }: SpendingAnalysisViewProps) => {
    const currencyCode = CurrencyCode.GDP;
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
                    <td>{NumberToCurrency(accountInfo.analysis.startBalance, currencyCode)}</td>
                    <td>{NumberToCurrency(accountInfo.analysis.debit, currencyCode)}</td>
                    <td>{NumberToCurrency(accountInfo.analysis.credit, currencyCode)}</td>
                    <td>{NumberToCurrency(accountInfo.analysis.net, currencyCode)}</td>
                    <td>{NumberToCurrency(accountInfo.analysis.endBalance, currencyCode)}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default SpendingAnalysisView;