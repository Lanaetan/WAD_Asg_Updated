import React, {useState, useEffect} from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import styles from '../../assets/styles/HomeScreen.style';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import {useAuth} from '../../contexts/AuthContext';

const PostListItem = ({post}) => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);
  const [imageDimensions, setImageDimensions] = useState(null);
  const [timeAgo, setTimeAgo] = useState('');
  const screenWidth = Dimensions.get('window').width - 52;

  // Get time ago text
  const getTimeAgo = dateString => {
    return moment(dateString).fromNow();
  };

  // Removing width and height parameters from image url
  const cleanImageUrl = url =>
    url ? url.replace(/w_\d+/, '').replace(/h_\d+/, '') : null;

  useEffect(() => {
    // Set initial time ago
    setTimeAgo(getTimeAgo(post.created_at));

    // Update time ago every 30 seconds
    const intervalId = setInterval(() => {
      setTimeAgo(getTimeAgo(post.created_at));
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, [post.created_at]);

  useEffect(() => {
    if (post.image) {
      const imageUrl = cleanImageUrl(post.image);
      Image.getSize(
        imageUrl,
        (width, height) => {
          setImageDimensions({width, height, ratio: width / height});
        },
        error => console.error('Error getting image size:', error),
      );
    }
  }, [post.image]);

  // Navigate to user profile when username is pressed
  const handleUsernamePress = () => {
    navigation.navigate('UserProfile', {
      searchedUser: {id: post.user_id, username: post.user_name},
    });
  };

  const imageUrl = cleanImageUrl(post.image);

  const imageStyle =
    imageUrl && imageDimensions
      ? {
          width: '100%',
          height: screenWidth / imageDimensions.ratio,
          aspectRatio: imageDimensions.ratio,
        }
      : {};

  return (
    <View style={styles.postCard}>
      {/* Post Header */}
      <View>
        <Text
          style={styles.caption}
          numberOfLines={isExpanded ? 0 : 4}
          onTextLayout={e => {
            if (e.nativeEvent.lines.length > 4 && !shouldShowToggle) {
              setShouldShowToggle(true);
            }
          }}>
          {post.caption}
        </Text>

        {shouldShowToggle && (
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={styles.readMoreText}>
              {isExpanded ? 'See less' : 'See more'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Post Image Container */}
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image
            source={{uri: imageUrl}}
            style={[styles.postImage, imageStyle]}
            resizeMode="contain"
            onError={e =>
              console.log('Image loading error:', e.nativeEvent.error)
            }
          />
        ) : (
          <Text style={styles.noImageText}>No image available</Text>
        )}
      </View>

      {/* Post Footer */}
      <View style={styles.footer}>
        <View style={styles.ButtonTab}>
          <LikeButton></LikeButton>
          {user && <CommentButton postId={post.id} userId={user.id} />}
        </View>
        <View style={styles.userInfo}>
          <TouchableOpacity
            onPress={handleUsernamePress}
            style={styles.userRow}>
            <Text style={styles.username}>Posted by {post.user_name}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.timeInfo}>{timeAgo}</Text>
      </View>
    </View>
  );
};

export default PostListItem;
