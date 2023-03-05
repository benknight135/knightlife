import { AccountInfo } from '../Shared/Banking';
import { Text } from 'react-native';
import styles from '../Utils/Styles';
import { CurrencyCode, numberToCurrency } from '../Utils/Tools';

interface TransactionTableProps {
    accountInfo: AccountInfo;
};

function truncateText(text: string, maxLength: number): string {
    var truncText = text;
    if (text.length > maxLength - 3) {
        truncText = truncText.slice(0, maxLength - 3) + "...";
    }
    return truncText;
}

const TransactionTable: React.FC<TransactionTableProps> = ({accountInfo}) => {
    const tableId = accountInfo.account.id + "table";
    var transactions = []
    const maxTransactions = 30;
    for (var i = 0; i < accountInfo.transactions.length; i++) {
        if (i > maxTransactions) {
            break;
        }
        transactions.push(accountInfo.transactions[i]);
    }
    var tableRows = transactions.map((categorisedTransaction, index) => {
        const transaction = categorisedTransaction.transaction;
        const tableRowId = index + tableId + transaction.id + transaction.timestamp + transaction.description;
        const transactionDate = new Date(Date.parse(transaction.timestamp)).toLocaleDateString();
        const textLength = 16;
        return (
            <tr key={tableRowId}>
                <td>{truncateText(transaction.description, textLength)}</td>
                <td>{numberToCurrency(transaction.amount, CurrencyCode.GDP)}</td>
                <td>{transactionDate}</td>
                {/* <td>{truncateText(categorisedTransaction.category, textLength)}</td>
                <td>{truncateText(categorisedTransaction.subCategory, textLength)}</td> */}
            </tr>
        )
    })
    var table = (
        <table style={styles.baseText}>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Time</th>
                    {/* <th>Category</th>
                    <th>Sub Category</th> */}
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    )
    return (
        accountInfo.transactions.length ? table : <Text style={styles.baseText}>No Data</Text>
    )
}

export default TransactionTable;