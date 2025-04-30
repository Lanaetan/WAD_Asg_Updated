import React, { useEffect, useState } from "react";
import { Text, View, ImageBackground, StyleSheet, FlatList, TextInput, Image, ToastAndroid } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import io from 'socket.io-client';
// import io from 'socket.io-client/dist/socket.io';


import Message from "../components/Message";
import InputBox from "../components/InputBox";

// import bg from '../assets/images/luguang.jpg';
import messages from '../data/messages.json'


const ChatScreen = ({route, navigation}: any) => {

  // const route = useRoute();
  // const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({ 
  //     title: route.params.name 
  //   });
  // }, [route.params?.name]);

  // if using emulator, paste this: http://10.0.2.2:5000/chat
  var socket = io('http://192.168.0.14:5000/chat', {
    transports: ['websocket'],
  });

  const [name, setName] = useState<any>('Your Name');
  const [message, setMessage] = useState('');
  const [chatroom, setChatroom] = useState<any[]>([]);

  useEffect(()=>{
    // When connected, emit a message to the server to inform that this client has connected to the server.
    // Display a Toast to inform user that connection was made.
    socket.on('connect', () => {

      console.log(socket.id); // undefined
      socket.emit('mobile_client_connected', {connected: true}, (response: any)=>{
        console.log(response)
      });
      ToastAndroid.show('Connected to server', ToastAndroid.LONG);
    });

    socket.on('connect_to_client', (data: any) => {
      let greets=JSON.parse(data)
      console.log(greets)
    });

    // Handle connection error
    socket.on('error', (error: any) => {
        ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
    });

    // Receive chat broadcast from server.
    socket.on('message_broadcast', (data:any) => {
      console.log(data);
      let messageBag = JSON.parse(data);

      setChatroom(chatroom => [...chatroom, messageBag]);
    });
  },[]);

  useEffect(() => {
      navigation.setOptions({ 
        headerTitle: () => (
          <View style={styles.container}>
            <Image style={styles.image} source={{ uri: route.params.image }}/>
            <Text style={styles.name}>{ route.params.name }</Text>
          </View>
        )
      });
    }, [route.params?.name]);
 

    return(
      <View style={styles.bg}>
        <FlatList
          // data={messages}
          data={chatroom}
          renderItem={({item}) => <Message message={item} user={name}/>}
        />
        <InputBox
/>
      </View>
    )
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#e3e6e5',
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