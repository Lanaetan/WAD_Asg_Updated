import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import socket from "../utils/socket";

import ChatsScreen from "../screens/ChatsScreen";
import BottomTabNavigator from "./BottomTabNavigator";

import { AuthContext } from "../contexts/AuthContext";
import { getUsersExceptCurrent } from '../db-service/userService';
import { getDBConnection } from "../db-service/database";
import { createMessage } from "../db-service/messageService";

const Drawer = createDrawerNavigator();

const MyDrawerComponent = (props) => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const handleMessage = async (data) => {
      const messageBag = JSON.parse(data);
      const isoTimestamp = new Date(messageBag.created_at).toISOString();
  
      try {
        await createMessage(
          await getDBConnection(),
          messageBag.receiver_id,
          messageBag.sender_id,
          messageBag.message,
          isoTimestamp
        );        
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to save message");
      }
    };
  
    socket.on('message_broadcast', handleMessage);

    return () => {
      socket.off('message_broadcast', handleMessage);
    };
  },[])

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "skyblue" }}
      >
        <ImageBackground
          source={{
            uri:
              user?.image || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
          }}
          style={{ 
            padding: 10,
          }}
        >
          <Image
            style={{
              alignSelf: "flex-end",
              width: 64,
              height: 64,
              marginLeft: 20,
              borderRadius: 32,
            }}
            source={{
              uri:
                user?.image || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontFamily: "Anta-Regular",
              fontSize: 20,
              alignSelf: "flex-end",
              marginLeft: 20,
              fontWeight: "bold",
            }}
          >
            {user?.username || "Username"}
          </Text>

            <Text
              style={{
                color: "#fff",
                fontFamily: "Anta-Regular",
                fontSize: 12,
                alignSelf: "flex-end",
                marginLeft: 10,
              }}
            >
              {user.name}
            </Text>

            
            
        </ImageBackground>

        <View style={{ backgroundColor: "#fff", flex: 1, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={{ padding: 15, borderTopWidth: 1, borderTopColor: "grey" }}>
        <TouchableOpacity style={{ paddingVertical: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="settings-outline" size={20} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                fontFamily: "Anta-Regular",
              }}
            >
              Settings
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingVertical: 10 }} onPress={handleLogout}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={20} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                fontFamily: "Anta-Regular",
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DrawerNavigator = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  const _query = async () => {
    try {
      setUsers(await getUsersExceptCurrent(await getDBConnection(), user?.id));
    }catch (error) {
      console.error(error);
      throw Error('Failed to get users except current logged in user !!!');
    }
  }

  useEffect(() => {
    if (user?.id) {
      _query();
    }
  }, [user]);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <MyDrawerComponent {...props} />}
      screenOptions={{
        drawerActiveTintColor: "white",
        drawerActiveBackgroundColor: "skyblue",
        drawerLabelStyle: {
          marginLeft: -24,
          fontFamily: "Anta-Regular",
        },
      }}
    >
    <Drawer.Screen
      name="MainTabs"
      component={BottomTabNavigator}
      options={({ navigation }) => ({
        title: "For you",
        drawerIcon: ({ color }) => (
          <AntDesign name="smileo" size={24} color={color} />
        ),
        headerLeft: () => (
          <Feather
            name="menu"
            size={21}
            color="black"
            style={{ marginLeft: 15 }}
            onPress={() => navigation.openDrawer()}
          />
        ),
      })}
    />

      <Drawer.Screen
        name="Chats"
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="message-circle" size={24} color={color} />
          ),
        }}
      >
        {(props) => 
          <ChatsScreen 
            {...props} 
            users={users} 
            refresh={_query}
          />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
