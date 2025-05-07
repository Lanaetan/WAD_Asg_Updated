import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { uploadImageToCloudinary } from '../utils/cloudinary';

export const useCreatePost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [errors, setErrors] = useState({});
  const [isPosting, setIsPosting] = useState(false);

  // Tap to select image from library
  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.didCancel) return;
      if (response.assets?.[0]?.uri) {
        setSelectedImage(response.assets[0].uri);
      }
    });
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
      Alert.alert('Validation Error', 'Please fill in the required fields.', [{ text: 'OK' }]);
      return;
    }

    try {
      setIsPosting(true);
      const imageUrl = selectedImage ? await uploadImageToCloudinary(selectedImage) : null;

      // Simulate API call to create post
      console.log('Creating post with:', { caption, imageUrl });
      await new Promise(resolve => setTimeout(resolve, 500));

      // Show success message
      console.log('Post created successfully!');
      Alert.alert('Success', 'Your post has been created!', [{ text: 'OK' }]);

      // Reset form fields
      setSelectedImage(null);
      setCaption('');
      setErrors({});
    } catch (error) {
      console.error('Create post error:', error);
      Alert.alert('Error', 'Failed to create post.', [{ text: 'OK' }]);
    } finally {
      setIsPosting(false);
    }
  };

  return {
    caption,
    selectedImage,
    setSelectedImage,
    setCaption,
    errors,
    setErrors,
    isPosting,
    pickImage,
    createPost,
  };
};
