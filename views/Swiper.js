import React from 'react';
import styles from "../components/styles/index"
import { SafeAreaView, Text, View } from 'react-native';
import Header from "../components/Header"
import Cards from "../components/Cards"
import Buttons from "../components/Buttons"

export default function Swiper() {
  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <Header />
      {/* Cards */}
      <Cards movieList="http://morgarth.dumb1.com:3000/api/movies/search/rey leon" />
      {/* Buttons */}
      <Buttons />


      {/* Chats Screen */}
      {/* Individual Chat Screen */}

    </SafeAreaView>
  );
}
