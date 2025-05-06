import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {useState} from 'react';

const CreateScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          return;
        }
        if (response.assets && response.assets[0]?.uri) {
          setSelectedImage(response.assets[0].uri);
        }
      },
    );
  };

  return (
    <ScrollView>
      <View style={{flex: 1, padding: 20}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
          What's on your mind?
        </Text>
        <TextInput placeholder="Title" style={styles.input} />
        <TextInput
          placeholder="Content"
          multiline
          numberOfLines={4}
          style={styles.input}
        />
        <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
          <View style={{position: 'relative'}}>
            <Image
              style={styles.image}
              source={{
                uri:
                  selectedImage ||
                  'https://via.placeholder.com/150?text=Tap+to+choose+photo',
              }}
              resizeMode="cover"
            />
            <Text
              style={[styles.overlayText, {opacity: selectedImage ? 0 : 1}]}>
              Tap to select a photo from your gallery
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post Now!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  imageWrapper: {
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  overlayText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -75}, {translateY: -10}],
    width: 150,
    textAlign: 'center',
  },
  postButton: {
    backgroundColor: '#102E50',
    padding: 15,
    borderRadius: 5,
  },
  postButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
