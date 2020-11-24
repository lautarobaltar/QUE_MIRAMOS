import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import styles from "../components/styles/index";
import { SafeAreaView, Text, View } from "react-native";
import Header from "../components/Header";
import Cards from "../components/Cards";
import Buttons from "../components/Buttons";
import { socket } from "../components/Socket";
import UserContext from "../components/UserContext";

export function Chat(props) {
  const randomId = Math.random() * 100;
  const [messages, setMessages] = useState([]);
  useState(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello bitches",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "¿Qué miramos?",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  useEffect(() => {
    socket.on("message2", msg => {
      setMessages(previous => {
        console.log(msg[0].text);
        console.log(messages[0].text);
        if(msg[0].text != messages[0].text){
          return [ 
            msg[0],
            ...previous           
          ];
        }        
      });
    })
  })

  return (
    <GiftedChat
      messages={messages}
      onSend={(msg) => socket.emit("newMessage", msg)}
      renderUsernameOnMessage={true}
      user={{ _id: randomId, name: props.user.name }}
    />
  );
}

const ChatWithContext = (props) => (
  <UserContext.Consumer>
    {(user) => <Chat {...props} user={user} />}
  </UserContext.Consumer>
);

export default ChatWithContext;
