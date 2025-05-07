import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {uploadImageToCloudinary} from '../utils/cloudinary';
import styles from '../assets/animations/styles/createPost.style.tsx';

const CreateScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setcaption] = useState('');
  const [errors, setErrors] = useState({});
  const [isPosting, setIsPosting] = useState(false);

  // Tap to select image from library
  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', quality: 1},
      response => {
        if (response.didCancel) return;
        if (response.assets?.[0]?.uri) {
          setSelectedImage(response.assets[0].uri);
        }
      },
    );
  };

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};
    if (!caption.trim()) newErrors.caption = 'Caption is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Upload image to Cloudinary and create post
  const createPost = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill in the required fields.', [
        {text: 'OK'},
      ]);
      return;
    }

    try {
      setIsPosting(true);
      const imageUrl = selectedImage
        ? await uploadImageToCloudinary(selectedImage)
        : null;

      // Simulate API call to create post
      console.log('Creating post with:', {caption, imageUrl});

      await new Promise(resolve => setTimeout(resolve, 500));

      Alert.alert('Success', 'Your post has been created!', [{text: 'OK'}]);
      setcaption('');
      setSelectedImage(null);
    } catch (error) {
      console.error('Create post error:', error);
      Alert.alert('Error', 'Failed to create post.', [{text: 'OK'}]);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <ScrollView>
      <View style={{flex: 1, padding: 20}}>
        <Text style={styles.header}>What's on your mind?</Text>

        {/* Caption Input */} 
        <TextInput
          placeholder="Enter your caption..."
          multiline
          numberOfLines={4}
          style={[styles.input, errors.caption && styles.inputError]}
          value={caption}
          onChangeText={text => {
            setcaption(text);
            if (errors.caption) setErrors({...errors, caption: null});
          }}
        />
        {errors.caption && (
          <Text style={styles.errorText}>{errors.caption}</Text>
        )}

        {/* Image Picker */}
        <TouchableOpacity
          onPress={pickImage}
          style={styles.imageWrapper}
          disabled={isPosting}>
          <View style={{position: 'relative'}}>
            <Image
              source={{
                uri:
                  selectedImage ||
                  'https://via.placeholder.com/150?text=Tap+to+choose+photo',
              }}
              style={styles.image}
              resizeMode="cover"
            />
            {!selectedImage && (
              <Text style={styles.overlayText}>Tap to select a photo</Text>
            )}
          </View>
        </TouchableOpacity>

        {/* Post Button */}
        <TouchableOpacity
          onPress={createPost}
          style={[styles.postButton, isPosting && styles.postButtonDisabled]}
          disabled={isPosting}>
          <Text style={styles.postButtonText}>
            {isPosting ? 'Creating Post...' : 'Post Now!'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateScreen;
