import React, { useContext, useAuth, useState, useEffect } from "react";
import { Image,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
     } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView,
    DrawerItemList, } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatsScreen from '../screens/ChatsScreen';
import BottomTabNavigator from "./BottomTabNavigator";
import NotificationScreen from '../screens/NotificationScreen';
import { usersRef } from "../../firebaseConfig";
import { where, query, getDocs } from "firebase/firestore";


const Drawer = createDrawerNavigator();

const MyDrawerComponent = (props) => {

  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
// const {user, logout} = useAuth();

  // const { logout } = useContext();
  const handleLogout = async () => {
    await logout();
  }

  console.log('user', user);
  
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{backgroundColor: 'skyblue'}}
        >
          <ImageBackground
            source={{ uri: user?.profileUrl || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' }}
            style={{padding: 10}}
          >
            <Image
              style={{
                alignSelf: 'flex-end',
                width: 64,
                height: 64,
                marginLeft: 20,
                borderRadius: 32,
              }}
              source={{ uri: user?.profileUrl || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' }}
            />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Anta-Regular',
                fontSize: 20,
                alignSelf: 'flex-end',
                marginLeft: 20,
              }}
            >
              {user?.username || 'Username'}
            </Text>

            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Anta-Regular',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                  marginLeft: 10,
                }}
              >
                129 Likes
              </Text>
              <Ionicons
                name="thumbs-up"
                color={'yellow'}
                style={{marginLeft: 2, top: 2}}
              />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Anta-Regular',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                  marginLeft: 10,
                }}
              >
                88 Followers
              </Text>
              <Ionicons
                name="people"
                color={'yellow'}
                style={{marginLeft: 2, top: 2}}
              />
            </View>

          </ImageBackground>
          <View style={{backgroundColor: '#fff', flex: 1, paddingTop: 10}}>
            <DrawerItemList {...props} />
          </View>

        </DrawerContentScrollView>
        <View style={{padding: 15, borderTopWidth: 1, borderTopColor: 'grey'}}>
          <TouchableOpacity style={{paddingVertical: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="settings-outline" size={20} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 15,
                  fontFamily: 'Anta-Regular',
                }}
              >
                Settings
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{paddingVertical: 10}}
            onPress={handleLogout}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="exit-outline" size={20} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 15,
                  fontFamily: 'Anta-Regular',
                }}
              >
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    );
  }

const DrawerNavigator = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  
  const getUsers = async () => {
    
    try {
      const q = query(usersRef, where('userId', '!=', user?.uid)); // fetch all users except the current user

      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({...doc.data()});
    });

    
    setUsers(data);
    console.log('users: ', users);
    } catch (error) {
      console.error('Error getting users:', error);
    }
  }

  console.log('get users called');
  console.log('get users: ', users);

  useEffect(() => {
    if(user?.uid){
      getUsers();
    }
  },[user]) // ensure getUsers() runs only after the user is available

  return (
    <Drawer.Navigator
            drawerContent={props => <MyDrawerComponent {...props} />}
            screenOptions={{
              drawerActiveTintColor: 'darkslateblue',
              drawerActiveBackgroundColor: 'skyblue',
              drawerLabelStyle: {
                marginLeft: -24,
                fontFamily: 'Anta-Regular',
              },
            }}
          >
         <Drawer.Screen 
    name="MainTabs" 
    component={BottomTabNavigator}
    options={({ navigation, route }) => {



      // 🛎️ detect which tab is active
      const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'; // Default is Home

      let title;
      if (routeName === 'Home') {
        title = 'For you';
      } else if (routeName === 'CreatePosts') {
        title = 'New Post';
      } else if (routeName === 'Profile') {
        title = 'My Profile';
      } else {
        title = 'App'; // fallback
      }

      return {
        drawerIcon: ({color}) => (
            <Ionicons name="notifications-outline"
            size={24} color={color} />
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
  
        <Drawer.Screen name="Notification" component={NotificationScreen}
            options={{
                drawerIcon: ({color}) => (
                  <Ionicons name="notifications-outline"
                  size={24} color={color} />
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
}

export default DrawerNavigator;