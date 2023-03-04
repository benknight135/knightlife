import { AccountInfo } from '../Shared/Banking';
import { Text } from 'react-native';

type SpendingTableProps = {
    accountInfo: AccountInfo;
};

const SpendingTable = ({accountInfo}: SpendingTableProps) => {
    const tableId = accountInfo.account.id + "table";
    var tableRows = accountInfo.analysis.spending.map((item, index) => {
        const tableRowId = index + tableId + item.name + item.category;
        return (
            <tr key={tableRowId}>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.category}</td>
            </tr>
        )
    })
    var table = (
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
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

export default SpendingTable;