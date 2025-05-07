import {useState} from 'react';
import {Alert} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {uploadImageToCloudinary} from '../utils/cloudinary';
import {getDBConnection} from '../db-service/database';
import {createPost as createPostInDB} from '../db-service/postService';
import {useAuth} from '../contexts/AuthContext';

export const useCreatePost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [errors, setErrors] = useState({});
  const [isPosting, setIsPosting] = useState(false);

  // Get current user ID
  const { user } = useAuth();
  const currentUserId = user?.id;

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
      console.log('Image URL:', imageUrl);

      // Check if the imageUrl is valid before proceeding
      if (!imageUrl) {
        Alert.alert('Error', 'Image upload failed.', [{ text: 'OK' }]);
        return;
      }

      // Ensure DB connection
      const db = await getDBConnection();

      // Check if db is undefined or null (just a safeguard)
      if (!db) {
        console.error('Database connection failed!');
        Alert.alert('Error', 'Failed to connect to the database.', [{ text: 'OK' }]);
        return;
      }

      const createdAt = new Date().toISOString(); // Current timestamp

      // Insert post into DB
      console.log('Inserting post into DB:', imageUrl, caption, currentUserId, createdAt);
      await createPostInDB(db, imageUrl, caption, currentUserId, createdAt);

      // Show success message
      console.info('Post created successfully!');
      Alert.alert('Success', 'Your post has been created!', [{ text: 'OK' }]);

      // Reset form fields
      setCaption('');
      setSelectedImage(null);
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
    setCaption,
    selectedImage,
    setSelectedImage,
    errors,
    setErrors,
    isPosting,
    pickImage,
    createPost,
  };
};
