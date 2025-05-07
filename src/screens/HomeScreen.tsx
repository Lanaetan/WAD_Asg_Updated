import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {getDBConnection} from '../db-service/database';
import {getPosts} from '../db-service/postService';
import {getUserById} from '../db-service/userService';
import {useAuth} from '../contexts/AuthContext';

const HomeScreen = () => {
  // State for storing posts and loading status
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get current user from auth context
  const {user} = useAuth();
  const currentUserId = user?.id;

  // Fetches a user's name by their ID from the database
  const fetchUserName = async userId => {
    try {
      const db = await getDBConnection();
      const userData = await getUserById(db, userId);
      return userData?.name || 'Unknown';
    } catch (error) {
      console.error('Error fetching user name:', error);
      return 'Unknown';
    }
  };

  // Formats a date string into a readable format
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleString(); 
  };

  /**
   * Fetches posts from the database and adds user information
   * Updates the posts state with fetched data
   */
  const fetchPosts = async () => {
    // Check if user is authenticated
    if (!currentUserId) {
      Alert.alert('Error', 'User is not authenticated');
      return;
    }

    try {
      // Get database connection
      const db = await getDBConnection();
      // Fetch posts data
      const postsData = await getPosts(db, currentUserId);

      // Add user names to each post
      const postsWithUserNames = await Promise.all(
        postsData.map(async post => {
          const userName = await fetchUserName(post.user_id);
          return {...post, user_name: userName};
        }),
      );

      // Update state with post data
      setPosts(postsWithUserNames);
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to load posts.');
    } finally {
      // Set loading to false regardless of success or failure
      setLoading(false);
    }
  };

  // Fetch posts when component mounts or when user changes
  useEffect(() => {
    fetchPosts();
  }, [currentUserId]);

  // Display loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </View>
    );
  }

  // Main component render
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <View style={styles.postCard}>
            <Text style={styles.caption}>{item.caption}</Text>
            <Text style={styles.postInfo}>Posted by: {item.user_name}</Text>
            <Text style={styles.postInfo}>
              Created at: {formatDate(item.created_at)}
            </Text>
            <View style={styles.imageContainer}>
              {item.image ? (
                <Image
                  source={{uri: item.image}}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.noImageText}>No image available</Text>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  // Main container - takes up full screen
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  // Container for loading state
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
  // Styling for the FlatList content
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  // Individual post card styling
  postCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  // Post title/caption styling
  caption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  // Styling for user info and date
  postInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  // Container for the post image
  imageContainer: {
    marginTop: 12,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  // Post image styling
  postImage: {
    width: '100%',
    height: '100%',
  },
  // Styling for the "No image available" text
  noImageText: {
    textAlign: 'center',
    lineHeight: 200,
    color: '#999',
  },
});

export default HomeScreen;
