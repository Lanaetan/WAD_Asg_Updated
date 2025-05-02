import { View, Text, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native';
// import { Feather } from '@react-native/vector-icons';
import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import SignIn from './SignIn';
import Loading from '../components/Loading';
import { useAuth } from '../contexts/AuthContext';

const SignUp = ({route, navigation}: any) => {

  const [isLoading, setIsLoading] = useState(false);
  const {register} = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  const handleRegister = async () => {
    if(!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
      Alert.alert("Sign Up", "Please fill in all fields");
      return;
    }
    setIsLoading(true);

    let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current);
    setIsLoading(false);
    
    console.log(response);
    if(!response.success) {
      Alert.alert("Sign Up", response.message);
    }
  }

  return (

    
    <View>
      <Text>Sign Up</Text>
      <TextInput 
        placeholder="Email" 
        onChangeText={(value) => emailRef.current = value}
      />
      <TextInput 
        placeholder="Password" 
        onChangeText={(value) => passwordRef.current = value}
        placeholderTextColor={'gray'}
        secureTextEntry={true}
      />

{/* <Feather name="user" size={24} color="black" /> */}
<TextInput 
        placeholder="Username" 
        onChangeText={(value) => usernameRef.current = value}
        placeholderTextColor={'gray'}
      />

<TextInput 
        placeholder="Profile" 
        onChangeText={(value) => profileRef.current = value}
        placeholderTextColor={'gray'}
      />

      {/* submit button */}
    <View>
      {
        isLoading? (
          <View>
            {/* <Loading /> */}
            <Text>Loading...</Text>

          </View>
        ) : (
          
          <TouchableOpacity onPress={handleRegister}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
        )
      }
    </View>

      

      {/* sign up test */}
      <Text>Already have an account?</Text>
      <Pressable onPress={() => navigation.navigate('SignIn')}>
        <Text>Sign In</Text>
      </Pressable>
     
      
    </View>
  );
}

export default SignUp;