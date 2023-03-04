import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    pieChart: {
        margin: 1,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    pieChartLabel: {
        position: "absolute",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 20,
    },
    card: {
        margin: 1,
        padding: 5,
        width: '95%',
        backgroundColor:"#fff",
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius:5
    },
});

export default styles