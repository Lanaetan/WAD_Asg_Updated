import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { getDBConnection, getLastMessage } from '../../db-service/messageService';

dayjs.extend(relativeTime);

const ChatListItem = ({ chat, currentUser, refresh }) => {
  const navigation = useNavigation();
  const id = chat?.id
  const image = chat?.image || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';
  const username = chat?.username || 'Username';
  const [ lastMessage, setLastMessage ] = useState({})

  const _queryLastMessage = async () => {
    try {
      setLastMessage(await getLastMessage(await getDBConnection(), currentUser?.id, id))
    }catch (error) {
      console.error(error);
        throw Error('Failed to get last message!!!');
    }
  }

  const openChatRoom = () => {
    console.log('ChatListItem', chat);
    navigation.navigate('Chat', { 
      id: id, 
      username: username, 
      image: image,
      refresh: refresh,
    });
  }

  useEffect(()=>{
    _queryLastMessage();
  })

  return (
    <Pressable onPress={openChatRoom} 
      style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} 
            style={styles.name}>
              {username}</Text>
          <Text style={styles.createdAt}>{lastMessage == null ? '' : dayjs(lastMessage.created_at).fromNow()}</Text>
        </View>
        <Text numberOfLines={2} style={styles.subTitle}>{lastMessage == null ? '' : lastMessage.text}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    height: 60,
    alignItems: 'center',
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBlockColor: 'lightgray',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  name: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 17,
  },
  subTitle: {
    color: 'gray',
    fontSize: 14,
  },
  createdAt: {
    fontSize: 11,
    marginRight: 5,
  }
})

export default ChatListItem;