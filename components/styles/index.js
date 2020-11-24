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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        
        width: '80%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        display: 'flex'
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 0,
        textAlign: "center",
        fontFamily: "OpenSansCondensed_700Bold",
        textTransform: "uppercase",
        letterSpacing: -0.6,
        fontSize: 40,
        lineHeight: 44
      }
});