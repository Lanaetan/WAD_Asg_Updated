import React from "react";
import {View, FlatList} from "react-native";
import ChatListItem from "../components/ChatListItem";


const ChatsScreen = ({users}: any) => { // this users is passed from firebase, to be deleted later
  
    return(
      <View>
        <FlatList 
          data={users}
          renderItem={({ item, index }) => 
            <ChatListItem noBorder={index+1 == users.length} chat={item} index={index}/>
          }
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      // <View>
      //   {/* <StatusBar style="light" /> */}
      //   <FlatList 
      //     data={users}
      //     renderItem={({ item, index }) => 
      //       <ChatListItem noBorder={index+1 == users.length} chat={item} index={index}/>
      //     }
      //     // keyExtractor={(item) => item.uid.toString()}
      //     showsVerticalScrollIndicator={false}
      //   />
      // </View>
    )
}

export default ChatsScreen;