import React from "react";
import {Text,View, FlatList, StatusBar} from "react-native";
import chats from '../data/chats.json';
import ChatListItem from "../components/ChatListItem";


const ChatsScreen = ({users}: any) => {

  console.log("Users: ", users);
  
    return(
      <View>
        {/* <StatusBar style="light" /> */}
        <FlatList 
          data={users}
          renderItem={({ item, index }) => 
            <ChatListItem noBorder={index+1 == users.length} chat={item} index={index}/>
          }
          // keyExtractor={(item) => item.uid.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
}

export default ChatsScreen;