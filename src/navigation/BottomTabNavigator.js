import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ChatsScreen from '../screens/ChatsScreen';
import LoginScreen from '../screens/TestLoginScreen';
import TestDbScreen from '../screens/TestDbScreen';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        // headerStyle: 'whitesmoke',
        tabBarActiveTintColor: 'black',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'whitesmoke', 
          height: 60,              
          borderTopWidth: 1,        
          borderTopColor: '#ccc',   
        },
        headerShown: false, // 👈 hide tab headers, drawer will handle headers
      }}
    >
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostScreen}
        options={{
          headerTitle: 'Create post',
          headerTitleStyle: {
            // fontFamily: "PTSans-Bold",
          },
          tabBarIcon: ({ color }) => {
            return <Feather name="plus-square" size={24} color={ color } />;
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: 'For you',
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 25, marginRight: 15 }}>
              <Ionicons
                onPress={() => navigation.navigate("Notifications")}
                name="notifications-outline"
                size={24}
                color="black"
              />
            </View>
          ),
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
          headerTitleStyle: {
            // fontFamily: "PTSans-Bold",
          },
          tabBarIcon: ({ color }) => {
            return <Feather name="user" size={24} color={ color } />;
          },
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: 'Login',
          headerTitleStyle: {
            // fontFamily: "PTSans-Bold",
          },
          tabBarIcon: ({ color }) => {
            return <Feather name="user" size={24} color={ color } />;
          },
        }}
      />
       <Tab.Screen
        name="TestDb"
        component={TestDbScreen}
         options={{
          headerTitle: 'Login',
          headerTitleStyle: {
            // fontFamily: "PTSans-Bold",
          },
          tabBarIcon: ({ color }) => {
            return <Feather name="user" size={24} color={ color } />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;