import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import { getUsersExceptCurrent } from '../db-service/messageService';
import { getDBConnection } from '../db-service/database';
import { useAuth } from '../contexts/AuthContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getUsers } from '../db-service/userService';

const SearchScreen = () => {

  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  
  const _queryUsersExceptCurrent = async () => {
    try{
        setUsers(await getUsers(await getDBConnection(), user.id));
      }catch (error) {
        console.error(error);
        throw Error('Failed to get users !!!');
      }
  }

  useEffect(() => {
    _queryUsersExceptCurrent();
  },[])

  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredData = users.filter((item) =>
    item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
  <View style={styles.container}>
    <TextInput
      placeholder="Search"
      value={searchQuery}
      onChangeText={setSearchQuery}
      style={styles.input}
    />

    <FlatList
      data={filteredData}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity 
          onPress={() => navigation.navigate("UserProfile", { searchedUser: item })}> 
          <View style={styles.content}>
            <Image 
              source={{ uri: item.image || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' }} 
              style={styles.image} 
            />
            <Text style={styles.item}>{item.username}</Text>
          </View>
      </TouchableOpacity>
    )}
  />

  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: 'lightgrey',
  },
  item: {
    fontSize: 16,
    marginVertical: 6,
    paddingHorizontal: 15,
  },
  content: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 40,
  }
});

export default SearchScreen;