import React from 'react';
import styles from "./styles/index"
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { socket } from "../components/Socket";

function Header(props) {
    const navigation = useNavigation();
    return (
        <View style={styles.header}  >
            <Ionicons name="ios-settings" size={32} color="black" onPress={() => navigation.navigate('Login')}/>
            <FontAwesome name="eye" size={50} color="black" onPress={() => navigation.navigate('Swiper')} />
            <Ionicons name="md-chatboxes" size={32} color="black" onPress={() => {
                socket.emit("getRoomMessages",(props.user.room))
                navigation.navigate('Chat')
                }}/>
        </View>
    )
}

export default Header