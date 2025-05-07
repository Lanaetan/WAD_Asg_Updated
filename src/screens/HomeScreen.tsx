import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, Image, StyleSheet, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import { getDBConnection } from '../db-service/database';
import { getPosts } from '../db-service/postService';
import { getUserById } from '../db-service/userService';
import { useAuth } from '../contexts/AuthContext';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageDimensions, setImageDimensions] = useState({});

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
    }
  };

  useEffect(() => {
    fetchPosts();
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
      />
    </SafeAreaView>
  );
};

// Get the screen width for responsive sizing
const screenWidth = Dimensions.get('window').width;

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
  },
  caption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  imageContainer: {
    marginTop: 12,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  postImage: {
    width: '100%',
    // Height will be dynamically calculated based on the image's aspect ratio
  },
  noImageText: {
    textAlign: 'center',
    padding: 20,
    color: '#999',
  },
});

export default HomeScreen;
