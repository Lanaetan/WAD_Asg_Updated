import { useContext, useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { getDBConnection, getUserById } from '../db-service/userService';
// let common = require('../CommonData');
let SQLite = require('react-native-sqlite-storage');

const openCallback = () => {
    console.log('database open success');
  }

const errorCallback = (err: any) => {
console.log('Error in opening the database: ' + err);
}

const TestDbScreen = ({ navigation }: any) => {
  
    const [students, setStudents] = useState<any>([]);

    let db = SQLite.openDatabase(
        {name: 'db.sqlite', createFromLocation: '~db.sqlite'},
        openCallback,
        errorCallback,
    )

  const _query = () => {
    try{
        const studentData:any = [];
        db.executeSql('SELECT * FROM users ORDER BY name',[], (results:any) => {
          (results.rows.raw()).forEach(( item:any ) => {
            studentData.push(item);
          })
          setStudents(studentData);
        });
      } catch (error) {
        console.error(error);
        throw Error('Failed to get students !!!');
      }
  }

  useEffect(()=>{
    _query();
  },[]);


  return (
    <View>
        <Text>Hello</Text>
        <FlatList
          data={students}
          showsVerticalScrollIndicator={true}
          renderItem={({item}:any) => (
              <View style={styles.item}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemSubtitle}>
                 {item.email}
                </Text>
              </View>
            
          )}
          keyExtractor={ (item:any) => 
            item.id.toString()
          }
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

