import React from 'react';
import styles from "./styles/index"
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

function Header() {
    return (
        <View style={styles.header}  >
            <Ionicons name="ios-settings" size={32} color="black" onPress={() => console.log("home settings")}/>
            <FontAwesome name="eye" size={50} color="black" onPress={() => console.log("home logo")}/>
            <Ionicons name="md-chatboxes" size={32} color="black" onPress={() => console.log("home chats")}/>
        </View>
    )
}

export default Header