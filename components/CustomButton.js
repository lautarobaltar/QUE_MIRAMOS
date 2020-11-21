import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
    customButton:{
       backgroundColor: "#020202",
       borderRadius:15,
       paddingVertical: 10,
       paddingHorizontal: 12,
       width: '100%',
       height: 50
    },
    customButtonText: {
        fontSize: 18,
        color: '#ffffff',
        alignSelf: 'center',
        fontFamily: 'OpenSans_300Light',
        letterSpacing: -0.4
    }
});

const CustomButton = ({onPress, title, style}) => (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.customButton, style]}>
        <Text style={styles.customButtonText}> {title} </Text>
    </TouchableOpacity>
)

export default CustomButton;