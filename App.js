import "react-native-gesture-handler";
import React from "react";
import styles from "./components/styles/index";
import { SafeAreaView, Text, View, Button } from "react-native";
import Swiper from "./views/Swiper";
import Chat from "./views/Chat";
import Settings from "./views/Settings";
import Login from "./views/Login";
import Create from "./views/Create";
import Join from "./views/Join";
import Preferences from "./views/Preferences";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import socketIOClient from "socket.io-client";

const Stack = createStackNavigator();
const ENDPOINT = "http://morgarth.dumb1.com:3000/";
const socket = socketIOClient(ENDPOINT);



export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} socket={socket}/>
        <Stack.Screen name="Join" component={Join} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Preferences" component={Preferences} />
        <Stack.Screen name="Swiper" component={Swiper} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
