import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { getDBConnection } from '../db-service/database';
import { updateUserById, getUserById } from '../db-service/userService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      const db = await getDBConnection();
      const data = await getUserById(db, user.id);
      if (data) {
        setName(data.name);
        setUsername(data.username);
        setBio(data.bio);
        setImage(data.image);
      }
    };
    loadUser();
  }, []);

  const handleSave = async () => {
    const db = await getDBConnection();
    await updateUserById(db, user.id, name, username, bio, image);
    Alert.alert('Success', 'Profile Updated Successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.profileImage} />
      ) : null}
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder='name' />
      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder='username' />
      <TextInput style={styles.input} value={bio} onChangeText={setBio} placeholder='bio' />
      <TextInput style={styles.input} value={image} onChangeText={setImage} placeholder='image url' />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default EditProfileScreen;
