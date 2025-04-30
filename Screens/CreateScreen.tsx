import React, { useEffect, useState } from 'react';
import {StyleSheet, TextInput, Text, View, ScrollView} from 'react-native';
import {InputWithLabel, PickerWithLabel, AppButton} from '../UI';
import { LogBox } from 'react-native';

let common = require('../CommonData');
let SQLite = require('react-native-sqlite-storage');

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const openCallback = () => {
    console.log('database open success');
  }

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}

const CreateScreen = ({route, navigation} : any ) => {

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[state, setState] = useState('01');

    let db = SQLite.openDatabase(
        {name: 'db.sqlite', createFromLocation: '~db.sqlite'},
        openCallback,
        errorCallback,
    )

    useEffect(()=>{
        navigation.setOptions({headerTitle: 'Add New Student'});
    },[]);

    const _insert = () => {
      try{
        db.executeSql('INSERT INTO students(name,email,state) VALUES(?,?,?)',
            [name,email,state]
        );
        route.params.refresh();
        navigation.goBack();
      } catch (error) {
        console.error(error);
        throw Error('Failed to add student !!!');
      }
    }

    return (
      <ScrollView style={styles.container}>
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          label={'Name'}
          placeholder={'type student Name here'}
          value={name}
          onChangeText={(name:any) => {
            setName(name);
          }}
          orientation={'vertical'}
        />
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          placeholder={'type student Email here'}
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
          onValueChange={(itemValue:any, itemIndex:any) => {
            setState(itemValue);
          }}
          orientation={'vertical'}
          textStyle={{fontSize: 24}}
        />
        <AppButton
          style={styles.button}
          title={'Save'}
          theme={'primary'}
          onPress={_insert}
        />
      </ScrollView>
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

export default CreateScreen;