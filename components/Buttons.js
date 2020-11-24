import React, {useState} from 'react';
import styles from "./styles/index"
import { Button, Text, View } from 'react-native';
import { AntDesign, SimpleLineIcons} from '@expo/vector-icons';
import {
    OpenSans_300Light,
    OpenSans_800ExtraBold,
  } from "@expo-google-fonts/open-sans";


function Buttons(props) {
    return (
        <View style={styles.buttons}>
            <AntDesign 
                name="dislike2" 
                size={32} 
                color="black" 
                onPress={() => console.log("dislike")}
            />
            
            <Text style={{
            fontFamily: "OpenSansCondensed_700Bold",
            textTransform: "uppercase",
            letterSpacing: -0.5,
            fontSize: 40,
            marginBottom: 0,
          }}>
                {props.cardCount}
            </Text>
            <AntDesign 
                name="like2" 
                size={32} 
                color="black" 
                onPress={() => console.log("like")}
            />
        </View>
    )
}

export default Buttons