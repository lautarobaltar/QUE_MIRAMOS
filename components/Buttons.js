import React from 'react';
import styles from "./styles/index"
import { Button, View } from 'react-native';
import { AntDesign, SimpleLineIcons} from '@expo/vector-icons';



function Buttons() {
    return (
        <View style={styles.buttons}>
            <AntDesign 
                name="dislike2" 
                size={32} 
                color="black" 
                onPress={() => console.log("dislike")}
            />
            <SimpleLineIcons 
                name="fire" 
                size={32} 
                color="black" 
                onPress={() => console.log("super like")}
            />
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