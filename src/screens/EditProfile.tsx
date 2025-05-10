import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  Image, 
  Text,
  ScrollView
} from 'react-native';
import { getDBConnection } from '../db-service/database';
import { updateUserById, getUserById } from '../db-service/userService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useCreatePost } from '../contexts/Post/CreatePostContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { uploadImageToCloudinary } from '../utils/cloudinary';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  const [inputHeight, setInputHeight] = useState(40); // initial height for bio input field

  const {
    selectedImage,
    setSelectedImage,
    pickImage,
  } = useCreatePost();

  

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
    try {
      console.log('selected image: ', selectedImage);
      const imageUrl = selectedImage ? await uploadImageToCloudinary(selectedImage) : null;
      console.log('Image URL:', imageUrl);
  
      if (!imageUrl) {
        Alert.alert('Error', 'Image upload failed.', [{ text: 'OK' }]);
        return;
      }      

      const db = await getDBConnection();
      await updateUserById(db, user.id, name, username, bio, imageUrl);

      await refreshUser(); 
      
      Alert.alert('Success', 'Profile Updated Successfully!');
      navigation.goBack();

      setSelectedImage(null);

    } catch (error) {
      console.error('Update profile error:', error);
      Alert.alert('Error', 'Failed to update profile.', [{ text: 'OK' }]);
    }
  };


  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        onPress={pickImage}
        style={styles.imagePicker}
      >
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        ) : (
          <Image 
            source={{ uri: image ? image : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" }}
            style={styles.profileImage} 
          />
        )}
        <Text style={{alignSelf: 'center', color: 'skyblue', fontSize: 16}}>Tap to select a photo</Text>
      </TouchableOpacity>
      
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput style={styles.text} value={name} onChangeText={setName} placeholder='name' />
      </View>

      <View style={styles.input}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput style={styles.text} value={username} onChangeText={setUsername} placeholder='username' />
      </View>

      <View style={styles.input}>
        <Text style={styles.inputLabel}>Bio</Text>
        <TextInput 
          style={[styles.text, { height: inputHeight, textAlignVertical: 'top' }]} 
          value={bio} 
          onChangeText={setBio} 
          placeholder='bio'  
          multiline={true} 
          onContentSizeChange={(event) => {
            setInputHeight(event.nativeEvent.contentSize.height);
          }}
        />
      </View>

      <Button title="Save Changes" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    paddingTop: 10,
  },
  imagePicker: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    padding: 0,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
    alignSelf: 'center',
    marginVertical: 15,
  },
});

export default EditProfileScreen;