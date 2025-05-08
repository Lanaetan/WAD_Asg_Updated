import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { getUsersExceptCurrent } from '../db-service/messageService';
import { getDBConnection } from '../db-service/database';
import { useAuth } from '../contexts/AuthContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = () => {

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={{fontSize:50, color: 'black'}}>Home</Text>
    </View>
  );
}


export default HomeScreen;