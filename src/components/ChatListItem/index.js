import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getLastMessage } from '../../db-service/messageService';
import { getUserById } from "../../db-service/userService";
import { getDBConnection } from "../../db-service/database";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import styles from "./styles";

dayjs.extend(relativeTime);

const ChatListItem = ({ chat, currentUser, refresh }) => {
  const navigation = useNavigation();
  const id = chat?.id
  const image = chat?.image || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';
  const username = chat?.username || 'Username';
  const [ lastMessage, setLastMessage ] = useState(null)
  const [ userOfLastMessage, setUserOfLastMessage ] = useState(null)

  const _queryLastMessage = async () => {
    try {
      setLastMessage(await getLastMessage(await getDBConnection(), currentUser?.id, id))
    }catch (error) {
      console.error(error);
      throw Error('Failed to get last message!!!');
    }
  }

  const _queryUserOfLastMessage = async () => {
    try {
      setUserOfLastMessage(await getUserById(await getDBConnection(), lastMessage?.sender_id))
    }catch (error) {
      console.error(error);
      throw Error('Failed to get user of last message!!!');
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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = await getDBConnection();
        const message = await getLastMessage(db, currentUser?.id, id);
        setLastMessage(message);
  
        // Only fetch user if the sender is not the current user
        if (message?.sender_id && message.sender_id !== currentUser?.id) {
          const user = await getUserById(db, message.sender_id);
          setUserOfLastMessage(user);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [chat, currentUser, refresh]);

  return (
    <Pressable onPress={openChatRoom} 
      style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} 
            style={styles.name}>
              {username}</Text>
          <Text style={styles.createdAt}>{lastMessage == null ? '' : dayjs(lastMessage.created_at).format('HH:mm')}</Text>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.subTitle} ellipsizeMode="tail">
          {lastMessage
            ? `${lastMessage.sender_id === currentUser?.id 
                ? 'You' 
                : userOfLastMessage?.username || 'User'}: ${lastMessage.text}`
            : ''}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ChatListItem;