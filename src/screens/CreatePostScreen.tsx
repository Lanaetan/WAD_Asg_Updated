import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const CreateScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  
  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      async (response) => {
        if (response.didCancel) return;
  
        if (response.assets && response.assets[0]?.uri) {
          const localUri = response.assets[0].uri;
          setSelectedImage(localUri);
          
          // Upload to Cloudinary
          const cloudUrl = await uploadImageToCloudinary(localUri);
          if (cloudUrl) {
            setUploadedImageUrl(cloudUrl);
          }
        }
      },
    );
  };
  
  const uploadImageToCloudinary = async (imageUri) => {
    const data = new FormData();
    data.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });
    data.append('upload_preset', 'default');
    data.append('cloud_name', 'dnwjfkzcn');
  
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dnwjfkzcn/image/upload', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      console.log('Cloudinary URL:', json.secure_url);
      return json.secure_url;
    } catch (err) {
      console.error('Cloudinary Upload Error:', err);
      return null;
    }
  };

  // Validation function
  const validateForm = () => {
    let newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createPost = async () => {
    // Validate form first
    if (!validateForm()) {
      Alert.alert(
        "Validation Error",
        "Please fill in the required fields (title and content).",
        [{ text: "OK" }]
      );
      return;
    }
    
    // If validation passes, continue with post creation
    if (selectedImage) {
      await uploadImageToCloudinary(selectedImage);
    }
    
    // Here you would save the post to your database
    console.log('Creating post with:', { title, content, imageUrl: uploadedImageUrl });
    
    // Show success message
    Alert.alert(
      "Success",
      "Your post has been created successfully!",
      [{ text: "OK" }]
    );
    
    // Reset form
    setTitle('');
    setContent('');
    setSelectedImage(null);
    setUploadedImageUrl(null);
  };

  return (
    <ScrollView>
      <View style={{flex: 1, padding: 20}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
          What's on your mind?
        </Text>
        
        <TextInput 
          placeholder="Title" 
          style={[styles.input, errors.title ? styles.inputError : null]} 
          value={title}
          onChangeText={text => {
            setTitle(text);
            if (errors.title) {
              setErrors({...errors, title: null});
            }
          }}
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        
        <TextInput
          placeholder="Content"
          multiline
          numberOfLines={4}
          style={[styles.input, errors.content ? styles.inputError : null]}
          value={content}
          onChangeText={text => {
            setContent(text);
            if (errors.content) {
              setErrors({...errors, content: null});
            }
          }}
        />
        {errors.content && <Text style={styles.errorText}>{errors.content}</Text>}
        
        <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
          <View style={{position: 'relative'}}>
            <Image
              style={styles.image}
              source={{
                uri:
                  uploadedImageUrl ||
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
        
        <TouchableOpacity onPress={createPost} style={styles.postButton}>
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
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
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