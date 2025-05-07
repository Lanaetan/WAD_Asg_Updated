import React, { useEffect } from "react";
import {View, FlatList, Alert, ToastAndroid} from "react-native";
import ChatListItem from "../components/ChatListItem";
import { useAuth } from "../contexts/AuthContext";
import { useSocket } from '../contexts/SocketContext';
import { createMessage } from "../db-service/messageService";
import { getDBConnection } from "../db-service/database";
import { io } from "socket.io-client";


const ChatsScreen = ({users, refresh, newMessageFlag}: any) => {
  const { user } = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    // re-fetch messages from DB whenever new message flag changes
    
  }, [newMessageFlag]);

  useEffect(() => {
    console.log(socket);
  })
  
  // const { socket } = useSocket();

  // useEffect(() => {
  //   const socket = io('http://192.168.0.14:5050/chat', {
  //     transports: ['websocket'],
  //   });

  //   socket.on('connect', () => {
  //     console.log('Connected with ID:', socket.id);
  //     socket.emit('mobile_client_connected', { connected: true }, (response: any) => {
  //       console.log(response);
  //     });
  //     ToastAndroid.show('Connected to server', ToastAndroid.LONG);
  //   });

  //   socket.on('connect_to_client', (data) => {
  //     const greets = JSON.parse(data);
  //     console.log(greets);
  //   });

  //   socket.on('error', (error) => {
  //     ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from socket server');
  //   });

  //   if (!socket) return;
  
  //   const handleMessage = async (data: any) => {
  //     const messageBag = JSON.parse(data);
  //     console.log('what is inside messageBag? ', messageBag);
  
  //     try {
  //       await createMessage(
  //         await getDBConnection(),
  //         messageBag.receiver_id,
  //         messageBag.sender_id,
  //         messageBag.message,
  //         messageBag.created_at
  //       );
  //       // Optionally refresh your local message list here
  //     } catch (error) {
  //       console.error(error);
  //       Alert.alert("Error", "Failed to save message");
  //     }
  //   };
  
  //   socket.on('message_broadcast', handleMessage);
  
  //   // return () => {
  //   //   socket.off('message_broadcast', handleMessage);
  //   // };
  // }, []);
  
    return(
      <View>
        <FlatList 
          data={users}
          renderItem={({ item }) => 
            <ChatListItem chat={item} currentUser={user} refresh={refresh} />
          }
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
}

export default ChatsScreen;