import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import styles from "./components/styles/index";
import { SafeAreaView, Text, View, Button } from "react-native";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Buttons from "./components/Buttons";
import Swiper from "./views/Swiper";
import Chat from "./views/Chat";
import Settings from "./views/Settings";
import Login from "./views/Login";
import Create from "./views/Create";
import Join from "./views/Join";
import Preferences from "./views/Preferences";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import io from 'socket.io-client';
import SocketContext from './components/SocketContext';
import UserContext from './components/UserContext';
import {socket} from './components/Socket';
// import { initiateSocket, disconnectSocket,
//   subscribeToChat, sendMessage } from './components/Socket';

const Stack = createStackNavigator();

let user = {
  name: '',
  room: ''
};

export function App() {
  useEffect(() => {
    console.log(`Connecting socket...`);
    console.log(socket);
  })
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
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

export default App;