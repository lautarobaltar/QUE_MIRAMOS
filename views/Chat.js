import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import socketIOClient from "socket.io-client";

export default function Chat() {

  const [messages, setMessages] = useState([]);

  socket.on('newMessage', function(message) {
    setMessages(message)
  })

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
    console.log(messages)
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
