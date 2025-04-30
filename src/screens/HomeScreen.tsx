import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {FloatingAction} from 'react-native-floating-action';
// let common = require('../CommonData');
let SQLite = require('react-native-sqlite-storage');

const openCallback = () => {
  console.log('database open success');
}

const errorCallback = (err: any) => {
console.log('Error in opening the database: ' + err);
}

const HomeScreen = () => {

  const [students, setStudents] = useState<any>([]);

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

    useEffect(()=>{
      _query();
    },[]);

    return(

      <View style={styles.container}>
        <FlatList
          data={students}
          showsVerticalScrollIndicator={true}
          renderItem={({item}:any) => (
            <TouchableHighlight
              underlayColor="pink"
              // onPress={() => {
              //     navigation.navigate('ViewScreen', {
              //     id: item.id,
              //     headerTitle: item.name,
              //     refresh: _query,
              //   });
              // }}
              >
              {/* <View style={styles.item}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemSubtitle}>
                  {common.getValue(common.states, item.state)}
                </Text>
              </View> */}
            </TouchableHighlight>
          )}
          keyExtractor={ (item:any) => 
            item.id.toString()
          }
        />
        {/* <FloatingAction
          actions={actions}
          overrideWithAction={true}
          color={'#a80000'}
          onPressItem={() => {
              navigation.navigate('CreateScreen', {
              refresh: _query,
            });
          }}
        /> */}

 {/* <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:50, color: 'black'}}>Home</Text>
         </View> */}
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
 } );


export default HomeScreen;