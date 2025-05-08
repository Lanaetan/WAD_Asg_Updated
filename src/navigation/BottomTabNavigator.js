import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'whitesmoke',
          height: 60,
          borderTopWidth: 1,
          borderTopColor: '#ccc',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: 'Search',
          tabBarIcon: ({ color }) => {
            return <Feather name="search" size={24} color={ color } />;
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
        name="CreatePosts"
        component={CreatePostScreen}
        options={{
          headerTitle: 'Create post',
          tabBarIcon: ({ color }) => {
            return <Feather name="plus-square" size={24} color={ color } />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
          tabBarIcon: ({ color }) => {
            return <Feather name="user" size={24} color={ color } />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;