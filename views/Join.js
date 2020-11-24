import React, { useEffect, useState } from "react";
import { Button, TextInput, Image } from "react-native";
import styles from "./styles/login";
import { SafeAreaView, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { OpenSansCondensed_700Bold } from "@expo-google-fonts/open-sans-condensed";
import { OpenSans_300Light } from "@expo-google-fonts/open-sans";
import { useNavigation } from "@react-navigation/native";
import SocketContext from "../components/SocketContext";
import UserContext from "../components/UserContext";
import { socket } from "../components/Socket";
/* import { initiateSocket, disconnectSocket,
  subscribeToChat, sendMessage } from '../components/Socket'; */

function Join(props) {
  const navigation = useNavigation();
  const rooms = ["A", "B", "C"];
  const [room, setRoom] = useState(rooms[0]);
  const [value, onChangeText] = React.useState("Room PIN");

  let [fontsLoaded] = useFonts({
    OpenSansCondensed_700Bold,
    OpenSans_300Light,
  });

  /* useEffect(() => {
    if (room) {
      console.log("initiate socket with room")
      initiateSocket(room);
    }
    subscribeToChat((err, data) => {
      if(err) return;
      setChat(oldChats =>[data, ...oldChats])
    });

    return () => {
      disconnectSocket();
    }
  }, [room]); */

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#fff",
        }}
      >
        <Image
          style={styles.logoImg}
          source={require("../assets/splash.png")}
        />
        <Text
          style={{
            fontFamily: "OpenSansCondensed_700Bold",
            textTransform: "uppercase",
            letterSpacing: -0.5,
            fontSize: 40,
            marginBottom: 30,
          }}
        >
          ¿Qué miramos?
        </Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          autoCapitalize="characters"
          onFocus={() => onChangeText("")}
        />
        <CustomButton
          title="Join room"
          style={{ marginTop: 8, marginBottom: 8 }}
          onPress={() => {
            let params = {name: props.user.name, room: value};
            props.user.room = value;
            console.log(params)
            socket.emit("join", params, function (err) {
              if (err) {
                alert(err);
                navigation.navigate("Login");
              } else {
                console.log("No Error");
                navigation.navigate("Create");
              }
            });
          }}
        />
      </View>
    );
  }
}

const JoinWithContext = (props) => (
  <UserContext.Consumer>
    {(user) => <Join {...props} user={user} />}
  </UserContext.Consumer>
);

export default JoinWithContext;
