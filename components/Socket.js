import socketIOClient from "socket.io-client";

// const ENDPOINT = "http://morgarth.dumb1.com:3000/";
// let socket

// export const initiateSocket = (socket,room) => {
//     // const socket = socketIOClient(ENDPOINT);
//     socket.on('connect', function() {
//         console.log("connecting new user")
//         socket.emit('join', room, function(err) {
//             if(err){
//                 alert(err);
//                 // navigation.navigate('Login');
//             }else {
//                 console.log('No Error');
//             }
//         })
//     });
// }

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}

// export const subscribeToChat = (cb) => {
//   if (!socket) return(true);
//   socket.on('chat', msg => {
//     console.log('Websocket event received!');
//     return cb(null, msg);
//   });
// }

export const sendMessage = (socket, room, message) => {
  if (socket) socket.emit('chat', { message, room });
}