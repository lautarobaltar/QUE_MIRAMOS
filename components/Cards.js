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
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const mockMovies = [
  {
    id: "1",
    uri:
      "https://xl.movieposterdb.com/20_09/2018/1034415/xl_1034415_9a73edb1.jpg",
  },
  {
    id: "2",
    uri:
      "https://xl.movieposterdb.com/15_05/2011/2098220/xl_2098220_007c38db.jpg",
  },
  {
    id: "3",
    uri:
      "https://xl.movieposterdb.com/20_01/2019/6751668/xl_6751668_406fee8d.jpg",
  },
  {
    id: "4",
    uri:
      "https://xl.movieposterdb.com/13_02/2001/241527/xl_241527_da927a3d.jpg",
  },
  {
    id: "5",
    uri:
      "https://xl.movieposterdb.com/13_05/2002/275022/xl_275022_1b894848.jpg",
  },
];

class Cards extends Component {
  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.state = {
        currentIndex: 0
    }
  }
  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if(gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy}
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () =>{
              this.position.setValue({x: 0, y: 0})
            })
          })
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy}
          }).start(()=> {
            this.setState({currentIndex: this.state.currentIndex + 1}, () => {
              this.position.setValue({x: 0, y: 0})
            })
          })
        } else {
          Animated.spring(this.position, {
            toValue: {x: 0, y:0},
            friction: 4
          }).start()
        }
      },
    });
  }
  renderMovies = () => {
    return mockMovies.map((item, i) => {
      if (i < this.state.currentIndex ) {
          return null;
      } else if ( i == this.state.currentIndex ) {
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
            }
          ]}
        >
          <Image
            style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: "cover",
              borderRadius: 20,
            }}
            source={{ uri: item.uri }}
          />
        </Animated.View>
        )
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
          <Image
            style={[{
              flex: 1,
              height: null,
              width: null,
              resizeMode: "cover",
              borderRadius: 20,
            }]}
            source={{ uri: item.uri }}
          />
        </Animated.View>
        )
      }
    }).reverse();
  };
  render() {
    return (
      <View style={{ flex: 8 }}>
        <View style={{ flex: 1 }}>{this.renderMovies()}</View>
      </View>
    );
  }
}

export default Cards;
