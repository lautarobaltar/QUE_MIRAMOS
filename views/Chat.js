import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import styles from "../components/styles/index";
import { SafeAreaView, Text, View } from "react-native";
import Header from "../components/Header";
import Cards from "../components/Cards";
import Buttons from "../components/Buttons";
import { socket } from "../components/Socket";
import UserContext from "../components/UserContext";

// export function Chat(props) {
//   useEffect(() => {
//     socket.on('message', messages => {
//       setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
//       console.log(messages)
      
//     })
//   })
//   const randomId = Math.random() * 100;
//   const [messages, setMessages] = useState([]);
//   useState(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: "Hello bitches",
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "¿Qué miramos?",
//           avatar: "https://placeimg.com/140/140/any",
//         },
//       },
//     ]);
//   }, []);

// /*   useEffect(() => {
//      socket.emit('loadMessages', {});
//      socket.on('loadMessages', msg => {
//        setMessages(msg);
//      })
//    }, []); */
 
//   function onSend(messages) {
//     socket.emit('newMessage', messages);
//   }

//   console.log(props.user.name);
//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(messages) => onSend(messages)}
//       renderUsernameOnMessage={true}
//       user={{ _id: randomId, name: props.user.name }}
//     />
//   );
// }

// const ChatWithContext = (props) => (
//   <UserContext.Consumer>
//     {(user) => <Chat {...props} user={user} />}
//   </UserContext.Consumer>
// );

// export default ChatWithContext;

import { AsyncStorage } from 'react-native';


const USER_ID = '@userId';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null
    };

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = socket;
    this.socket.on('message', this.onReceivedMessage);
    this.determineUser();
  }

  /**
   * When a user joins the chatroom, check if they are an existing user.
   * If they aren't, then ask the server for a userId.
   * Set the userId to the component's state.
   */
  determineUser() {
    AsyncStorage.getItem(USER_ID)
      .then((userId) => {
        // If there isn't a stored userId, then fetch one from the server.
        if (!userId) {
          this.socket.emit('userJoined', null);
          this.socket.on('userJoined', (userId) => {
            AsyncStorage.setItem(USER_ID, userId);
            this.setState({ userId });
          });
        } else {
          this.socket.emit('userJoined', userId);
          this.setState({ userId });
        }
      })
      .catch((e) => alert(e));
  }

  // Event listeners
  /**
   * When the server sends a message to this.
   */
  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  onSend(messages=[]) {
    this.socket.emit('message', messages[0]);
    this._storeMessages(messages);
  }

  render() {
    var user = { _id: this.state.userId || -1 };

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={user}
      />
    );
  }

  // Helper functions
  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
}

module.exports = Main;
