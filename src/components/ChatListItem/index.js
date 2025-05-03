import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ChatListItem = ({ chat, index, noBorder }) => {
  const navigation = useNavigation();
  const image = chat?.profileUrl || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';
  const name = chat?.username || 'Username';


  const openChatRoom = () => {
    navigation.navigate('Chat', { 
      id: chat.uid, 
      name: chat.name, 
      image: chat.profileUrl 
    });
  }

  return (

    <Pressable onPress={() => openChatRoom()} 
      style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} 
            style={styles.name}>
              {name}</Text>
          {/* <Text style={styles.subTitle}>{dayjs(chat.lastMessage.createdAt).fromNow()}</Text> */}
        </View>

        {/* <Text numberOfLines={2} style={styles.subTitle}>{chat.lastMessage.text}</Text> */}
      </View>
    </Pressable>

    // <Pressable onPress={() => navigation.navigate('Chat', { id: chat.id, name: chat.user.name, image: chat.user.image })} style={styles.container}>
    //   <Image source={{ uri: chat.user.image }} style={styles.image} />
    //   <View style={styles.content}>
    //     <View style={styles.row}>
    //       <Text numberOfLines={1} style={styles.name}>{chat.user.name}</Text>
    //       <Text style={styles.subTitle}>{dayjs(chat.lastMessage.createdAt).fromNow()}</Text>
    //     </View>

    //     <Text numberOfLines={2} style={styles.subTitle}>{chat.lastMessage.text}</Text>
    //   </View>
    // </Pressable>
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
  }
})

export default ChatListItem;