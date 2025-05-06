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
  const [isPosting, setIsPosting] = useState(false);
  
  // Function to pick image from gallery
  // This function is called when the user taps on the image area to select a photo
  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      (response) => {
        if (response.didCancel) return;
  
        if (response.assets && response.assets[0]?.uri) {
          const localUri = response.assets[0].uri;
          setSelectedImage(localUri);
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
      console.log('Cloudinary Upload Response:', json);
      
      // Transform URL to get centered crop
      const transformedUrl = json.secure_url.replace('/upload/', '/upload/c_fill,g_auto,w_800,h_300,q_auto/');
      
      return transformedUrl;
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
    
    try {
      setIsPosting(true);
      let imageUrl = null;
      
      // Upload to Cloudinary only when creating the post
      if (selectedImage) {
        imageUrl = await uploadImageToCloudinary(selectedImage);
      }
      
      // Save post to database or API (to be implemented)
      // For now, just log the data to console
      console.log('Creating post with:', { title, content, imageUrl });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
      
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert(
        "Error",
        "Failed to create post. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <ScrollView>
      <View style={{flex: 1, padding: 20}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
          What's on your mind?
        </Text>
        
        {/* Input for Title */}
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
        
        {/* Input for Content */}
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
        
        {/* Image Picker (only one picture) */}
        <TouchableOpacity onPress={pickImage} style={styles.imageWrapper} disabled={isPosting}>
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
        
        {/* Post Button */}
        <TouchableOpacity 
          onPress={createPost} 
          style={[styles.postButton, isPosting ? styles.postButtonDisabled : null]} 
          disabled={isPosting}
        >
          <Text style={styles.postButtonText}>
            {isPosting ? 'Creating Post...' : 'Post Now!'}
          </Text>
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
    height: 300,
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
  postButtonDisabled: {
    backgroundColor: '#7a93a9',
  },
  postButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});