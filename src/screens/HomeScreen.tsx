import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import usePostData from '../contexts/Post/HomeScreenContext';
import styles from '../assets/styles/HomeScreen.style';

const HomeScreen = () => {
  const {
    posts,
    loading,
    refreshing,
    imageDimensions,
    onRefresh,
    formatDate,
    cleanImageUrl,
  } = usePostData();

  const screenWidth = Dimensions.get('window').width - 52;

  const renderItem = ({ item }: any) => {
    const imageUrl = cleanImageUrl(item.image);
    const postDimensions = imageDimensions[item.id];

    const imageStyle = imageUrl
      ? {
          width: '100%',
          height: postDimensions
            ? screenWidth / postDimensions.ratio
            : undefined,
          aspectRatio: postDimensions?.ratio,
        }
      : {};

    return (
      // Post Card
      <View style={styles.postCard}>
        {/* Post Header */}
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.postInfo}>Posted by: {item.user_name}</Text>
        <Text style={styles.postInfo}>Created at: {formatDate(item.created_at)}</Text>
        
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
            // Placeholder for no image 
            // Maybe image was deleted or is currently not available
            <Text style={styles.noImageText}>No image available</Text>
          )}
        </View>
      </View>
    );
  };

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
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
