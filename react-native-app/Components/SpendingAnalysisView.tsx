import { View, Text } from 'react-native';
import { numberToCurrency, CurrencyCode } from '../Utils/Tools';
import styles from '../Utils/Styles';
import { AccountInfo } from 'knightlife-api';

interface SpendingAnalysisViewProps {
    accountInfo: AccountInfo
};

const SpendingAnalysisView: React.FC<SpendingAnalysisViewProps> = ({accountInfo}) => {
    const currencyCode = CurrencyCode.GDP;
    return (
        <View style={styles.containerRowsStart}>
            <View style={styles.containerTableHeader}>
                    <Text style={styles.rowHeaderText}>Start</Text>
                    <Text style={styles.rowHeaderText}>Debit</Text>
                    <Text style={styles.rowHeaderText}>Credit</Text>
                    <Text style={styles.rowHeaderText}>Net</Text>
                    <Text style={styles.rowHeaderText}>End</Text>
            </View>
            <View style={styles.containerTableHeader}>
                <Text style={styles.rowText}>{numberToCurrency(accountInfo.analysis.startBalance, currencyCode)}</Text>
                <Text style={styles.rowText}>{numberToCurrency(accountInfo.analysis.debit, currencyCode)}</Text>
                <Text style={styles.rowText}>{numberToCurrency(accountInfo.analysis.credit, currencyCode)}</Text>
                <Text style={styles.rowText}>{numberToCurrency(accountInfo.analysis.net, currencyCode)}</Text>
                <Text style={styles.rowText}>{numberToCurrency(accountInfo.analysis.endBalance, currencyCode)}</Text>
            </View>
        </View>
    )
}

export default SpendingAnalysisView;