import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, Image, StyleSheet, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import { getDBConnection } from '../db-service/database';
import { getPosts } from '../db-service/postService';
import { getUserById } from '../db-service/userService';
import { useAuth } from '../contexts/AuthContext';
import styles from '../assets/styles/showPost.style';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageDimensions, setImageDimensions] = useState({});
  const [refreshing, setRefreshing] = useState(false); // Added state for refreshing

  const { user } = useAuth();
  const currentUserId = user?.id;

  // Fetch username by user ID
  const fetchUserName = async (userId) => {
    try {
      const db = await getDBConnection();
      const userData = await getUserById(db, userId);
      return userData?.name || 'Unknown';
    } catch (error) {
      console.error('Error fetching user name:', error);
      return 'Unknown';
    }
  };

  // Format the date string to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Convert to a readable format based on the user's locale
  };

  // Get image dimensions to properly size it
  const getImageDimensions = (imageUrl, postId) => {
    if (!imageUrl) return;
    
    // Skip if we already have dimensions for this image
    if (imageDimensions[postId]) return;
    
    Image.getSize(
      imageUrl,
      (width, height) => {
        setImageDimensions(prev => ({
          ...prev,
          [postId]: { width, height, ratio: width / height }
        }));
      },
      (error) => {
        console.error('Error getting image size:', error);
      }
    );
  };

  // Fetch posts from the database
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const db = await getDBConnection();
      const postsData = await getPosts(db, currentUserId);

      const postsWithUserNames = await Promise.all(
        postsData.map(async (post) => {
          const userName = await fetchUserName(post.user_id);
          return { ...post, user_name: userName };
        })
      );

      setPosts(postsWithUserNames);
      
      // Get dimensions for all images
      postsWithUserNames.forEach(post => {
        if (post.image) {
          // Clean the URL if needed - remove any width/height parameters
          const cleanImageUrl = post.image.replace(/w_\d+/, '').replace(/h_\d+/, '');
          getImageDimensions(cleanImageUrl, post.id);
        }
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to load posts.');
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing after the posts are fetched
    }
  };

  // Called when pull to refresh is triggered
  const onRefresh = () => {
    setRefreshing(true); // Show the loading indicator for refresh
    fetchPosts(); // Fetch the latest posts
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts when the screen loads
  }, [currentUserId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          // Clean the URL if needed - remove any width/height parameters
          const imageUrl = item.image ? item.image.replace(/w_\d+/, '').replace(/h_\d+/, '') : null;
          
          // Use the screenWidth to calculate proper image height
          const screenWidth = Dimensions.get('window').width - 52; // Account for padding and margins
          const postDimensions = imageDimensions[item.id];
          
          // Calculate image style with proper aspect ratio
          const imageStyle = imageUrl ? {
            width: '100%',
            height: postDimensions ? screenWidth / postDimensions.ratio : undefined,
            aspectRatio: postDimensions ? postDimensions.ratio : undefined,
          } : {};
          
          return (
            <View style={styles.postCard}>
              <Text style={styles.caption}>{item.caption}</Text>
              <Text style={styles.postInfo}>Posted by: {item.user_name}</Text>
              <Text style={styles.postInfo}>Created at: {formatDate(item.created_at)}</Text>
              <View style={styles.imageContainer}>
                {imageUrl ? (
                  <Image
                    source={{ uri: imageUrl }}
                    style={[styles.postImage, imageStyle]}
                    resizeMode="contain" // Use 'contain' to show the full image
                    onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
                  />
                ) : (
                  <Text style={styles.noImageText}>No image available</Text>
                )}
              </View>
            </View>
          );
        }}
        refreshing={refreshing} // Control the refreshing indicator
        onRefresh={onRefresh} // Trigger the refresh when the user pulls down
      />
    </SafeAreaView>
  );
};

// Get the screen width for responsive sizing
const screenWidth = Dimensions.get('window').width;

export default HomeScreen;
