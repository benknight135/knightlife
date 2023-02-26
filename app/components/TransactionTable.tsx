import { AccountInfo } from './Banking';
import { Text } from 'react-native';

type TransactionTableProps = {
    accountInfo: AccountInfo;
};

const TransactionTable = ({accountInfo}: TransactionTableProps) => {
    const tableId = accountInfo.account.id + "table";
    var tableRows = accountInfo.transactions.map((transaction, index) => {
        const tableRowId = index + tableId + transaction.id + transaction.timestamp + transaction.description;
        return (
            <tr key={tableRowId}>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.timestamp}</td>
            </tr>
        )
    })
    var table = (
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    )
    return (
        accountInfo.transactions.length ? table : <Text>No Data</Text>
    )
}

export default TransactionTable;