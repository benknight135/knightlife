import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: '#1E1E1E',
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    card: {
        margin: 5,
        padding: 5,
        width: '95%',
        backgroundColor:"#252526",
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 5
    },
    baseText: {
        color: "#C2CCCC",
        margin: 5,
    },
    cardContent: {
        margin: 1,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    accountView: {
        margin: 1,
        padding: 5,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    pieChartLabel: {
        position: "absolute",
        textAlign: "center",
        fontWeight: "400",
        color: "#C2CCCC",
        fontSize: 16,
    }
});

export default styles