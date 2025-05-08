import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import Message from "../components/Message";

dayjs.extend(relativeTime);

// Define the type for a message
type MessageType = {
  id: number;
  sender_id: number;
  receiver_id: number;
  text: string;
  created_at: string;
};

// Define the type for the props of MessageList
type MessageListProps = {
  messages: MessageType[];   
  currentUser: any;         
};

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {

  const flatListRef = useRef<any>(null);

  useEffect(()=>{
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  },[messages])

  return (
    <View>
      <FlatList
      ref={flatListRef}
        data={messages}
        keyExtractor={(item: any) => `${item.sender_id}-${item.receiver_id}-${item.created_at}`}
        renderItem={({ item }: any) => {
          return (
            <Message 
              receiverId={item.receiver_id} 
              senderId={item.sender_id} 
              text={item.text} 
              createdAt={item.created_at} 
              currentUser={currentUser}
            />
          );
        }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
    </View>
  );
}
      
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    maxWidth: '80%',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    color: 'black',
  },
  time: {
    color: 'gray',
    alignSelf: 'flex-end',
    fontSize: 10,
    marginTop: 5,
  }
})

export default MessageList;