import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { socket } from "../components/Socket";
import UserContext from "../components/UserContext";

export function Chat(props) {
  const randomId = Math.random() * 100;
  const [messages, setMessages] = useState([]);

  const onSend = async (message = []) => { 
    const newMessages = await GiftedChat.append(messages, message);
    socket.on('message2', newMessages => { setMessages(newMessages) }); 
    socket.emit('newMessage', newMessages); }

  socket.on("restoreMessages", (messages) => {
    setMessages(messages)
  })
  
  return (
    <GiftedChat
      messages={messages}
      onSend={(msg) => onSend(msg)}
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
