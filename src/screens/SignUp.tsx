import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAuth } from '../contexts/AuthContext';

const SignUp = ({ route, navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [bio, setBio] = useState('');

  const handleContinue = () => {
    if (!name || !username || !email || !password) {
      Alert.alert('Sign Up', 'Please fill in all required fields');
      return;
    }
    setStep(2);
  };

  const handleRegister = async () => {
    if (!image || !bio) {
      Alert.alert('Sign Up', 'Please fill in image and bio');
      return;
    }

    setIsLoading(true);
    const response = await register(name, username, password, email, image, bio);
    setIsLoading(false);

    if (!response.success) {
      Alert.alert('Sign Up', response.message);
    } else {
      Alert.alert('Sign Up Successful', 'Please sign in with your credentials');
      navigation.navigate('SignIn');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/images/background.png')} />
      <View style={styles.lightImage}>
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          style={styles.light}
          source={require('../../assets/images/light.png')}
        />
        <Animated.Image
          entering={FadeInUp.delay(600).duration(1000).springify()}
          style={styles.light2}
          source={require('../../assets/images/light.png')}
        />
      </View>

      <View style={[styles.form, { justifyContent: 'center', alignItems: 'center' }]}>
        <Animated.Text entering={FadeInUp.duration(1000).springify()} style={styles.login}>
          Sign Up
        </Animated.Text>
      </View>

      <View style={styles.formContainer}>
        {step === 1 && (
          <>
            <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.inputBox}>
              <TextInput
                placeholder="Name"
                placeholderTextColor={'grey'}
                value={name}
                onChangeText={setName}
              />
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} style={styles.inputBox}>
              <TextInput
                placeholder="Username"
                placeholderTextColor={'grey'}
                value={username}
                onChangeText={setUsername}
              />
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()} style={styles.inputBox}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={'grey'}
                value={email}
                onChangeText={setEmail}
              />
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(600).duration(1000).springify()} style={styles.inputBox}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={'grey'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </Animated.View>

            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()} style={styles.inputBox}>
              <TextInput
                placeholder="Image"
                placeholderTextColor={'grey'}
                value={image}
                onChangeText={setImage}
              />
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(600).duration(1000).springify()} style={[styles.inputBox, { marginBottom: 20 }]}>
              <TextInput
                placeholder="Bio"
                placeholderTextColor={'grey'}
                value={bio}
                onChangeText={setBio}
              />
            </Animated.View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
                <Text style={styles.buttonText}>{isLoading ? 'Loading...' : 'Sign Up'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, { backgroundColor: '#94a3b8' }]} onPress={() => setStep(1)}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={{ color: '#0284c7' }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

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
    paddingTop: 100,
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
    marginBottom:10,
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
});
