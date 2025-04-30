import React from "react";
import {Text,View, FlatList} from "react-native";
import chats from '../data/chats.json';
import ChatListItem from "../components/ChatListItem";

const ChatsScreen = () => {
    return(
      <View>
        <FlatList 
          data={chats}
          renderItem={({ item }) => 
            <ChatListItem chat={item} />
          }
        />
      </View>
    )
}

export default ChatsScreen;