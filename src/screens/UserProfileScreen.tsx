import React, { useCallback, useEffect, useState } from "react";
import {Text, View, Image, StyleSheet} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getDBConnection } from "../db-service/database";
import { countFollowers, countFollowing, createFollower, deleteFollower, isUserFollowing } from "../db-service/followerService";
import { useAuth } from "../contexts/AuthContext";

const UserProfileScreen = ({route, navigation}: any) => {
    const { user } = useAuth();
    const searchedUser = route.params.searchedUser;
    const [isFollowing, setIsFollowing] = React.useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    

    const fetchData = async () => {
      try {
        const db = await getDBConnection();
  
        const [followStatus, followers, following] = await Promise.all([
          isUserFollowing(db, searchedUser.id, user.id),   // user is checking if they follow searchedUser
          countFollowers(db, searchedUser.id),
          countFollowing(db, searchedUser.id),
        ]);
    
        setIsFollowing(followStatus);
        setFollowerCount(followers);
        setFollowingCount(following);
      } catch (error) {
        console.error("Error in fetching user data", error);
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
        await fetchData(); // re-fetch updated counts and status
      } catch (error) {
        console.error("Follow/Unfollow failed", error);
      }
    }, [isFollowing, user.id, searchedUser.id]);

    useEffect(() => {
      fetchData();
  }, [searchedUser.id]);
    
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Image
                source={{ uri: searchedUser.image }}
                style={styles.profileImage}
                resizeMode="cover" 
            />
            <Text>{searchedUser.username}</Text>
            <Text>{searchedUser.bio}</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity 
                style={styles.follow}
                onPress={() => {
                  navigation.navigate("Followers", { searchedUser: searchedUser, viewMode: 'followers' });
              }}
              >
                <Text>{followerCount}</Text>
                <Text>Followers</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.follow}
                onPress={() => {
                  navigation.navigate("Followers", { searchedUser: searchedUser, viewMode: 'following' });
              }}
              >
                <Text>{followingCount}</Text>
                <Text>Following</Text>
              </TouchableOpacity>
            </View>

            {searchedUser.id === user.id ? null : (
              <TouchableOpacity
                onPress={handleFollowToggle}
                style={{
                  backgroundColor: isFollowing ? 'white' : 'skyblue',
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: isFollowing ? 'skyblue' : 'white' }}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </Text>
              </TouchableOpacity>
            )}
        </View>
    )
}

export default UserProfileScreen;

const styles = StyleSheet.create({
    profileImage: {
      width: 200,  
      height: 200, 
      borderRadius: 200,
      marginBottom: 10,
    },
    follow: {
      padding: 10,
    }
});