import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import styles from "../components/styles/index";
import { SafeAreaView, Text, View } from 'react-native';
import Header from "../components/Header";
import Cards from "../components/Cards";
import Buttons from "../components/Buttons";
import { socket } from "../components/Socket";


export default function Chat() {
  const randomId = (Math.random() * 100);
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
   
    socket.emit("message", messages[0]);
    socket.on("message", msg => {
      console.log(msg);
      setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
    })
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      renderUsernameOnMessage={true}
      user={{_id: randomId, username: 'pepe'}}
    />
  );
}
