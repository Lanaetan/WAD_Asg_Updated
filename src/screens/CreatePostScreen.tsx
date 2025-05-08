import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Animated,
  Easing
} from 'react-native';
import { useCreatePost } from '../contexts/Post/CreatePostContext';
import { useAuth } from '../contexts/AuthContext';
import styles from '../assets/styles/CreatePost.style';
import { deleteDraftFile, loadDraftFromFile, saveDraftToFile } from '../services/draftService';

const CreateScreen = () => {

  // inside CreateScreen
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [showDraftMessage, setShowDraftMessage] = useState(false);
  const slideAnim = useState(new Animated.Value(-50))[0]; // starts off-screen


  const { user } = useAuth();

  const {
    caption,
    setCaption,
    selectedImage,
    setSelectedImage,
    errors,
    isPosting,
    pickImage,
    createPost,
  } = useCreatePost();

  // Load draft when screen mounts
  useEffect(() => {
    (async () => {
      const draft = await loadDraftFromFile(user.id);
      console.log("Loaded draft:", draft);
      if (draft && (draft.text.caption || draft.text.selectedImage)) {
        setCaption(draft.text.caption);
        setSelectedImage(draft.text.selectedImage);
        setDraftLoaded(true);
        
        // Slide in
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }).start(() => {
          // Wait for 3 seconds, then slide out
          setTimeout(() => {
            Animated.timing(slideAnim, {
              toValue: -50,
              duration: 300,
              useNativeDriver: true,
              easing: Easing.in(Easing.ease),
            }).start();
          }, 3000);
        });
        }
    })();
  }, []);

    // Save draft when caption or image changes
    useEffect(() => {
      console.log('Current user ID:', user.id);
      const timeout = setTimeout(() => {
        saveDraftToFile({ caption, selectedImage }, user.id);
      }, 500); // waits for 500ms, then saves the data to a file, prevent saving every keystroke
  
      return () => clearTimeout(timeout);
    }, [caption, selectedImage]);
  
    // Clear draft after posting
    useEffect(() => {
      if (!isPosting && caption === '' && !selectedImage) {
        deleteDraftFile(user.id);
      }
    }, [caption, selectedImage, isPosting]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Animated Draft Message */}
      {draftLoaded && (
        <Animated.View
          style={{
            marginHorizontal: 50,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#c8e6c9',
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 15,
            transform: [{ translateY: slideAnim }],
            zIndex: 9999,
          }}
        >
          <Text style={{ color: '#2e7d32', textAlign: 'center', fontWeight: '500' }}>
            Previous draft loaded
          </Text>
        </Animated.View>
      )}
      
      {/* Header */}     
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>What's on your mind?</Text>

        {showDraftMessage && (
          <Text style={{ color: '#2e7d32', textAlign: 'center', marginVertical: 10 }}>
            Previous draft loaded
          </Text>
        )}
        
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