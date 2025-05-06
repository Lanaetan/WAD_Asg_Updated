import React, { useContext } from "react";
import {
  Image,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { AuthContext } from "../contexts/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatsScreen from "../screens/ChatsScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import NotificationScreen from "../screens/NotificationScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FollowersScreen from "../screens/FollowersScreen";

const Drawer = createDrawerNavigator();

const MyDrawerComponent = (props) => {
  const { user } = useContext(AuthContext);

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
            User
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
              color={"yellow"}
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
              color={"yellow"}
              style={{ marginLeft: 2, top: 2 }}
            />
          </View>
        </ImageBackground>

        <View style={{ backgroundColor: "#fff", flex: 1, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={{ padding: 15, borderTopWidth: 1, borderTopColor: "grey" }}>
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={() => props.navigation.navigate("Settings")}
        >
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

        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={() => {
            console.log("Signing out...");
            // Replace with signOut() from AuthContext later
          }}
        >
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
          if (routeName === "Home") {
            title = "For you";
          } else if (routeName === "CreatePosts") {
            title = "New Post";
          } else if (routeName === "Profile") {
            title = "My Profile";
          } else {
            title = "App";
          }

          return {
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
            title,
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
        component={ChatsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="message-circle" size={24} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />

<Drawer.Screen
  name="Followers"
  component={FollowersScreen}
  options={{
    drawerIcon: ({ color }) => (
      <Ionicons name="people-outline" size={24} color={color} />
    ),
  }}
/>

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
