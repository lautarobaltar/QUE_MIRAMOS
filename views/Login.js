import React from "react";
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

function Login(props) {
  const navigation = useNavigation();
  const [nameValue, onChangeText] = React.useState("Your name");
  let [fontsLoaded] = useFonts({
    OpenSansCondensed_700Bold,
    OpenSans_300Light,
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
          onFocus={() => onChangeText("")}
          onChangeText={(text) => {
            onChangeText(text);
            props.user.name = text;
          }}
          value={nameValue}
        />
        <CustomButton
          title="Create a room"
          style={{ marginTop: 8, marginBottom: 8 }}
          onPress={() => {
            socket.emit("create", props.user.name, function (err) {
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
        <CustomButton
          title="Join a room"
          onPress={() => {
            navigation.navigate("Join");
          }}
        />
      </View>
    );
  }
}

const LoginWithContext = (props) => (
  <UserContext.Consumer>
    {(user) => <Login {...props} user={user} />}
  </UserContext.Consumer>
);

export default LoginWithContext;
