import React, { useState, useEffect } from 'react';
import {StyleSheet, TextInput, Text, View, ScrollView} from 'react-native';
import {InputWithLabel, PickerWithLabel, AppButton} from '../UI';
let common = require('../CommonData');
let SQLite = require('react-native-sqlite-storage');

const openCallback = () => {
    console.log('database open success');
  }

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}

const EditScreen = ({route, navigation} : any )  => {

    const [studentID, setStudentID] = useState(route.params.id);
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[state, setState] = useState('');

    let db = SQLite.openDatabase(
      {name: 'db.sqlite', createFromLocation: '~db.sqlite'},
      openCallback,
      errorCallback,
    )

    const _query = () => {
        try {
            db.transaction((tx:any) => {
                tx.executeSql(
                  'SELECT * FROM students WHERE id = ?',
                  [studentID],
                  (tx:any, results:any) => {
                    if (results.rows.length) {
                        setName(results.rows.item(0).name);
                        setEmail(results.rows.item(0).email);
                        setState(results.rows.item(0).state);
                    }
                  },
                );
              })
          } catch (error) {
            console.error(error);
            throw Error('Failed to get students !!!');
          }
      }

      useEffect(()=>{
        _query();
        },[]);

    const _update = () => {
        db.transaction((tx:any) => {
        tx.executeSql('UPDATE students SET name=?,email=?,state=? WHERE id=?', [
            name,
            email,
            state,
            studentID,
        ]);
        });
        route.params.refresh(studentID);
        route.params.homeRefresh();
        navigation.goBack();
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Name'}
            value={name}
            onChangeText={(name:any) => {
                setName(name)
            }}
            orientation={'vertical'}
          />
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Email'}
            value={email}
            onChangeText={(email:any) => {
              setEmail(email);
            }}
            keyboardType={'email-address'}
            orientation={'vertical'}
          />
          <PickerWithLabel
            textLabelStyle={styles.TextLabel}
            pickerItemStyle={styles.pickerItemStyle}
            label={'State'}
            items={common.states}
            mode={'dialog'}
            selectedValue={state}
            onValueChange={(itemValue:any, itemIndex: any) => {
              setState(itemValue);
            }}
            orientation={'vertical'}
          />
          <AppButton
            style={styles.button}
            title={'Save'}
            theme={'primary'}
            onPress={_update}
          />
        </ScrollView>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  TextLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },

  TextInput: {
    fontSize: 24,
    color: '#000099',
  },

  pickerItemStyle: {
    fontSize: 20,
    color: '#000099',
  },
  button: {
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    padding: 20,
    fontSize: 20,
    color: 'white',
  },
});
export default EditScreen;