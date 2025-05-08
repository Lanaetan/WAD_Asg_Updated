import React, {useState} from 'react';
import {TextInput, Alert, Modal, Pressable, View, TouchableOpacity, Text, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../assets/styles/HomeScreen.style';
import stylesCommentModal from '../../assets/styles/CommentModal.style';

const Button = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // Close modal when tapping outside of modal content
  const handleBackgroundPress = () => {
    setModalVisible(false);
  };

  // Prevent taps on modal content from closing the modal
  const handleModalPress = (e) => {
    e.stopPropagation();
  };

  return (
    <View>
      {/* Comment Modal */}
      <Modal
        animationType="slide" 
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <SafeAreaProvider>
          <TouchableWithoutFeedback onPress={handleBackgroundPress}>
            <SafeAreaView style={stylesCommentModal.centeredView}>
              {/* Dimmed background overlay */}
              <View style={stylesCommentModal.overlay} />
              
              {/* Modal content - TouchableWithoutFeedback stops propagation */}
              <TouchableWithoutFeedback onPress={handleModalPress}>
                <View style={stylesCommentModal.modalView}>
                  <Text style={stylesCommentModal.modalText}>
                    Hello World!
                    Hello World!
                    Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!Hello World!
                    Hello World!
                  </Text>
                  <TextInput
                    placeholder="Enter your caption..."
                  >
                    
                  </TextInput>
                </View>
              </TouchableWithoutFeedback>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </SafeAreaProvider>
      </Modal>

      {/* Button to open comment modal */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons
          style={styles.button}
          name={'chatbubbles-outline'}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Button;