import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../contexts/AuthContext";
dayjs.extend(relativeTime);

const Message = ({ receiverId, senderId, text, createdAt, currentUser }) => {

  useEffect(() => {
    // console.log("Message Props -> senderId:", senderId);
    // console.log("Message Props -> receiverId:", receiverId);
    // console.log("Current User ID:", currentUser?.id);
  }, []);

  if (!currentUser || senderId === undefined) return null;

  const isMyMessage = () => {
    return currentUser.id === senderId;
  };
  
  return (
    <View style={[
      styles.container,
      {
        backgroundColor: isMyMessage() ? '#badedb' : 'white',
        alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
        marginRight: isMyMessage() ? 12 : 0,
        marginLeft: isMyMessage() ? 0 : 12,
      }
    ]}>
      <Text style={styles.text}>{text}</Text>
      <Text style={[styles.time, {
      }]}>{dayjs(createdAt).fromNow(true)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    maxWidth: '80%',
    minWidth: '25%',
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
    // marginTop: 5,
  }
})

export default Message;