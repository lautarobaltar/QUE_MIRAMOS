import React, { useState } from "react";
import styles from "../components/styles/index";
import {
  SafeAreaView,
  Text,
  View,
  Modal,
  TouchableHighlight,
  Alert,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import Header from "../components/Header";
import Cards from "../components/Cards";
import UserContext from "../components/UserContext";
import { socket } from "../components/Socket";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import {
  OpenSans_300Light,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";

function Swiper(props) {
  let search = "http://morgarth.dumb1.com:3000" + props.user.query;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [movieMatch, setMatch] = useState(0);

  socket.on("match", (movie) => {
    setMatch(movie);
    showModal();
  });

  function showModal() {
    setModalVisible(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>It's a match!</Text>
            <View
              style={[
                {
                  padding: 10,
                  height: 350,
                  width: 250,
                },
              ]}
            >
              <View
                style={{
                  bottom: 0,
                  left: 0,
                  right: 0,
                  position: "absolute",
                  padding: 10,
                  zIndex: 1,
                }}
              >
                <ImageBackground
                  style={{ width: "100%", height: "100%" }}
                  imageStyle={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                  }}
                  source={require("../assets/gradient.png")}
                >
                  <View style={{ padding: 16 }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 25,
                        color: "#ffffff",
                        textShadowColor: "rgba(0, 0, 0, 0.75)",
                        textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 10,
                      }}
                    >
                      {movieMatch.title}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: "cover",
                  borderRadius: 20,
                  zIndex: -1,
                }}
                source={{
                  uri:
                    "https://image.tmdb.org/t/p/w400" + movieMatch.poster_path,
                }}
              />
            </View>
            <CustomButton
              title="Keep Swiping"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{ marginBottom: 5 }}
            />
            <CustomButton
              title="Go to chat"
              onPress={() => {
                socket.emit("getRoomMessages",(props.user.room))
                navigation.navigate("Chat");
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>
      </Modal> 
      {/* Header */}
      <Header user={props.user} /> 
      {/* Cards */}
      <Cards movieList={search} user={props.user}/>

    </SafeAreaView>
  );
}

const SwiperWithContext = (props) => (
  <UserContext.Consumer>
    {(user) => <Swiper {...props} user={user} />}
  </UserContext.Consumer>
);

export default SwiperWithContext;
