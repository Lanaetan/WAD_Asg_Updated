import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, TextInput, Image, Alert, SafeAreaView, TouchableOpacity, LogBox } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import LottieView from 'lottie-react-native';

import { useAuth } from "../contexts/AuthContext";
import { useSocket } from "../contexts/SocketContext";
import socket from "../utils/socket";

import MessageList from "./MessageList";

import { getDBConnection } from "../db-service/database";
import { createMessage, getMessagesBetween } from "../db-service/messageService";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const ChatScreen = ({route, navigation}: any) => {

  const { id, username, image, refresh } = route.params; // got
  const { user } = useAuth(); 

  const [ messages, setMessages ] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const textRef = useRef<string>('');
  const inputRef = useRef<any>(null);

  // get all messages between sender and receiver
  const _query = async () => {
    try {
      setMessages(await getMessagesBetween(await getDBConnection(), user?.id, id));
    }catch (error) {
      console.error(error);
      throw Error('Failed to get chat data !!!');
    }
  }

  // Header and message load
  useEffect(()=>{
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: image }} />
          <Text style={styles.name}>{username}</Text>
        </View>
      ),
    });

    // First load into the ChatScreen
    const loadMessages = async () => {
      await _query();
      setTimeout(() => setLoading(false), 1000); // Show loading for at least 3 seconds
    };

    if (id) {
      loadMessages();
    }
  }, [username]);

  useEffect(() => {
    const loadNewMessage = async (data: any) => {
      const messageBag = JSON.parse(data);
      console.log('Received from socket: ', messageBag);
      console.log('userid', user?.id);

      // Only load message if it's intended for the current user
      if (
        messageBag.receiver_id == user?.id &&
        messageBag.sender_id == id &&
        messageBag.sender_id !== user?.id // avoid own message
      ) {
        setMessages((prevMessages: any) => [
          ...prevMessages,
          {
            created_at: messageBag.created_at,
            sender_id: messageBag.sender_id,
            receiver_id: messageBag.receiver_id,
            text: messageBag.message,
          },
        ]);
        console.log('messages: ', messages);
      }
    }
    
    socket.on('message_broadcast', loadNewMessage);

    // Clean up the listener on unmount
  return () => {
    socket.off('message_broadcast', loadNewMessage);
  };
  },[user?.id]);

    const handleSendMessage = async () => {
      console.log('handleSendMessage triggered'); // <-- confirm it is called
      console.log('textRef:', textRef.current); // <-- check message content
      console.log('socket:', socket); // <-- check if socket exists

      let message = textRef.current.trim();

      if (!message || !socket) {
        console.log('unable to send message')
        return; // Prevent sending empty messages
      }

      socket.emit('message_sent', {
        sender_id: user?.id,
        receiver_id: id,
        message: message,
    })

    console.log('handle send message: ', user?.id, id, message);

    try {
      const createdAt = new Date().toISOString(); // ISO format, UTC
      await createMessage(await getDBConnection(), id, user?.id, textRef.current, createdAt);

      // await _query(); // reload all messages from db
      setMessages((prevMessages: any) => [
        ...prevMessages,
        {
          created_at: createdAt,
          sender_id: user?.id,
          receiver_id: id,
          text: textRef.current,
        },
      ]);

      textRef.current = ''; // clear input
      inputRef.current?.clear(); // clear UI
      refresh();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to send message");
    }
   }

    return(
      <View style={styles.bg}>
        <View style={styles.messagesContainer}>
          {loading ? (
            <View style={[styles.bg, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
              <LottieView
                source={require('../assets/animations/loading.json')}
                autoPlay
                loop
                style={{ width: 100, height: 100, marginBottom: 30 }}
              />
            </View>
          ) : (
            <MessageList messages={messages} currentUser={user} />
          )} 
        
        </View>

        <SafeAreaView style={styles.inputContainer}>
          {/* Icon */}
          <Feather name="plus" size={24} color='#37b0b0' />
    
          {/* Text Input */}
          <TextInput 
            ref={inputRef}
            onChangeText={value => {
              console.log('Typed message:', value); // <-- ADD THIS
              textRef.current = value;
            }}
            style={styles.input} 
            placeholder="Type your message..."></TextInput>
    
          {/* Icon */}
          <TouchableOpacity onPress={()=>{handleSendMessage()}}>
            <Feather style={styles.send} name="send" size={22} color='white' />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    )
}

const styles = StyleSheet.create({
inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    padding: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 15,
    marginLeft: 5,
    marginRight: 10,
    borderRadius: 50,
    borderColor: 'lightgray',
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: 16,
  },
  send: {
    backgroundColor: '#37b0b0',
    padding: 7,
    paddingRight: 9,
    borderRadius: 30,
    overflow: 'hidden',
  },
  bg: {
    flex: 1,
    backgroundColor: '#e3e6e5',
  },
  messagesContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 10,
  }, 
  name: {
    fontSize: 18,  
    fontWeight: 'bold',
    color: 'black', 
  }
})

export default ChatScreen;