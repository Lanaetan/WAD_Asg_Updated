// import React, { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
// import { ToastAndroid } from 'react-native';
// import io, { Socket } from 'socket.io-client';

// // Define a proper type for the context value
// interface SocketContextProps {
//   socket: Socket | null;
// }

// // Create the context with an initial value
// const SocketContext = createContext<SocketContextProps>({ socket: null });

// // Define props type for the provider
// interface SocketProviderProps {
//   children: ReactNode;
// }

// export const SocketProvider = ({ children }: SocketProviderProps) => {
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     socketRef.current = io('http://192.168.0.14:5050/chat', {
//       transports: ['websocket'],
//     });

//     socketRef.current.on('connect', () => {
//       console.log('Connected with ID:', socketRef.current?.id);
//       socketRef.current?.emit('mobile_client_connected', { connected: true }, (response: any) => {
//         console.log(response);
//       });
//       ToastAndroid.show('Connected to server', ToastAndroid.LONG);
//     });

//     socketRef.current.on('connect_to_client', (data: string) => {
//       const greets = JSON.parse(data);
//       console.log(greets);
//     });

//     socketRef.current.on('error', (error: any) => {
//       ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
//     });

//     socketRef.current.on('disconnect', () => {
//       console.log('Disconnected from socket server');
//     });

//     return () => {
//       socketRef.current?.disconnect();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket: socketRef.current }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// // Hook to use the socket context
// export const useSocket = () => {
//   return useContext(SocketContext);
// };

import React, { createContext, useContext, useEffect, useRef, ReactNode, useState } from 'react';
import { ToastAndroid } from 'react-native';
import io, { Socket } from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://192.168.0.14:5050/chat', {
      transports: ['websocket'],
    });

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
