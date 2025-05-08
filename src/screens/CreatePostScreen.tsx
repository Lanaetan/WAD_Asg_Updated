import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useCreatePost } from '../contexts/Post/CreatePostContext';
import styles from '../assets/styles/CreatePost.style';

const CreateScreen = () => {
  const {
    caption,
    setCaption,
    selectedImage,
    errors,
    isPosting,
    pickImage,
    createPost,
  } = useCreatePost();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}     
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>What's on your mind?</Text>
        
        {/* Image Selector */}
        <TouchableOpacity 
          onPress={pickImage} 
          style={[
            styles.imageWrapper, 
            selectedImage ? styles.imageWrapperWithImage : {}
          ]} 
          disabled={isPosting}
          activeOpacity={0.7}
        >
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.overlayText}>
              Tap to select a photo
            </Text>
          )}
        </TouchableOpacity>
        
        {/* Caption Input */}
        <TextInput
          placeholder="Enter your caption..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          style={[
            styles.input, 
            styles.captionInput,
            errors.caption ? styles.inputError : null
          ]}
          value={caption}
          onChangeText={setCaption}
          editable={!isPosting}
        />
        {errors.caption && <Text style={styles.errorText}>{errors.caption}</Text>}

        {/* Post Button */}
        <TouchableOpacity 
          style={[
            styles.postButton, 
            (isPosting || !selectedImage) ? styles.postButtonDisabled : {}
          ]} 
          onPress={createPost}
          disabled={isPosting || !selectedImage}
          activeOpacity={0.8}
        >
          {isPosting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.postButtonText}>Post Now!</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateScreen;