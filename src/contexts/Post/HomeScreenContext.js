// hooks/usePostData.js
import { useState, useEffect } from 'react';
import { Image, Alert } from 'react-native';
import { getDBConnection } from '../../db-service/database';
import { getPosts } from '../../db-service/postService';
import { getUserById } from '../../db-service/userService';
import { useAuth } from '../AuthContext';

const usePostData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({});

  const { user } = useAuth();
  const currentUserId = user?.id;

  // Fetch user name by ID
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

  // Format date to local string
  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  // Get image dimensions (to properly resize it)
  const getImageDimensions = (imageUrl, postId) => {
    if (!imageUrl || imageDimensions[postId]) return;
    Image.getSize(
      imageUrl,
      (width, height) => {
        setImageDimensions(prev => ({
          ...prev,
          [postId]: { width, height, ratio: width / height }
        }));
      },
      (error) => console.error('Error getting image size:', error)
    );
  };

  // Removing width and height parameters from image url
  const cleanImageUrl = (url) =>
    url ? url.replace(/w_\d+/, '').replace(/h_\d+/, '') : null;

  // Fetch posts from the database
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const db = await getDBConnection();
      const postsData = await getPosts(db, currentUserId);
      const postsWithUserNames = await Promise.all(
        postsData.map(async (post) => ({
          ...post,
          user_name: await fetchUserName(post.user_id),
        }))
      );
      setPosts(postsWithUserNames);

      // Get image dimensions for each post
      postsWithUserNames.forEach(post => {
        if (post.image) getImageDimensions(cleanImageUrl(post.image), post.id);
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to load posts.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Refresh posts when user pulls down
  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, [currentUserId]);

  return {
    posts,
    loading,
    refreshing,
    imageDimensions,
    onRefresh,
    formatDate,
    cleanImageUrl,
  };
};

export default usePostData;
