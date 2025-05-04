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
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

import ChatsScreen from "../screens/ChatsScreen";
import NotificationScreen from "../screens/NotificationScreen";
import BottomTabNavigator from "./BottomTabNavigator";

import { AuthContext } from "../contexts/AuthContext";
import { usersRef } from "../../firebaseConfig";
import { where, query, getDocs } from "firebase/firestore";
import { getDBConnection, getUserById, getUsers, getUsersExceptCurrent } from '../db-service/userService';

const Drawer = createDrawerNavigator();

const MyDrawerComponent = (props) => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "skyblue" }}
      >
        <ImageBackground
          source={{
            uri:
              user?.image ||
              "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
          }}
          style={{ padding: 10 }}
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
                user?.image ||
                "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontFamily: "Anta-Regular",
              fontSize: 20,
              alignSelf: "flex-end",
              marginLeft: 20,
            }}
          >
            {user?.username || "Username"}
          </Text>

          <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
            <Text
              style={{
                color: "#fff",
                fontFamily: "Anta-Regular",
                fontSize: 12,
                marginLeft: 10,
              }}
            >
              129 Likes
            </Text>
            <Ionicons
              name="thumbs-up"
              color="yellow"
              style={{ marginLeft: 2, top: 2 }}
            />
            <Text
              style={{
                color: "#fff",
                fontFamily: "Anta-Regular",
                fontSize: 12,
                marginLeft: 10,
              }}
            >
              88 Followers
            </Text>
            <Ionicons
              name="people"
              color="yellow"
              style={{ marginLeft: 2, top: 2 }}
            />
          </View>
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

  // Fetch other users except current user - FIREBASE ===========
  // const getUsers = async () => {
  //   try {
  //     const q = query(usersRef, where("userId", "!=", user?.uid));
  //     const querySnapshot = await getDocs(q);

  //     const data = querySnapshot.docs.map((doc) => doc.data());
  //     setUsers(data);
  //   } catch (error) {
  //     console.error("Error getting users:", error);
  //   }
  // };

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
        drawerActiveTintColor: "darkslateblue",
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
        options={({ navigation, route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

          let title;
          switch (routeName) {
            case "Home":
              title = "For you";
              break;
            case "CreatePosts":
              title = "New Post";
              break;
            case "Profile":
              title = "My Profile";
              break;
            default:
              title = "App";
          }

          return {
            title,
            drawerIcon: ({ color }) => (
              <Ionicons name="notifications-outline" size={24} color={color} />
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
          };
        }}
      />

      <Drawer.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={24} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Chats"
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="message-circle" size={24} color={color} />
          ),
        }}
      >
        {(props) => <ChatsScreen {...props} users={users} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
