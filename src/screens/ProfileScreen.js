import React, { useCallback, useEffect, useState } from "react";
import {Text, View, Image, StyleSheet} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getDBConnection } from "../db-service/database";
import { countFollowers, countFollowing, createFollower, deleteFollower, isUserFollowing } from "../db-service/followerService";
import { useAuth } from "../contexts/AuthContext";

const UserProfileScreen = ({route, navigation}) => {
    const { user } = useAuth();
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    

    const fetchData = async () => {
      try {
        const db = await getDBConnection();
  
        const [followers, following] = await Promise.all([
          countFollowers(db, user.id),
          countFollowing(db, user.id),
        ]);

        setFollowerCount(followers);
        setFollowingCount(following);
      } catch (error) {
        console.error("Error in fetching user data", error);
      }
    };

    useEffect(()=>{
        fetchData();
    },[])
    
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Image
                source={{ uri: user.image }}
                style={styles.profileImage}
                resizeMode="cover"  // You can also use 'contain' or 'stretch'
            />
            <Text>{user.username}</Text>
            <Text>{user.bio}</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity 
                style={styles.follow}
                onPress={()=>{navigation.navigate("Followers", {searchedUser: user, viewMode: 'followers'})}}
            >
                <Text>{followerCount}</Text>
                <Text>Followers</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.follow}
                onPress={()=>{navigation.navigate("Followers", {searchedUser: user, viewMode: 'following'})}}
            >
                <Text>{followingCount}</Text>
                <Text>Following</Text>
              </TouchableOpacity>
            </View>
        </View>
    )
}

export default UserProfileScreen;

const styles = StyleSheet.create({
    profileImage: {
      width: 200,  // Set a width for the image
      height: 200, // Set a height for the image
      borderRadius: 200, // Make the image round
      marginBottom: 10,
    },
    follow: {
      padding: 10,
    }
});