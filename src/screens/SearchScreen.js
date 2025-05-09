import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
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
    <View style={styles.searchContainer}>
      <Feather 
        name="search" 
        size={24} />
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />
    </View>
    
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
            <View style={styles.userList}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.name}>{item.name}</Text>
            </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0, 
    paddingLeft: 8, 
  },
  userList: {
    flex: 1,
    flexDirection: 'column',
    borderBlockColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 3,
  },
  username: {
    fontSize: 16,
    paddingHorizontal: 15,
    marginBottom: 2,
    fontWeight: 'bold'
  },
  name: {
    fontSize: 14,
    marginVertical: 2,
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