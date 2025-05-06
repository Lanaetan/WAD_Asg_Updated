import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

class Post extends Component {
  render() {
    const { post } = this.props;
    
    return (
      <View style={styles.post}>
        {/* Post Header with User Info */}
        <View style={styles.postHeader}>
          <Image 
            source={{ uri: post.user.image_url }} 
            style={styles.userAvatar} 
          />
          <Text style={styles.username}>{post.user.username}</Text>
        </View>

        {/* Post Image */}
        <Image
          source={{ uri: post.image_url }}
          style={styles.postImage}
          resizeMode="cover"
        />

        {/* Action Buttons (Like, Comment, Share) */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>♥</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>↪</Text>
          </TouchableOpacity>
        </View>

        {/* Caption */}
        <View style={styles.captionContainer}>
          <Text style={styles.username}>{post.user.username}</Text>
          <Text style={styles.caption}>{post.caption}</Text>
        </View>
      </View>
    );
  }
}

class PostsPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      posts: [
        {
          "id": "1",
          "image": "samples/landscapes/beach-boat",
          "image_url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg",
          "caption": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?",
          "user": {
            "id": "u1",
            "avatar_url": "samples/people/boy-snow-hoodie",
            "image_url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg",
            "username": "vadimnotjustdev"
          }
        },
        {
          "id": "2",
          "image": "samples/woman-on-a-football-field",
          "image_url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/2.jpg",
          "caption": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?",
          "user": {
            "id": "u1",
            "avatar_url": "samples/people/smiling-man",
            "image_url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg",
            "username": "vadimnotjustdev"
          }
        },
        {
          "id": "3",
          "image": "samples/dessert-on-a-plate",
          "image_url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/3.jpg",
          "caption": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?",
          "user": {
            "id": "u1",
            "avatar_url": "samples/bike",
            "image_url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
            "username": "vadimnotjustdev"
          }
        },
        {
          "id": "4",
          "image": "samples/balloons",
          "image_url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/4.jpg",
          "caption": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?",
          "user": {
            "id": "u1",
            "avatar_url": "samples/animals/cat",
            "image_url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/4.jpg",
            "username": "vadimnotjustdev"
          }
        }
      ],
      isLoading: false,
      error: null
    };
  }

  // You could fetch posts from API instead of using hardcoded data
  // componentDidMount() {
  //   this.fetchPosts();
  // }
  // 
  // fetchPosts = async () => {
  //   this.setState({ isLoading: true });
  //   try {
  //     // Replace with your API call
  //     const response = await fetch('your-api-endpoint');
  //     const data = await response.json();
  //     this.setState({ 
  //       posts: data, 
  //       isLoading: false 
  //     });
  //   } catch (error) {
  //     this.setState({ 
  //       error: 'Failed to fetch posts', 
  //       isLoading: false 
  //     });
  //   }
  // }

  renderItem = ({ item }) => {
    return <Post post={item} />;
  }

  keyExtractor = (item) => item.id;

  renderSeparator = () => {
    return <View style={styles.separator} />;
  }

  render() {
    const { posts, isLoading, error } = this.state;

    if (isLoading) {
      return (
        <View style={styles.centered}>
          <Text>Loading posts...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centered}>
          <Text>{error}</Text>
          <TouchableOpacity onPress={this.fetchPosts}>
            <Text style={styles.retryButton}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  post: {
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 5,
  },
  postImage: {
    width: windowWidth,
    height: windowWidth,
  },
  actions: {
    flexDirection: 'row',
    padding: 10,
  },
  actionButton: {
    marginRight: 15,
  },
  actionIcon: {
    fontSize: 24,
  },
  captionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  caption: {
    flex: 1,
    fontSize: 14,
  },
  separator: {
    height: 10,
    backgroundColor: '#f0f0f0',
  },
  retryButton: {
    marginTop: 10,
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default PostsPage;