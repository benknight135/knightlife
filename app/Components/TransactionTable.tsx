import { Text, View } from 'react-native';
import styles from '../Utils/Styles';
import { AccountInfo } from './KnightLifeApi';
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
    const maxTransactions = accountInfo.transactions.length;
    for (var i = 0; i < accountInfo.transactions.length; i++) {
        if (i > maxTransactions) {
            break;
        }
        transactions.push(accountInfo.transactions[i]);
    }
    var rows = transactions.map((categorisedTransaction, index) => {
        const transaction = categorisedTransaction.transaction;
        const tableRowId = index + tableId + transaction.id + transaction.timestamp + transaction.description;
        const transactionDate = new Date(Date.parse(transaction.timestamp)).toLocaleDateString();
        const textLength = 15;
        return (
            <View key={tableRowId} style={styles.containerTableHeader}>
                <Text numberOfLines={1} style={styles.row1Text}>{truncateText(transaction.description, textLength)}</Text>
                <Text style={styles.rowText}>{numberToCurrency(transaction.amount, CurrencyCode.GDP)}</Text>
                <Text style={styles.rowText}>{transactionDate}</Text>
            </View>
        )
    })
    var table = (
        <View style={styles.containerRowsStart}>
            <View style={styles.containerTableHeader}>
                <Text style={styles.rowHeaderText}>Description</Text>
                <Text style={styles.rowHeaderText}>Amount</Text>
                <Text style={styles.rowHeaderText}>Time</Text>
            </View>
            {rows}
        </View>
    )
    return (
        accountInfo.transactions.length ? table : <Text style={styles.baseText}>No Data</Text>
    )
}

export default TransactionTable;