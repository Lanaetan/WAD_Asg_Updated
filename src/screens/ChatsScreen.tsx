import React, { useEffect } from "react";
import {View, FlatList, Alert, ToastAndroid} from "react-native";
import ChatListItem from "../components/ChatListItem";
import { useAuth } from "../contexts/AuthContext";
import { useSocket } from '../contexts/SocketContext';
import { createMessage } from "../db-service/messageService";
import { getDBConnection } from "../db-service/database";
import { io } from "socket.io-client";


const ChatsScreen = ({users, refresh}: any) => {
  const { user } = useAuth();
  const { socket } = useSocket();
  
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