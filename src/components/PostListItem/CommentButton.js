import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment';

import styles from '../../assets/styles/HomeScreen.style';
import stylesCommentModal from '../../assets/styles/CommentModal.style';

import {
  createComment,
  getCommentsByPost,
} from '../../db-service/commentService';

import {getDBConnection} from '../../db-service/database';

const CommentButton = ({postId, userId}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  // Fetch comments when the modal opens
  const fetchComments = async () => {
    try {
      const db = await getDBConnection();
      const postComments = await getCommentsByPost(db, postId); // Assuming this function exists
      setComments(postComments);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to load comments.');
    }
  };

  // Open modal and fetch comments
  const openModal = () => {
    setModalVisible(true);
    fetchComments();
  };

  const handleBackgroundPress = () => setModalVisible(false);
  const handleModalPress = e => e.stopPropagation();

  const handlePostComment = async () => {
    if (commentText.trim() === '') {
      Alert.alert('Empty Comment', 'Please write something.');
      return;
    }

    try {
      const db = await getDBConnection();
      const createdAt = new Date().toISOString();
      await createComment(db, commentText, createdAt, postId, userId);

      setCommentText('');
      setModalVisible(false);
      fetchComments(); // Reload comments after posting a new one
      Alert.alert('Success', 'Comment posted!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to post comment.');
    }
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <SafeAreaProvider>
          <TouchableWithoutFeedback onPress={handleBackgroundPress}>
            <SafeAreaView style={stylesCommentModal.centeredView}>
              <View style={stylesCommentModal.overlay} />
              <TouchableWithoutFeedback onPress={handleModalPress}>
                <View style={stylesCommentModal.modalView}>
                  {/* Display Comments */}
                  <ScrollView style={stylesCommentModal.commentList}>
                    {comments.length === 0 ? (
                      <Text style={stylesCommentModal.noCommentsText}>
                        No comments yet
                      </Text>
                    ) : (
                      comments.map((comment, index) => (
                        <View
                          key={index}
                          style={stylesCommentModal.commentItem}>
                          {/* Name and Created At */}
                          <Text style={stylesCommentModal.commentUserName}>
                            {comment.user_name} •{' '}
                            {moment(comment.created_at).fromNow()}
                          </Text>

                          {/* Text */}
                          <Text style={stylesCommentModal.commentText}>
                            {comment.text}
                          </Text>
                        </View>
                      ))
                    )}
                  </ScrollView>

                  {/* Text Input for new comment */}
                  <TextInput
                    style={stylesCommentModal.textInput}
                    placeholder="Enter your comment..."
                    value={commentText}
                    onChangeText={setCommentText}
                    multiline
                  />
                  <TouchableOpacity
                    style={stylesCommentModal.submitButton}
                    onPress={handlePostComment}>
                    <Text style={stylesCommentModal.submitButtonText}>
                      Post
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </SafeAreaProvider>
      </Modal>

      <TouchableOpacity onPress={openModal}>
        <Ionicons
          style={styles.button}
          name="chatbubbles-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CommentButton;
