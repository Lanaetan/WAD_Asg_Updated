import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { getDBConnection, getUserById } from '../db-service/userService';
let common = require('../CommonData');

const LoginScreen = ({ navigation }: any) => {
  const { login } = useContext(AuthContext);
  const [userID, setUserID] = useState('1'); // route.params.id
  const [user, setUser] = useState<any>(null);

  const _queryByID = async (id: any) => {
    setUser(await getUserById(await getDBConnection(), userID));
}

    useEffect(()=>{
        _queryByID(userID);
    },[]);

  const handleLogin = async () => {
    // do your database check here...

    // const userData = {
    //   id: 1,
    //   name: "John Doe",
    //   email: "john@example.com",
    //   image: "https://some.url/avatar.jpg",
    // };

    const userData = user;

    login(userData); // update context
    // navigation.replace('MainTabs'); // or whatever screen you want
  };

  return (
    <Button title="Login" onPress={handleLogin} />
  );
};

export default LoginScreen;




// import React, {useState,useEffect} from "react";
//  import {Text,View,TextInput,Pressable,Alert, Keyboard} from "react-native";
//  import ChatsScreen from './ChatsScreen';
 
//  const LoginScreen = ({navigation, route}: any) => {
 
//    const [showLoginView, setShowLoginView] = useState(true);
//    const [currentUserName, setCurrentUserName] = useState('');
//    const [currentUser, setCurrentUser] = useState('');
//    const [allUsers, setAllUsers] = useState<string[]>([]);
 
//    function handleRegisterAndSignIn(isLogin: boolean){
//      if(currentUserName.trim() !== ''){
 
//        const index = allUsers.findIndex(userItem => userItem === currentUserName);
 
//        if(isLogin){ // Login
//          if(index === -1) { // not registered
//            Alert.alert('Please register first')
//          } else { // user is registered
//            setCurrentUser(currentUserName)
//          }
//        } else {  // Register
//          if(index === -1){
//            setAllUsers([...allUsers, currentUserName])
//            setCurrentUser(currentUserName)
//          } else {
//            Alert.alert('Already registered! Please login')
//          }
//        }
//        setCurrentUserName('');
 
//      } else {
//        Alert.alert('User name field is empty');
//      }
 
//      Keyboard.dismiss();
//    }
 
//    console.log(allUsers);
 
//    useEffect(()=>{
//      if(currentUser.trim() !== ''){
//        navigation.navigate("Chats");
//      }
//    }, [currentUser]);
 
//    return(
//        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
//          {
//            showLoginView ?
//            <View>
//              <Text>Enter Your User Name</Text>
//              <TextInput 
//                autoCorrect={false} 
//                placeholder="Enter username" 
//                style={{borderWidth: 1,}}
//                onChangeText={(value)=>setCurrentUserName(value)}
//                value={currentUserName}
//              />
//              <Pressable 
//                style={{backgroundColor: 'lightblue', marginBottom: 20}}
//                onPress={()=>handleRegisterAndSignIn(false)}
//                >
//                <Text>Register</Text>
//              </Pressable >
//              <Pressable style={{backgroundColor: 'lightblue'}}
//                onPress={()=>handleRegisterAndSignIn(true)}
//              >
//                <Text>Login</Text>
//              </Pressable>
//            </View>
           
//            : <View></View>
//          }
//        </View>
//      )
//  }

//  export default LoginScreen;