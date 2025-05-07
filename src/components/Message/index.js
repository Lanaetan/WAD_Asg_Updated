import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Message = ({ receiverId, senderId, text, createdAt, currentUser }) => {
  // Get the current date and compare with createdAt to determine how to format the date
  const currentDate = dayjs();
  const messageDate = dayjs(createdAt);

  // Check if the message is today, yesterday, or older
  let formattedTime;
  if (messageDate.isSame(currentDate, 'day')) {
    // If it's today, show the time in HH:mm format
    formattedTime = messageDate.format('HH:mm');
  } else if (messageDate.isSame(currentDate.subtract(1, 'day'), 'day')) {
    // If it's yesterday, show "Yesterday"
    formattedTime = 'Yesterday';
  } else {
    // If it's older than yesterday, show the full date
    formattedTime = messageDate.format('MM/DD/YYYY');
  }

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
    
      <View>
        <Text style={styles.text}>{text}</Text> 
      </View>
      <View style={styles.timeRow}>
        <Text style={styles.time}>{formattedTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
    minWidth: '40%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'column',
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    marginTop: 3,
  },
  time: {
    color: 'gray',
    fontSize: 12,
  },
});

export default Message;