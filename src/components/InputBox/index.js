import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import io from 'socket.io-client';

var socket = io('http://192.168.0.14:5000/chat', {
    transports: ['websocket'],
});


const InputBox = ({ onChangeText, value, onSendMessage }) => {
  // const [newMessage, setNewMessage] = useState('');

  const onSend = () => {
  //   console.warn("Sending a new message: ", newMessage);
  //   socket.emit('message_sent', {
  //     sender: 'u2', // for example, this should change with user login
  //     message: newMessage,
  // })

  //   setNewMessage('');

  if (!value.trim()) return; // don't send empty messages

  console.warn("Sending a new message: ", value);

  socket.emit('message_sent', {
    sender: 'u2', // example user
    message: value,
  });

  onSendMessage?.(); // Call parent handler (e.g., to store in Firestore)
    onChangeText('');  // Clear input

  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Icon */}
      <Feather name="plus" size={24} color='#37b0b0' />

      {/* Text Input */}
      <TextInput 
        value={value}
        onChangeText={onChangeText}
        style={styles.input} 
        placeholder="Type your message..."></TextInput>

      {/* Icon */}
      <TouchableOpacity onPress={onSend}>
        <Feather style={styles.send} name="send" size={22} color='white' />
      </TouchableOpacity>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default InputBox;