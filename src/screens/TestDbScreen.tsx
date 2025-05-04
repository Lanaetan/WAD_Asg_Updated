import { useContext, useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { getDBConnection, getUsersExceptCurrent } from '../db-service/userService';
let SQLite = require('react-native-sqlite-storage');

const openCallback = () => {
    console.log('database open success');
  }

const errorCallback = (err: any) => {
console.log('Error in opening the database: ' + err);
}

const TestDbScreen = ({ navigation }: any) => {
  
  const [users, setUsers] = useState<any>([]);

  const _query = async () => {
    try{
      setUsers(await getUsersExceptCurrent(await getDBConnection(), '1'));
    }catch (error) {
      console.error(error);
      throw Error('Failed to get users except current logged in user !!!');
    }
    console.log("users in sqlite: ", users);
  }

  useEffect(()=>{
    _query();
  },[]);

  return (
    <View>
      <FlatList
        data={users}
        showsVerticalScrollIndicator={true}
        keyExtractor={ (item:any) => 
          item.id.toString()
        }
        renderItem={({item}:any) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemSubtitle}>
                {item.email}
              </Text>
            </View>
        )}
      />
    </View>
  );
};

export default TestDbScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  item: {
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
  },
  itemSubtitle: {
    fontSize: 18,
  },
});

