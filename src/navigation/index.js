import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';

// Ignore specific warning logs
LogBox.ignoreLogs(['EventEmitter.removeListener']);

// Screens
import ChatScreen from '../screens/ChatScreen';
import ContactsScreen from '../screens/ContactsScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const Navigator = () => {
  const { isAuthenticated } = useAuth();

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
