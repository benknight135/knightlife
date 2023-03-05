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
    containerTableHeader: {
        flex: 1,
        padding: 3,
        backgroundColor: '#2e2e2e',
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        height: 5,
        flexDirection: 'row',
        flexWrap: "nowrap"
    },
    containerRowsTop: {
        flex: 1,
        padding: 0,
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        flexDirection: 'row'
    },
    containerRowsStart: {
        padding: 0,
        margin: 5,
        justifyContent: 'center',
        width: "100%"
    },
    card: {
        margin: 5,
        padding: 5,
        width: '95%',
        backgroundColor: "#252526",
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 5
    },
    accountsCard: {
        margin: 5,
        padding: 5,
        width: "95%",
        backgroundColor: "#252526",
        justifyContent: "center",
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 5
    },
    baseText: {
        color: "#C2CCCC",
        margin: 3,
        textAlign: "center"
    },
    boldText: {
        color: "#C2CCCC",
        margin: 3,
        fontWeight: "bold"
    },
    subHeadingText: {
        color: "#C2CCCC",
        fontWeight: "400",
        margin: 5,
        fontSize: 16,
        textAlign: "center",
        width: "100%"
    },
    cardContent: {
        margin: 5,
        padding: 3,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    cardWheelButtons: {
        margin: 1,
        padding: 1,
        width: "70%",
        minHeight: "15%",
        backgroundColor: "#2e2e2e",
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 1
    },
    cardWheelButtonsContent: {
        margin: 1,
        padding: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    cardWheelContent: {
        margin: 1,
        padding: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    accountView: {
        margin: 1,
        padding: 5,
        minWidth: 400,
        justifyContent: "flex-start",
    },
    pieChartCentreLabel: {
        position: "absolute",
        textAlign: "center",
        fontWeight: "400",
        color: "#C2CCCC",
        fontSize: 16,
    },
    pieChartDescLabel: {
        color: "#C2CCCC",
        fontWeight: "100",
        margin: 1,
        fontSize: 13,
    },
    rowText: {
        color: "#C2CCCC",
        margin: 2,
        width: "33.33%",
        textAlign: "center",
        flexWrap: "nowrap"
    },
    row1Text: {
        color: "#C2CCCC",
        margin: 2,
        width: "33.33%",
        textAlign: "left",
        flexWrap: "nowrap"
    },
    rowHeaderText: {
        color: "#C2CCCC",
        margin: 3,
        fontWeight: "bold",
        width: "33.33%",
        textAlign: "center"
    },
});

export default styles