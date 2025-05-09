import React, { useEffect } from 'react';
import { LogBox, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';

// Screens
import ChatScreen from '../screens/ChatScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import FollowersScreen from '../screens/FollowersScreen';
import DrawerNavigator from './DrawerNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import EditProfileScreen from '../screens/EditProfile';
import WelcomeScreen from '../screens/WelcomeScreen';

// Ignore specific warning logs
LogBox.ignoreLogs(['EventEmitter.removeListener']);

const Stack = createStackNavigator();

const Navigator = () => {
  const { isAuthenticated } = useAuth();

  // useEffect(() => {
  //     socket.on('connect', () => {
  //       console.log('Connected with ID:', socket.id);
  //       socket.emit('mobile_client_connected', { connected: true }, (response) => {
  //         console.log(response);
  //       });
  //       ToastAndroid.show('Connected to server', ToastAndroid.LONG);
  //     });
  
  //     socket.on('connect_to_client', (data) => {
  //       const greets = JSON.parse(data);
  //       console.log(greets);
  //     });
  
  //     socket.on('error', (error) => {
  //       ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
  //     });
  
  //     socket.on('disconnect', () => {
  //       console.log('Disconnected from socket server');
  //     });
      
  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: 'whitesmoke' },
          }}
        >
          {isAuthenticated ? (
            <>
              <Stack.Screen
                name="Drawer"
                component={DrawerNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
              <Stack.Screen name="UserProfile" component={UserProfileScreen} />
              <Stack.Screen name="Followers" component={FollowersScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} />
              <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Sign In" component={SignInScreen} />
              <Stack.Screen name="Sign Up" component={SignUpScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );    
};

export default Navigator;

