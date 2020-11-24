import React, { Component } from "react";
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

class Cards extends Component {
  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
      movieList: [],
    };
  }
  componentDidMount() {
    fetch(this.props.movieList)
    .then((response) => response.json())
    .then((json) => {
      this.setState({movieList: json.results.slice(0,15)})
    })
    .catch((error) => console.error(error))
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
            console.log("movement right!")
            socket.emit("likedMovie",this.state.movieList[this.state.currentIndex])
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () =>{
              this.position.setValue({x: 0, y: 0})
            })
          })
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true,
          }).start(() => {
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
                }}
              >
                <ImageBackground
                  imageStyle={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    width: '100%', height: '100%'
                  }}
                  source={require("../assets/gradient.png")}
                >
                  <View style={{ padding: "1em" }}>
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
                  zIndex: -1,
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
                }}
              >
                <ImageBackground
                  imageStyle={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                  }}
                  source={require("../assets/gradient.png")}
                >
                  <View style={{ padding: "1em" }}>
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
    movieList.map(item => {
      if(item.poster_path != null){
        Image.prefetch("https://image.tmdb.org/t/p/w400" + item.poster_path)
      }
    });
    return (
      <View style={{ flex: 8 }}>
        <View style={{ flex: 1 }}>{this.renderMovies(movieList)}</View>
      </View>
    );
  }
}

export default Cards;
