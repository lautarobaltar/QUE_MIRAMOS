import React from 'react';
import styles from "../components/styles/index"
import { SafeAreaView, Text, View } from 'react-native';
import Header from "../components/Header"
import Cards from "../components/Cards"
import Buttons from "../components/Buttons"
import UserContext from "../components/UserContext";
import {socket} from '../components/Socket';

function Swiper(props) {
  
  let search = "http://morgarth.dumb1.com:3000" + props.user.query

  socket.on("match", (movie) => {
    alert(movie.title)
  })

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <Header />
      {/* Cards */}
      <Cards movieList={search} />
      {/* Buttons */}
      <Buttons />


      {/* Chats Screen */}
      {/* Individual Chat Screen */}

    </SafeAreaView>
  );
}

const SwiperWithContext = (props) => (
  <UserContext.Consumer>
    {(user) => <Swiper {...props} user={user} />}
  </UserContext.Consumer>
);

export default SwiperWithContext;
