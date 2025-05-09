import React, { useCallback, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Button, TouchableOpacity, FlatList } from 'react-native';
import PostList from '../components/PostList'; 
import { useAuth } from '../contexts/AuthContext';
import { getUserById } from '../db-service/userService';
import { getDBConnection } from '../db-service/database';
import { countFollowers, countFollowing } from '../db-service/followerService';
import { countPosts, getPostsByUser } from '../db-service/postService';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation }: any) => {
  const { user, loading } = useAuth();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [posts, setPosts] = useState<any>([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postCount, setPostCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchUserDetails = async () => {
        if (user) {
          try {
            const db = await getDBConnection();

            const [userData, postsData, followers, following, postCount] = await Promise.all([
              getUserById(db, user.id),
              getPostsByUser(db, user.id),
              countFollowers(db, user.id),
              countFollowing(db, user.id),
              countPosts(db, user.id),
            ]);    
            setUserDetails(userData);
            setPosts(postsData);
            setFollowerCount(followers);
            setFollowingCount(following);
            setPostCount(postCount);
          } catch (error) {
            console.error('Failed to fetch user details:', error);
          }
        }
      };
      fetchUserDetails();
    }, [user])
  );

  if (loading || !userDetails) {
    return <ActivityIndicator size="large" color="#0095f6" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperProfileContainer}>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>@{userDetails.username}</Text>
        </View>

        <View style={styles.profileRow}>
          <Image style={styles.profileImage} source={{ uri: userDetails.image }} />
          <View style={styles.profileInfoContainer}>
            <Text style={styles.name}>{userDetails.name}</Text>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{postCount}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>

              <TouchableOpacity
                style={styles.statBox}
                onPress={() => navigation.navigate('Followers', { searchedUser: user, viewMode: 'followers' })}
              >
                <Text style={styles.statNumber}>{followerCount}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.statBox}
                onPress={() => navigation.navigate('Followers', { searchedUser: user, viewMode: 'following' })}
              >
                <Text style={styles.statNumber}>{followingCount}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.bioContainer}>
          <Text style={styles.bio}>{userDetails.bio}</Text>
        </View>

        <View style={styles.editButtonContainer}>
          <Button
            title="Edit Profile"
            onPress={() => navigation.navigate('EditProfile')}
          />
        </View>
      </View>

      <PostList posts={posts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
  },
  upperProfileContainer: {
    padding: 20,
  },
  usernameContainer: {
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 15,
  },
  profileInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 13,
    color: '#999',
  },
  bioContainer: {
    marginVertical: 10,
  },
  bio: {
    fontSize: 14,
    color: '#666',
  },
  editButtonContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  loader: {
    marginTop: 50,
  },
});

export default ProfileScreen;
