import { View, Text, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import SignIn from './SignIn';
import Loading from '../components/Loading';
import { useAuth } from '../contexts/AuthContext';

const SignUp = ({route, navigation}: any) => {

  const [isLoading, setIsLoading] = useState(false);
  const {register} = useAuth();

  const nameRef = useRef("");
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const emailRef = useRef("");
  const imageRef = useRef("");
  const bioRef = useRef("");
  
  const handleRegister = async () => {
    if(!nameRef.current || !usernameRef.current || !passwordRef.current || !emailRef.current || !imageRef.current) {
      Alert.alert("Sign Up", "Please fill in all fields");
      return;
    }
    setIsLoading(true);

    let response = await register(nameRef.current, usernameRef.current, passwordRef.current, emailRef.current, imageRef.current, bioRef.current);
    setIsLoading(false);
    
    console.log(response);
    if(!response.success) {
      Alert.alert("Sign Up", response.message);
    }
  }

  return (

    
    <View>
      <Text>Sign Up</Text>

      <View>
        <TextInput 
          placeholder="Name" 
          onChangeText={(value) => nameRef.current = value}
          placeholderTextColor={'gray'}
        />
        {/* <Feather name="user" size={24} color="black" /> */}
        <TextInput 
          placeholder="Username" 
          onChangeText={(value) => usernameRef.current = value}
          placeholderTextColor={'gray'}
        />
        <TextInput 
          placeholder="Password" 
          onChangeText={(value) => passwordRef.current = value}
          placeholderTextColor={'gray'}
          secureTextEntry={true}
        />
        <TextInput 
          placeholder="Email" 
          onChangeText={(value) => emailRef.current = value}
          placeholderTextColor={'gray'}
        />
        <TextInput 
          placeholder="Image" 
          onChangeText={(value) => imageRef.current = value}
          placeholderTextColor={'gray'}
        />
        <TextInput 
          placeholder="Bio" 
          onChangeText={(value) => bioRef.current = value}
          placeholderTextColor={'gray'}
        />
      </View>
      
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