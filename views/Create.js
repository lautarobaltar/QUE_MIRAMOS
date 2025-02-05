import React, {useEffect, useState} from "react";
import { Button, TextInput, Image } from "react-native";
import styles from "./styles/login";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView, Text, View, FlatList } from "react-native";
import CustomButton from "../components/CustomButton";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { OpenSansCondensed_700Bold } from "@expo-google-fonts/open-sans-condensed";
import {
  OpenSans_300Light,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import { useNavigation } from "@react-navigation/native";
import SocketContext from "../components/SocketContext";
import UserContext from "../components/UserContext";
import { socket } from "../components/Socket";

function Create(props) {
  const [roomState, setRoomState] = useState({pin: ''});
  const [usersState, setUsersState] = useState();
  console.log(props.user.admin)
  const navigation = useNavigation();
  const [value, onChangeText] = React.useState("Your name");

  useEffect(() => {
    if(roomState.pin === ''){
      socket.emit("sendRoomPin");
      socket.on("getRoomPin", (roomPin) => {
        setRoomState({pin: roomPin});
        props.user.room = roomPin
        console.log(roomPin);
      })
    }

    socket.on("start", (query) => {
      props.user.query = query;
      navigation.navigate("Swiper")
    });
    
  });
  socket.on("updateUsersList", (onlineUsers) => {
    setUsersState(onlineUsers);
    console.log(onlineUsers);
    console.log(usersState);   
  })
  let [fontsLoaded] = useFonts({
    OpenSansCondensed_700Bold,
    OpenSans_800ExtraBold,
  });
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
        <Text
          style={{
            fontFamily: "OpenSansCondensed_700Bold",
            textTransform: "uppercase",
            letterSpacing: -0.5,
            fontSize: 40,
            marginBottom: 0,
            lineHeight: 50,
          }}
        >
          Room pin
        </Text>
        <Text
          style={{
            fontFamily: "OpenSans_800ExtraBold",
            textTransform: "uppercase",
            letterSpacing: -0.5,
            fontSize: 80,
            marginBottom: 30,
            lineHeight: 100,
          }}
        >
          {roomState.pin}
        </Text>

        <View>
          <FlatList
            style={{
              flexGrow: 0,
              marginBottom: 30,
            }}
            data={usersState}
            renderItem={({ item }) => (
              <Text style={{ paddingBottom: 5, fontSize: 16 }}>
                {" "}
                <FontAwesome name="user" size={20} color="black" /> {item}{" "}
              </Text>
            )}
          />
        </View>
        {props.user.admin ? (
          <CustomButton
          disabled={!props.user.admin}
          title="Start game"
          onPress={() => {
            navigation.navigate("Preferences");
          }}
        />
        ) : (
          <Text
          style={{
            fontFamily: "OpenSans_300Light",
            letterSpacing: -0.5,
            fontSize: 20,
            marginBottom: 0,
            lineHeight: 50,
          }}
        >
          The host will start the game soon...
        </Text>
        )}
        
      </View>
    );
  }
}

const CreateWithContext = (props) => (
  <UserContext.Consumer>
    {(user) => <Create {...props} user={user} />}
  </UserContext.Consumer>
);

export default CreateWithContext;
