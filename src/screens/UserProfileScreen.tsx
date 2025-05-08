import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { getDBConnection } from "../db-service/database";
import {
  countFollowers,
  countFollowing,
  createFollower,
  deleteFollower,
  isUserFollowing,
} from "../db-service/followerService";
import { useAuth } from "../contexts/AuthContext";

const UserProfileScreen = ({ route, navigation }: any) => {
  const { user } = useAuth();
  const searchedUser = route.params.searchedUser;
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const db = await getDBConnection();
      const [followStatus, followers, following] = await Promise.all([
        isUserFollowing(db, searchedUser.id, user.id),
        countFollowers(db, searchedUser.id),
        countFollowing(db, searchedUser.id),
      ]);

      setIsFollowing(followStatus);
      setFollowerCount(followers);
      setFollowingCount(following);
    } catch (error) {
      console.error("Error fetching user data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = useCallback(async () => {
    try {
      const db = await getDBConnection();
      if (isFollowing) {
        await deleteFollower(db, searchedUser.id, user.id);
      } else {
        await createFollower(db, searchedUser.id, user.id);
      }
      setIsFollowing(!isFollowing);
      await fetchData(); // Refresh data after action
    } catch (error) {
      console.error("Follow/Unfollow failed", error);
    }
  }, [isFollowing, user.id, searchedUser.id]);

  useEffect(() => {
    fetchData();
  }, [searchedUser.id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0095f6" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>@{searchedUser.username}</Text>
      </View>

      <View style={styles.profileRow}>
        <Image style={styles.profileImage} source={{ uri: searchedUser.image }} />
        <View style={styles.profileInfoContainer}>
          <Text style={styles.name}>{searchedUser.name || searchedUser.username}</Text>

          <View style={styles.statsRow}>
            <TouchableOpacity
              style={styles.statBox}
              onPress={() =>
                navigation.navigate("Followers", {
                  searchedUser,
                  viewMode: "followers",
                })
              }
            >
              <Text style={styles.statNumber}>{followerCount}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.statBox}
              onPress={() =>
                navigation.navigate("Followers", {
                  searchedUser,
                  viewMode: "following",
                })
              }
            >
              <Text style={styles.statNumber}>{followingCount}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bioContainer}>
        <Text style={styles.bio}>{searchedUser.bio}</Text>
      </View>

      {searchedUser.id !== user.id && (
        <View style={styles.followButtonContainer}>
          <TouchableOpacity
            onPress={handleFollowToggle}
            style={[
              styles.followButton,
              { backgroundColor: isFollowing ? "white" : "#0095f6", borderWidth: 1, borderColor: "#0095f6" },
            ]}
          >
            <Text style={{ color: isFollowing ? "#0095f6" : "white" }}>
              {isFollowing ? "Unfollow" : "Follow"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    
  },
  usernameContainer: {
   
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    color: "#666",
    fontWeight: "bold",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ddd",
    marginRight: 15,
  },
  profileInfoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "center", // Center both stat boxes
  },
  statBox: {
    alignItems: "center",
    marginHorizontal: 20, // Space between boxes
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 13,
    color: "#999",
  },
  bioContainer: {
    marginVertical: 10,
  },
  bio: {
    fontSize: 16,
    color: "#666",
  },
  followButtonContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  followButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  loader: {
    marginTop: 50,
  },
});
