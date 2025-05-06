// socket.js
import { io } from 'socket.io-client';

const socket = io('http://192.168.0.14:5050/chat', {
  transports: ['websocket'],
  // autoConnect: false, // prevent auto connect until manually triggered
});

export default socket;
