import React from 'react';
import {TouchableOpacity, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getDBConnection} from '../../db-service/database';
import {deletePost} from '../../db-service/postService';
import styles from '../../assets/styles/HomeScreen.style';

const DeleteButton = ({postId, userId, ownerId, onPostDeleted}) => {
  const handleDelete = async () => {
    if (userId !== ownerId) return;

    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const db = await getDBConnection();
              await deletePost(db, postId);
              onPostDeleted(postId);
              // Show success message
              Alert.alert(
                'Success',
                'Post deleted successfully',
                [{text: 'OK'}],
                {cancelable: false},
              );
              console.info("Post deleted successfully");
            } catch (error) {
              console.error('Error deleting post:', error);
              Alert.alert('Error', 'Failed to delete post');
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  // Only show delete button if user is the owner
  if (userId !== ownerId) return null;

  return (
    <TouchableOpacity onPress={handleDelete}>
      <Ionicons
        style={styles.button}
        name="trash-outline"
        size={24}
        color="red"
      />
    </TouchableOpacity>
  );
};

export default DeleteButton;
