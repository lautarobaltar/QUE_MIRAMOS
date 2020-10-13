import { StyleSheet } from "react-native";

const PRIMARY_COLOR = "#fff";
const BLACK = "#000000";


export default StyleSheet.create({
	// COMPONENT - Home Container
	container: {
        backgroundColor: PRIMARY_COLOR,
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex:1,
        padding: 10
    },
    cards: {
        alignItems: "center",
        justifyContent: "center",
        flex:5,
        flexDirection: "row",
        margin: 10,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
    },
    buttons: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    }
});