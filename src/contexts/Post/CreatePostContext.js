import {useState} from 'react';
import {Alert} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {uploadImageToCloudinary} from '../../utils/cloudinary';
import {getDBConnection} from '../../db-service/database';
import {createPost as createPostInDB} from '../../db-service/postService';
import {useAuth} from '../AuthContext';

export const useCreatePost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [errors, setErrors] = useState({});
  const [isPosting, setIsPosting] = useState(false);

  // Get current user ID
  const {user} = useAuth();
  const currentUserId = user?.id;

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

    // Check if the caption is provided
    if (!caption.trim()) newErrors.caption = 'Caption is required';

    // Check if an image is selected
    if (!selectedImage) newErrors.image = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Create post
  const createPost = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill in the required fields.', [
        {text: 'OK'},
      ]);
      return;
    }

    try {
      setIsPosting(true);

      // Upload image to Cloudinary only if selected
      const imageUrl = selectedImage
        ? await uploadImageToCloudinary(selectedImage)
        : null;
      console.log('Image URL:', imageUrl);

      if (!imageUrl) {
        Alert.alert('Error', 'Image upload failed.', [{text: 'OK'}]);
        return;
      }

      const db = await getDBConnection();
      if (!db) {
        console.error('Database connection failed!');
        Alert.alert('Error', 'Failed to connect to the database.', [
          {text: 'OK'},
        ]);
        return;
      }

      const createdAt = new Date().toISOString();
      await createPostInDB(db, imageUrl, caption, currentUserId, createdAt);

      Alert.alert('Success', 'Your post has been created!', [{text: 'OK'}]);

      // Reset fields
      setCaption('');
      setSelectedImage(null);
      setErrors({});
    } catch (error) {
      console.error('Create post error:', error);
      Alert.alert('Error', 'Failed to create post.', [{text: 'OK'}]);
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
