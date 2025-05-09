import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAuth } from '../contexts/AuthContext';

const SignInScreen = ({ route, navigation }: any) => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleLogin = async () => {
    const email = emailRef.current.trim();
    const password = passwordRef.current.trim();

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (!result.success) {
      setError(result.message); 
      Alert.alert('Login Failed', result.message); 
    } else {
      setError('');
    }
  };

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      emailRef.current = value;
    } else if (field === 'password') {
      passwordRef.current = value;
    }

    // Clear error when user starts typing in either field
    if (error) {
      setError('');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/images/background.png')} />
      <View style={styles.lightImage}>
        <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} style={styles.light} source={require('../../assets/images/light.png')} />
        <Animated.Image entering={FadeInUp.delay(600).duration(1000).springify()} style={styles.light2} source={require('../../assets/images/light.png')} />
      </View>

      <View style={[styles.form, { justifyContent: 'center', alignItems: 'center' }]}>
        <Animated.Text entering={FadeInUp.duration(1000).springify()} style={styles.login}>Login</Animated.Text>
      </View>

      <View style={styles.formContainer}>
        <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.inputBox}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={'grey'}
            onChangeText={(value) => handleInputChange('email', value)}
            style={{ padding: 10 }}
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} style={[styles.inputBox, { marginBottom: 20, marginTop: 10 }]}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={'grey'}
            secureTextEntry
            onChangeText={(value) => handleInputChange('password', value)}
            style={{ padding: 10 }}
          />
        </Animated.View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()} style={styles.buttonContainer}>
          {isLoading ? (
            <View style={styles.button}>
              <Text style={styles.buttonText}>Loading...</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>SignIn</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600).duration(1000).springify()} style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ color: '#0284c7' }}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  lightImage: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
  },
  light: {
    height: 225,
    width: 90,
  },
  light2: {
    height: 160,
    width: 65,
  },
  form: {
    height: '100%',
    width: '100%',
    paddingTop: 130,
    paddingBottom: 6,
    justifyContent: 'space-around',
    flex: 1,
  },
  login: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 40,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
  },
  inputBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 6,
    borderRadius: 16,
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: '#38bdf8',
    padding: 12,
    borderRadius: 24,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
