import React from 'react';
import { View, LogBox } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from '../contexts/AuthContext';

// Ignore specific warning logs
LogBox.ignoreLogs(['EventEmitter.removeListener']);

// Import Screens
import ChatScreen from '../screens/ChatScreen';
import ContactsScreen from '../screens/ContactsScreen';
import DrawerNavigator from './DrawerNavigator';


const Stack = createStackNavigator();

const Navigator = () => {
    return (
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: 'whitesmoke'},
            }}>
            <Stack.Screen name='Drawer' component={DrawerNavigator} options={{ headerShown: false}}/>
            <Stack.Screen name='Chat' component={ChatScreen}/>
            <Stack.Screen name='Contacts' component={ContactsScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    );
}

export default Navigator;