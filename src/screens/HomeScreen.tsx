import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {getDBConnection} from '../db-service/database';
import {getPosts} from '../db-service/postService';
import {getUserById} from '../db-service/userService';
import {useAuth} from '../contexts/AuthContext';
import PostListItem from '../components/PostListItem';
import WeatherApp from '../components/PostListItem/Weather';
import styles from '../assets/styles/HomeScreen.style';

const HomeScreen = () => {
  interface Post {
    id: string;
    image: string;
    caption: string;
    created_at: string;
    user_id: string;
  }
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const {user} = useAuth();
  const currentUserId = user?.id;

  const renderHeader = () => {
    return <WeatherApp />;
  };

  // Fetch user name by ID
  const fetchUserName = async (userId: any) => {
    try {
      const db = await getDBConnection();
      const userData = await getUserById(db, userId);
      return userData?.username || 'Unknown';
    } catch (error) {
      console.error('Error fetching user name:', error);
      return 'Unknown';
    }
  };

  // Fetch posts from the database
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const db = await getDBConnection();
      const postsData = await getPosts(db, currentUserId);
      const postsWithUserNames = await Promise.all(
        postsData.map(async post => ({
          ...post,
          user_name: await fetchUserName(post.user_id),
        })),
      );
      setPosts(postsWithUserNames);
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to load posts.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Delete posts from the database
  const handlePostDeleted = (deletedPostId: string) => {
    setPosts(currentPosts =>
      currentPosts.filter(post => post.id !== deletedPostId),
    );
  };

  // Refresh posts when user pulls down
  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
    console.info('Latest posts refreshed at:', new Date().toLocaleTimeString());
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
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={posts}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <View>
            <PostListItem post={item} onPostDeleted={handlePostDeleted} />
          </View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
