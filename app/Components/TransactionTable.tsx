import { AccountInfo } from '../Shared/Banking';
import { Text } from 'react-native';

type TransactionTableProps = {
    accountInfo: AccountInfo;
};

const TransactionTable = ({accountInfo}: TransactionTableProps) => {
    const tableId = accountInfo.account.id + "table";
    var tableRows = accountInfo.transactions.map((categorisedTransaction, index) => {
        const transaction = categorisedTransaction.transaction;
        const tableRowId = index + tableId + transaction.id + transaction.timestamp + transaction.description;
        return (
            <tr key={tableRowId}>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.timestamp}</td>
                <td>{categorisedTransaction.category}</td>
                <td>{categorisedTransaction.subCategory}</td>
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
                    <th>Category</th>
                    <th>Sub Category</th>
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