import React, { useEffect, useState } from "react";
import {Text,View, FlatList, StatusBar} from "react-native";
import chats from '../data/chats.json';
import ChatListItem from "../components/ChatListItem";
import { getDBConnection, getUsers } from "../db-service/userService";


const ChatsScreen = ({users}: any) => { // this users is passed from firebase, to be deleted later

  // get users from sqlite and store in state
  const [users1, setUsers1] = useState<any>([]);

  const _query = async () => {
    try{
      setUsers1(await getUsers(await getDBConnection()));
    }catch (error) {
      console.error(error);
      throw Error('Failed to get students !!!');
    }
  }

  useEffect(()=>{
    _query();
  },[]);
  
    return(
      <View>
        <FlatList 
          data={users1}
          renderItem={({ item, index }) => 
            <ChatListItem noBorder={index+1 == users.length} chat={item} index={index}/>
          }
          // keyExtractor={(item) => item.uid.toString()}
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