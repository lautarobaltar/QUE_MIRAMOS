import React from 'react';
import styles from "./styles/index"
import { Text,Image, TouchableHighlight, View } from 'react-native';


function Cards() {
    return (
        <View style={styles.cards}>
            <TouchableHighlight onPress={() => console.log("Card is clicked")} onLongPress={() => console.log("Card is longpressed")}>
                <Image 
                    source={{
                        width:350,
                        height:'99%',
                        uri: "https://picsum.photos/200/300"
                    }}  
                />
            </TouchableHighlight>
        </View>
    )
}

export default Cards