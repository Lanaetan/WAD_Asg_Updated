import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import styles from '../../assets/styles/HomeScreen.style';

const PostListItem = ({ post }) => {
  const navigation = useNavigation();
  const [imageDimensions, setImageDimensions] = useState(null);
  const [timeAgo, setTimeAgo] = useState('');
  const screenWidth = Dimensions.get('window').width - 52;
  
  // Get time ago text
  const getTimeAgo = (dateString) => {
    return moment(dateString).fromNow();
  };

  // Removing width and height parameters from image url
  const cleanImageUrl = (url) =>
    url ? url.replace(/w_\d+/, '').replace(/h_\d+/, '') : null;

  useEffect(() => {
    // Set initial time ago
    setTimeAgo(getTimeAgo(post.created_at));
    
    // Update time ago every 30 seconds
    const intervalId = setInterval(() => {
      setTimeAgo(getTimeAgo(post.created_at));
    }, 30000); // 30 seconds
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [post.created_at]);

  useEffect(() => {
    if (post.image) {
      const imageUrl = cleanImageUrl(post.image);
      Image.getSize(
        imageUrl,
        (width, height) => {
          setImageDimensions({ width, height, ratio: width / height });
        },
        (error) => console.error('Error getting image size:', error)
      );
    }
  }, [post.image]);

  const handleUserPress = () => {
    // Navigate to user profile when username is pressed
    navigation.navigate("UserProfile", { 
      searchedUser: { id: post.user_id, username: post.user_name } 
    });
  };

  const imageUrl = cleanImageUrl(post.image);
  
  const imageStyle = imageUrl && imageDimensions
    ? {
        width: '100%',
        height: screenWidth / imageDimensions.ratio,
        aspectRatio: imageDimensions.ratio,
      }
    : {};

  return (
    <View style={styles.postCard}>
      {/* Post Header */}
      <Text style={styles.caption}>{post.caption}</Text>
      <TouchableOpacity onPress={handleUserPress}>
        <Text style={styles.username}>Posted by: {post.user_name}</Text>
      </TouchableOpacity>
      <Text style={styles.postInfo}>{timeAgo}</Text>
      
      {/* Post Image */}
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={[styles.postImage, imageStyle]}
            resizeMode="contain"
            onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
          />
        ) : (
          <Text style={styles.noImageText}>No image available</Text>
        )}
      </View>
    </View>
  );
};

export default PostListItem;