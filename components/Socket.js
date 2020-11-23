import io from 'socket.io-client';

var socket;
let params = { user: "lautaro", room : "test123"}

export const initiateSocket = (room) => {
  let socket = io.connect('http://morgarth.dumb1.com:3000');
  console.log(`Connecting socket...`);
  console.log(params)
  console.log(socket)
  if (socket && room){ 
        console.log("there is socket")
        socket.emit('join', params, function(err) {
            if(err){
                alert(err);
                navigation.navigate('Login');
            }else {
                console.log('No Error');
            }
        })
        console.log("end emit join")
    }
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}

export const subscribeToChat = (cb) => {
  if (!socket) return(true);
  socket.on('chat', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}

export const sendMessage = (room, message) => {
  if (socket) socket.emit('chat', { message, room });
}