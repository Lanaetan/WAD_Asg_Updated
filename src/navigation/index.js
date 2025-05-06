import React, { useEffect } from 'react';
import { LogBox, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import socket from '../utils/socket';

// Screens
import ChatScreen from '../screens/ChatScreen';
import ContactsScreen from '../screens/ContactsScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import DrawerNavigator from './DrawerNavigator';

// Ignore specific warning logs
LogBox.ignoreLogs(['EventEmitter.removeListener']);

const Stack = createStackNavigator();

const Navigator = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
      socket.on('connect', () => {
        console.log('Connected with ID:', socket.id);
        socket.emit('mobile_client_connected', { connected: true }, (response) => {
          console.log(response);
        });
        ToastAndroid.show('Connected to server', ToastAndroid.LONG);
      });
  
      socket.on('connect_to_client', (data) => {
        const greets = JSON.parse(data);
        console.log(greets);
      });
  
      socket.on('error', (error) => {
        ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
      });
  
      socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });
  
      // const handleMessage = async (data) => {
      //   const messageBag = JSON.parse(data);
      //   console.log('what is inside messageBag? ', messageBag);
    
      //   try {
      //     await createMessage(
      //       await getDBConnection(),
      //       messageBag.receiver_id,
      //       messageBag.sender_id,
      //       messageBag.message,
      //       messageBag.created_at
      //     );
      //     // Optionally refresh your local message list here
      //   } catch (error) {
      //     console.error(error);
      //     Alert.alert("Error", "Failed to save message");
      //   }
      // };
    
      // socket.on('message_broadcast', handleMessage);
    
      return () => {
        socket.disconnect();
      };
    }, []);

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
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Contacts" component={ContactsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
