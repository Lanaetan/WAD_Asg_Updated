import React from "react";
import { StyleSheet, Text, View } from "react-native";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { ScrollView } from "react-native-gesture-handler";
import Message from "../components/Message";
dayjs.extend(relativeTime);

const MessageList = ({ messages = {}, currentUser }: any) => {

    const messageArray = Object.values(messages);
    console.log("Messages: ", messages);
    return (
        
        <ScrollView>
          {messageArray.map((message: any, index: any) => (
            <Message message={message} key={index} currentUser={currentUser} />
          ))}
          
        </ScrollView>
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