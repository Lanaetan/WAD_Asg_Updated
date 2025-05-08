import React from "react";
import { View, FlatList } from "react-native";
import ChatListItem from "../components/ChatListItem";
import { useAuth } from "../contexts/AuthContext";

const ChatsScreen = ({users, refresh}: any) => {
  const { user } = useAuth();
  
  return(
    <View>
      <FlatList 
        data={users}
        renderItem={({ item }) => 
          <ChatListItem chat={item} currentUser={user} refresh={refresh} />
        }
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default ChatsScreen;