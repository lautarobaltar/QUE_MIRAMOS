import React, { useState, setState, useEffect } from "react";
import { Button, TextInput, Image } from "react-native";
import styles from "./styles/login";
import { SafeAreaView, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { OpenSansCondensed_700Bold } from "@expo-google-fonts/open-sans-condensed";
import { OpenSans_300Light } from "@expo-google-fonts/open-sans";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Label } from "@material-ui/icons";
import RNPickerSelect from 'react-native-picker-select';


export default function Preferences() {
  const [genre, setGenre] = useState([{
    genre: ''
  }]);
  const [stars, setStars] = useState([{
    stars: ''
  }]);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    async function fetchGenres() {
      const res = await fetch('http://morgarth.dumb1.com:3000/api/genres/');
      res.json()
        .then(res => setGenres(res.genres))
        .catch(err => console.error(err));
    }
    fetchGenres();
  }, []
  )
  const [value, onChangeText] = React.useState("Keywords");
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    OpenSansCondensed_700Bold,
    OpenSans_300Light,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
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
          Preferences
      </Text>
        <View style={[styles.nameInput, { padding: 0 }]}>
          
          <RNPickerSelect
            onValueChange={(value) => setGenre({ genre: value })}
            items={genres.map((genre, i) => ({
              
                label: genre.name,
                value: genre.id
              
             }))}
          />
        </View>
        <View style={[styles.nameInput, { padding: 0 }]}>
          <Picker
            selectedValue={stars.stars}
            onValueChange={(itemValue, itemIndex) =>
              setStars({ stars: itemValue })
            }>
            <Picker.Item label="★" value="1" />
            <Picker.Item label="★★" value="2" />
            <Picker.Item label="★★★" value="3" />
            <Picker.Item label="★★★★" value="4" />
            <Picker.Item label="★★★★★" value="5" />
          </Picker>
        </View>
        <TextInput
          style={styles.nameInput}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        />
        <CustomButton
          title="Start game"
          style={{
            textTransform: "uppercase",
          }}
          onPress={() => navigation.navigate('Swiper')}
        />
      </View>
    );
  }
}
