import React, { Component } from "react";
import Buttons from "../components/Buttons";
import CustomButton from "../components/CustomButton";
import styles from "./styles/index";
import {
  Text,
  Image,
  TouchableHighlight,
  View,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
  ImageBackground,
} from "react-native";
import { socket } from "./Socket";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const MAX_SWIPES = 15;

class Cards extends Component {
  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
      movieList: [],
      swipes: ''
    };
  }
  componentDidMount() {
    fetch(this.props.movieList)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ movieList: json.results.slice(0, MAX_SWIPES) });
        this.setState({ swipes: MAX_SWIPES });
      })
      .catch((error) => console.error(error));
  }
  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: true,
          }).start(() => {
            this.setState({ swipes: this.state.swipes - 1 });
            console.log("movement right!");
            socket.emit(
              "likedMovie",
              this.state.movieList[this.state.currentIndex]
            );
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true,
          }).start(() => {
            this.setState({ swipes: this.state.swipes - 1 });
            console.log("movement left!");
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    });
  }
  renderMovies = (apiCall) => {
    return apiCall
      .map((item, i) => {
        if (i < this.state.currentIndex) {
          return null;
        } else if (i == this.state.currentIndex) {
          return (
            <Animated.View
              {...this.PanResponder.panHandlers}
              key={i}
              style={[
                { transform: this.position.getTranslateTransform() },
                {
                  padding: 10,
                  height: SCREEN_HEIGHT - 180,
                  width: SCREEN_WIDTH,
                  position: "absolute",
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
                  zIndex: this.state.currentIndex + 1,
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
                        fontSize: 40,
                        color: "#ffffff",
                        textShadowColor: "rgba(0, 0, 0, 0.75)",
                        textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 10,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={4}
                      style={{
                        fontSize: 14,
                        color: "#ffffff",
                      }}
                    >
                      {item.overview}
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
                  zIndex: this.state.currentIndex - 1,
                }}
                source={{
                  uri: "https://image.tmdb.org/t/p/w400" + item.poster_path,
                }}
              />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={i}
              style={{
                padding: 10,
                height: SCREEN_HEIGHT - 180,
                width: SCREEN_WIDTH,
                position: "absolute",
              }}
            >
              <View
                style={{
                  bottom: 0,
                  left: 0,
                  right: 0,
                  position: "absolute",
                  padding: 10,
                  zIndex: this.state.currentIndex - i,
                }}
              >
                <ImageBackground
                  style={{ width: "100%", height: "100%" }}
                  imageStyle={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                  }}
                  style={{ width: "100%", height: "100%" }}
                  source={require("../assets/gradient.png")}
                >
                  <View style={{ padding: 16 }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 40,
                        color: "#ffffff",
                        textShadowColor: "rgba(0, 0, 0, 0.75)",
                        textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 10,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={4}
                      style={{
                        fontSize: 14,
                        color: "#ffffff",
                      }}
                    >
                      {item.overview}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              <Image
                style={[
                  {
                    flex: 1,
                    height: null,
                    width: null,
                    resizeMode: "cover",
                    borderRadius: 20,
                    zIndex: this.state.currentIndex - i - 1,
                  },
                ]}
                source={{
                  uri: "https://image.tmdb.org/t/p/w400" + item.poster_path,
                }}
              />
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  render() {
    const { movieList } = this.state;
    movieList.map((item) => {
      if (item.poster_path != null) {
        Image.prefetch("https://image.tmdb.org/t/p/w400" + item.poster_path);
      }
    });
    return (
      <View style={{ flex: 8 }}>
        <View style={{ flex: 7 }}>
          {this.renderMovies(movieList)}
          {this.state.swipes == 0 ? (
            <View
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: -99,
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSansCondensed_700Bold",
                  textTransform: "uppercase",
                  letterSpacing: -0.5,
                  fontSize: 40,
                  marginBottom: 10,
                }}
              >
                No more swipes
              </Text>
              <CustomButton
                title="Go to chat"
                style={{ width: "50%" }}
                onPress={() => {
                  socket.emit("getRoomMessages", props.user.room);
                  navigation.navigate("Chat");
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          ) : null}
        </View>
        <View style={{ flex: 1 }}>
          <Buttons cardCount={this.state.swipes} />
        </View>
      </View>
    );
  }
}

export default Cards;
