import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { socket } from "../components/Socket";
import UserContext from "../components/UserContext";

socket.on('Message', messages => {
  setMessages((prevMessages) => {
    console.log("Prev: "+prevMessages)
    console.log("New: "+messages)
    GiftedChat.append(prevMessages, messages)
  });
  console.log(messages)
})

function Chat(props) {

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
 
  function onSend(messages) {
    socket.emit('Message', messages);
  }

  function saveSendMessage(messages){

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