import styles from "../components/styles/index"
import React, {useState} from "react";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView, Text, View, FlatList } from "react-native";
import UserContext from "../components/UserContext";
import { socket } from "../components/Socket";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";



function Settings(props) {

  const [usersState, setUsersState] = useState();
  const navigation = useNavigation();

  socket.on("updateUsersList", (onlineUsers) => {
    setUsersState(onlineUsers);
    console.log(onlineUsers);
    console.log(usersState);   
  })

  return (
    <SafeAreaView style={styles.container}>
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
          Current User
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
          {props.user.name}
        </Text>
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
          Room
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
          {props.user.room}
        </Text>
        <Text
          style={{
            fontFamily: "OpenSansCondensed_700Bold",
            textTransform: "uppercase",
            letterSpacing: -0.5,
            fontSize: 30,
            marginBottom: 0,
            lineHeight: 50,
          }}
        >
          Other users in room
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
                <FontAwesome name="user" size={25} color="black" /> {item}{" "}
              </Text>
            )}
          />
        </View>
        <CustomButton
        
          title="Logout"
          onPress={() => {
            // socket.disconnect()
            navigation.navigate("Login");
          }}
        />
      </View>

    </SafeAreaView>
  );
}

const SettingsWithContext = (props) => (
  <UserContext.Consumer>
    {(user) => <Settings {...props} user={user} />}
  </UserContext.Consumer>
);

export default SettingsWithContext;
