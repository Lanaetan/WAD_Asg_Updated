import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useCreatePost } from '../contexts/CreatePostContext';
import styles from '../assets/animations/styles/createPost.style.tsx';

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
    <ScrollView>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={styles.header}>What's on your mind?</Text>

        {/* Image Picker */}
        <TouchableOpacity
          onPress={pickImage}
          style={styles.imageWrapper}
          disabled={isPosting}>
          <View style={{ position: 'relative' }}>
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

        {/* Caption Input */}
        <TextInput
          placeholder="Enter your caption..."
          multiline
          numberOfLines={4}
          style={[styles.input, errors.caption && styles.inputError]}
          value={caption}
          onChangeText={text => setCaption(text)}
        />
        {errors.caption && (
          <Text style={styles.errorText}>{errors.caption}</Text>
        )}

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
