import React, { useCallback, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Button } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getUserById } from '../db-service/userService';
import { getDBConnection } from '../db-service/database';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ navigation }: any) => {
  const { user, loading } = useAuth();
  const [userDetails, setUserDetails] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchUserDetails = async () => {
        if (user) {
          try {
            const db = await getDBConnection();
            const userData = await getUserById(db, user.id);
            setUserDetails(userData);
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
              <Text style={styles.statNumber}>120</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>500</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>180</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
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
    fontWeight: 'bold'
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
    marginHorizontal: 5,
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
