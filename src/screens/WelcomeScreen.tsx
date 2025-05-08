import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';



export default function WelcomeScreen({route, navigation}: any) {

  return (
      <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/images/snaplens2.png')}></Image>
      
      <View style={{marginHorizontal: 20,marginBottom: 80, }}>
      <Animated.Text  entering={FadeInUp.duration(1000).springify()} style={styles.text}>Welcome</Animated.Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
                  <Text style={styles.signup}>SignIn</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.signup}>SignUp</Text>
      </TouchableOpacity>
      </View>
      
      </View>
   
  )
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: '#e0f2fe',
          },
      logo: {
            width: 160,
            height: 160,
            borderRadius: 100, 
            resizeMode: 'cover',
            alignSelf: 'center',
            marginVertical: 20,
            marginTop: 250,
      
          },
          text: {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 36,
            marginBottom: 40,
            color: '#0f172a', 
            fontFamily: 'Helvetica Neue', 
         
          },
          
      button: {
            width: '100%', 
            backgroundColor: '#14b8a6', 
            paddingVertical: 13,
            paddingHorizontal: 20,
            borderRadius: 24, 
            marginBottom: 12, 
        },
      signup:{
            textAlign: 'center',      
            color: 'white',           
            fontSize: 18,           
            fontWeight: 'bold',
            width: '100%'
      }

});