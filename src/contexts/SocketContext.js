import React, { createContext, useContext, useEffect, useRef, ReactNode, useState } from 'react';
import { ToastAndroid } from 'react-native';
import io, { Socket } from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    //const newSocket = io('http://192.168.0.14:5050/chat', {
    //  transports: ['websocket'],
   // }

    const newSocket = io('http://10.0.2.2:5050/chat', {
       transports: ['websocket'],
     }
  );

    newSocket.on('connect', () => {
      console.log('Connected with ID:', newSocket.id);
      newSocket.emit('mobile_client_connected', { connected: true }, (response) => {
        console.log(response);
      });
      ToastAndroid.show('Connected to server', ToastAndroid.LONG);
    });

    newSocket.on('connect_to_client', (data) => {
      const greets = JSON.parse(data);
      console.log(greets);
    });

    newSocket.on('error', (error) => {
      ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
