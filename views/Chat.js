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
  useEffect(() => {
    socket.on('message', messages => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
      console.log(messages)
      
    })
  })
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

/*   useEffect(() => {
     socket.emit('loadMessages', {});
     socket.on('loadMessages', msg => {
       setMessages(msg);
     })
   }, []); */
 
  function onSend(messages) {
    socket.emit('newMessage', messages);
  }
  console.log(props.user.name);
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
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
