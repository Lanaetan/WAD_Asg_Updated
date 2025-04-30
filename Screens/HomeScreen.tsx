import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {FloatingAction} from 'react-native-floating-action';
let common = require('../CommonData');
let SQLite = require('react-native-sqlite-storage');

const actions = [
  {
    text: 'Add',
    icon: require('../icons/add_icon.png'),
    name: 'add',
    position: 1,
  },
];

const openCallback = () => {
    console.log('database open success');
  }

const errorCallback = (err: any) => {
console.log('Error in opening the database: ' + err);
}

const HomeScreen = ({route, navigation} : any ) => {

    const [students, setStudents] = useState<any>([]);
    const [users, setUsers] = useState<any>([]);

    let db = SQLite.openDatabase(
        {name: 'db.sqlite', createFromLocation: '~db.sqlite'},
        openCallback,
        errorCallback,
    )

  const _query = () => {
    try{
        const studentData:any = [];
        db.executeSql('SELECT * FROM students ORDER BY name',[], (results:any) => {
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

  const _queryUsers = () => {
    try{
        const userData:any = [];
        db.executeSql('SELECT * FROM users ORDER BY name',[], (results:any) => {
          (results.rows.raw()).forEach(( item:any ) => {
            userData.push(item);
          })
          setUsers(userData);
        });
      } catch (error) {
        console.error(error);
        throw Error('Failed to get users !!!');
      }
  }

  // const _query = () => {
  //   try {
  //     const studentData: any = [];
  //     db.transaction((tx) => {
  //       tx.executeSql('SELECT * FROM students ORDER BY name', [], (tx, results) => {
  //         const len = results.rows.length;
  //         for (let i = 0; i < len; i++) {
  //           studentData.push(results.rows.item(i));
  //         }
  //         setStudents(studentData);
  //       });
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     throw Error('Failed to get students !!!');
  //   }
  // };

  // const _queryUsers = () => {
  //   try {
  //     const userData: any = [];
  //     db.transaction((tx: any) => {
  //       tx.executeSql('SELECT * FROM users ORDER BY name', [], (tx: any, results: any) => {
  //         const len = results.rows.length;
  //         for (let i = 0; i < len; i++) {
  //           userData.push(results.rows.item(i));
  //         }
  //         setUsers(userData);
  //       });
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     throw Error('Failed to get users !!!');
  //   }
  // };

    useEffect(()=>{
      _query();
      _queryUsers();
      
    },[]);

    useEffect(() => {
      console.log('Updated students:', students);
      console.log('Updated users:', users);
    }, [students]);
    
    useEffect(() => {
      console.log('Updated users:', users);
    }, [users]);

    return (
      
      <View style={styles.container}>
        <FlatList
          data={students}
          showsVerticalScrollIndicator={true}
          renderItem={({item}:any) => (
            <TouchableHighlight
              underlayColor="pink"
              onPress={() => {
                  navigation.navigate('ViewScreen', {
                  id: item.id,
                  headerTitle: item.name,
                  refresh: _query,
                });
              }}>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemSubtitle}>
                  {common.getValue(common.states, item.state)}
                </Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={ (item:any) => 
            item.id.toString()
          }
        />

<View>
          <Text>===============</Text>
        </View>

        {/* users */}
        <FlatList
          data={users}
          showsVerticalScrollIndicator={true}
          renderItem={({item}:any) => (
            <TouchableHighlight
              underlayColor="pink"
              onPress={() => {
                  navigation.navigate('ViewScreen', {
                  id: item.id,
                  headerTitle: item.name,
                  refresh: _query,
                });
              }}>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemSubtitle}>
                  {item.email}
                </Text>
                <Text style={styles.itemSubtitle}>
                  {item.bio}
                </Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={ (item:any) => 
            item.id.toString()
          }
        />

        
      </View>
    );
}

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

export default HomeScreen;