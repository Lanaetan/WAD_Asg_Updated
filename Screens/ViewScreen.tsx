import React, { useState, useEffect } from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { InputWithLabel } from '../UI';
import {FloatingAction} from 'react-native-floating-action';
let SQLite = require('react-native-sqlite-storage');
let common = require('../CommonData');

const actions = [
  {
    text: 'Edit',
    color: '#c80000',
    icon: require('../icons/edit_icon.png'),
    name: 'edit',
    position: 2,
  },
  {
    text: 'Delete',
    color: '#c80000',
    icon: require('../icons/delete_icon.jpg'),
    name: 'delete',
    position: 1,
  },
];

const openCallback = () => {
    console.log('database open success');
  }

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}

const ViewScreen = ({route, navigation} : any ) => {

    let db = SQLite.openDatabase(
        {name: 'db.sqlite', createFromLocation: '~db.sqlite'},
        openCallback,
        errorCallback,
    )

    const [studentID, setStudentID] = useState(route.params.id);
    const [student, setStudent] = useState<any>(null);

    const _queryByID = (id: any) => {
        try {
            db.executeSql(`SELECT * FROM students WHERE id=${id}`,[],(results:any) => {
              if (results.rows.length) {
                  setStudent(results.rows.item(0));
                }
            });
          } catch (error) {
            console.error(error);
            throw Error('Failed to get the student !!!');
          }
    }

    const _delete = () => {
    Alert.alert('Confirm to delete ?', student.name, [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
            db.executeSql('DELETE FROM students WHERE id = ?', [studentID]);
            route.params.refresh();
            navigation.goBack();
        },
      },
    ]);
  }

    useEffect(()=>{
      _queryByID(studentID);
    },[]);

    return (
      <View style={styles.container}>
        <ScrollView>
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Name'}
            value={student ? student.name : ''}
            orientation={'vertical'}
            editable={false}
          />
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Email'}
            value={student ? student.email : ''}
            orientation={'vertical'}
            editable={false}
          />
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'State'}
            value={student ? common.getValue(common.states, student.state) : ''}
            orientation={'vertical'}
            editable={false}
          />
        </ScrollView>
        <FloatingAction
          actions={actions}
          color={'#a80000'} //   floatingIcon={( //     <Image //       source={require('./images/baseline_edit_white_18dp.png')} //     /> //   )}
          onPressItem={name => {
            switch (name) {
              case 'edit':
                navigation.navigate('EditScreen', {
                  id: student ? student.id : 0,
                  headerTitle: student ? student.name : '',
                  refresh: _queryByID,
                  homeRefresh: route.params.refresh,
                });
                break;
              case 'delete':
                _delete();
                break;
            }
          }}
        />
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
    color: 'black',
  },

  pickerItemStyle: {
    fontSize: 20,
    color: '#000099',
  },
});

export default ViewScreen;