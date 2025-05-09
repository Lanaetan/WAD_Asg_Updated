import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getDBConnection} from '../../db-service/database';
import {useAuth} from '../../contexts/AuthContext';
import {
  createLike,
  removeLike,
  hasUserLikedPost,
  countLikesByPost,
} from '../../db-service/likeService';

import styles from '../../assets/styles/HomeScreen.style';

const Button = ({postId}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const {user} = useAuth();

  // Check initial like status and count
  useEffect(() => {
    const initializeLikeStatus = async () => {
      if (user && postId) {
        const db = await getDBConnection();
        const hasLiked = await hasUserLikedPost(db, postId, user.id);
        const count = await countLikesByPost(db, postId);
        setIsLiked(hasLiked);
        setLikeCount(count);
      }
    };
    initializeLikeStatus();
  }, [postId, user]);

  const toggleLike = async () => {
    if (!user || !postId) return;

    try {
      const db = await getDBConnection();
      if (isLiked) {
        await removeLike(db, postId, user.id);
        setLikeCount(prev => prev - 1);
      } else {
        await createLike(db, postId, user.id);
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={toggleLike}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Ionicons
          style={styles.button}
          name={isLiked ? 'heart' : 'heart-outline'}
          size={24}
          color={isLiked ? '#ff0000' : 'black'}
        />
        <Text style={styles.count}>{likeCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
