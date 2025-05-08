import React, { useCallback, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Button, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getUserById } from '../db-service/userService';
import { getDBConnection } from '../db-service/database';
import { countFollowers, countFollowing } from '../db-service/followerService';
import { countPosts } from '../db-service/postService';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation }: any) => {
  const { user, loading } = useAuth();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postCount, setPostCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchUserDetails = async () => {
        if (user) {
          try {
            const db = await getDBConnection();
            const userData = await getUserById(db, user.id);
            setUserDetails(userData);

            const [followers, following, posts] = await Promise.all([
              countFollowers(db, user.id),
              countFollowing(db, user.id),
              countPosts(db, user.id),
            ]);
            setFollowerCount(followers);
            setFollowingCount(following);
            setPostCount(posts);
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
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 20,
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
    fontSize: 16,
    color: '#666',
  },
  editButtonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  loader: {
    marginTop: 50,
  },
});

export default ProfileScreen;
