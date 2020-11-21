import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import styles from "../components/styles/index"
import { SafeAreaView, Text, View } from 'react-native';
import Header from "../components/Header"
import Cards from "../components/Cards"
import Buttons from "../components/Buttons"

export default function Chat() {
  const [messages, setMessages] = useState([]);
  useState(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello bitches',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: '¿Qué miramos?',
          avatar: 'https://placeimg.com/140/140/any'
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{_id: 1}}
    />
  );
}
