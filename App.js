import "react-native-gesture-handler";
import React from "react";
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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Swiper" component={Swiper} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Join" component={Join} />
          <Stack.Screen name="Create" component={Create} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
