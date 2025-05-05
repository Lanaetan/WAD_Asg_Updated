import React, { useEffect, useRef, useState } from "react";
import { Text, View, ImageBackground, StyleSheet, FlatList, TextInput, Image, ToastAndroid, Alert, SafeAreaView, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import io from 'socket.io-client';
import Feather from "react-native-vector-icons/Feather";
import Message from "../components/Message";
import InputBox from "../components/InputBox";

import messages from '../data/messages.json'
import { useAuth } from "../contexts/AuthContext";
import { getRoomId } from "../utils/Common";
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import MessageList from "./MessageList";
import { getDBConnection } from "../db-service/userService";
import { createMessage, getMessagesBetween } from "../db-service/messageService";
import LottieView from 'lottie-react-native';


const ChatScreen = ({route, navigation}: any) => {

  const { id, username, image, refresh } = route.params; // got
  const { user } = useAuth(); // got
  const [ messages, setMessages ] = useState<any>([])
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   navigation.setOptions({ 
  //     title: username
  //   });
  //   console.log('id, username, image in chat screen : ', id, username, image);
  // }, [username]);

  // FIREBASE ==========
  // const { id, username, image } = route.params;
  // const { user } = useAuth();
  // const [messages, setMessages] = useState<any[]>([]);
  const textRef = useRef<string>('');
  const inputRef = useRef<any>(null);

  // useEffect(() => {
  //   createRoomIfNotExists();

  //   let roomId = getRoomId(user?.userId, id);
  //   const docRef = doc(db, 'rooms', roomId);
  //   const messagesRef = collection(docRef, 'messages');
  //   const q = query(messagesRef, orderBy('createdAt', 'asc'));

  //   let unsub = onSnapshot(q, (querySnapshot) => {
  //     let allMessages = querySnapshot.docs.map(doc => {
  //       return doc.data();
  //     });
  //     setMessages({ ...allMessages });
  //   }
  // )
  // },[user])

  // const createRoomIfNotExists = async () => {
  //   let roomId = getRoomId(user?.userId, id);
  //   console.log("user uid: ", user?.userId);
  //   console.log("Room ID: ", roomId);
  //   console.log("Chat ID: ", id);
  //   await setDoc(doc(db, 'rooms', roomId), {
  //     roomId,
  //     createdAt: Timestamp.fromDate(new Date()),
  //   });
  // }

  // if using emulator, paste this: http://10.0.2.2:5000/chat
  var socket = io('http://192.168.0.14:5000/chat', {
    transports: ['websocket'],
  });

  // useEffect(()=>{

  //   socket.on('connect', () => {

  //     console.log(socket.id); // undefined
  //     socket.emit('mobile_client_connected', {connected: true}, (response: any)=>{
  //       console.log(response)
  //     });
  //     ToastAndroid.show('Connected to server', ToastAndroid.LONG);
  //   });

  //   socket.on('connect_to_client', (data: any) => {
  //     let greets=JSON.parse(data)
  //     console.log(greets)
  //   });

  //   // Handle connection error
  //   socket.on('error', (error: any) => {
  //       ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
  //   });

  //   // Receive chat broadcast from server.
  //   socket.on('message_broadcast', (data:any) => {
  //     console.log(data);
  //     let messageBag = JSON.parse(data);

  //     setChatroom(chatroom => [...chatroom, messageBag]);
  //   });
  // },[]);

  const _query = async () => {
    try {
        setMessages(await getMessagesBetween(await getDBConnection(), user?.id, id));
      }catch (error) {
        console.error(error);
          throw Error('Failed to get chat data !!!');
      }
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: image }} />
          <Text style={styles.name}>{username}</Text>
        </View>
      ),
    });

    const loadMessages = async () => {
      await _query();
      setTimeout(() => setLoading(false), 1000); // Show loading for at least 3 seconds
    };
  
    if (id) {
      loadMessages();
    }
  }, [username]);

    // const handleSendMessage = async () => {
    //   let message = textRef.current.trim();
    //   if (!message) return; // Prevent sending empty messages
    //   try{
    //     let roomId = getRoomId(user?.userId, id);
    //     const docRef = doc(db, 'rooms', roomId);
    //     const messagesRef = collection(docRef, 'messages');
    //     textRef.current = ''; // Clear the input field after sending the message
    //     if (inputRef.current) {
    //       inputRef?.current?.clear(); // Clear the input field after sending the message
    //     }

    //     const newDoc = await addDoc(messagesRef, {
    //       userId: user?.userId,
    //       text: message,
    //       profileUrl: user?.profileUrl,
    //       senderName: user?.username,
    //       createdAt: Timestamp.fromDate(new Date()),
    //     });
    //   }catch(error: any){
    //     Alert.alert("Message", error.message)
    //   }
    // }

    // const _createMessage = async () => {
    //   try {
    //     const db = await getDBConnection();
    //     const query = `SELECT * FROM messages WHERE receiver_id = ? AND sender_id = ? OR receiver_id = ? AND sender_id = ? ORDER BY created_at ASC`;
    //     const query1 = 'INSERT INTO messages(receiver_id,sender_id,text,created_at) VALUES(?,?,?,?,?,?)';
    //     const parameters = [id, user?.id,textRef.current, now];
    //   }catch (error) {
    //     console.error(error);
    //       throw Error('Failed to create new message !!!');
    //   }
    // }

    // const _createMessage = async () => {
    //     try {
    //       const result = await createMessage(await getDBConnection(), id, user?.id, textRef.current);
    //       setMessage(result)
    //     }catch (error) {
    //       console.error(error);
    //       throw Error('Failed to create message !!!');
    //     }
    //   }

    const handleSendMessage = async () => {
      let message = textRef.current.trim();
      if (!message) return; // Prevent sending empty messages

      try {
        await createMessage(await getDBConnection(), id, user?.id, textRef.current);
        await _query(); // reload all messages from db
        textRef.current = ''; // clear input
        inputRef.current?.clear(); // clear UI
        refresh();
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to send message");
      }
    }

    if (loading) {
      return (
        <View style={[styles.bg, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
          <LottieView
            source={require('../assets/animations/loading.json')}
            autoPlay
            loop
            style={{ width: 100, height: 100, marginBottom: 70 }}
          />
        </View>
      );
    }

    return(
      <View style={styles.bg}>
         <View style={styles.messagesContainer}>
          <MessageList messages={messages} currentUser={user} />     
         </View>

        <SafeAreaView style={styles.inputContainer}>
          {/* Icon */}
          <Feather name="plus" size={24} color='#37b0b0' />
    
          {/* Text Input */}
          <TextInput 
            ref={inputRef}
            onChangeText={value=>textRef.current = value}
            style={styles.input} 
            placeholder="Type your message..."></TextInput>
    
          {/* Icon */}
          <TouchableOpacity onPress={handleSendMessage}>
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