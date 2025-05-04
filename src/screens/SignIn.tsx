import { View, Text, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import SignUp from './SignUp';
import Loading from '../components/Loading';
import { useAuth } from '../contexts/AuthContext';

const SignIn = ({route, navigation}: any) => {

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useAuth();

  const handleLogin = async () => {
    if(!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill in all fields");
      return;
    }

    // setIsLoading(true);
    // const response = await login(emailRef.current, passwordRef.current);
    // setIsLoading(false);
    // console.log("Sign in response: " + response);
    // if(!response.success) {
    //   Alert.alert("Sign In", response.message);
    // }

    setIsLoading(true);
    const success = await login(emailRef.current, passwordRef.current);
    setIsLoading(false);
    console.log("Sign in response: " + JSON.stringify(success));
    if (!success) {
      Alert.alert("Sign In", "Invalid email or password");
    }
  }

  return (
    <View>
      <Text>Sign In</Text>
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
      <Text>Forgot password?</Text>

      {/* submit button */}
      <View>
        {
          isLoading? (
            <View>
              <Text>Loading...</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={handleLogin}>
              <Text>Sign In</Text>
            </TouchableOpacity>
          )
        }
      </View>
      <View>
        <Text>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
          <Text>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default SignIn;