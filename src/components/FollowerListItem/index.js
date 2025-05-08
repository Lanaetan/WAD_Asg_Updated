import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getFollowersById } from "../db-service/followerService";
import { getDBConnection } from "../../db-service/database";
import { Pressable, View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { getUserById } from "../../db-service/userService";
import { useNavigation } from "@react-navigation/native";

const FollowerListItem = ({follower, viewMode}) => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [followerData, setFollowerData] = useState(null);

    useEffect(() => {
        if (viewMode == 'followers') {
            handleGetFollowers();
        } else {
            handleGetFollowing();
        }
    }, []);
    
    const handleGetFollowers = async () => {
        try {
            const result = await getUserById(await getDBConnection(), follower.follower_id);
            console.log("Fetched follower:", result); 
            setFollowerData(result);
        } catch (error) {
            console.error("Error fetching follower:", error);
        }
    };

    const handleGetFollowing = async () => {
        try {
            const result = await getUserById(await getDBConnection(), follower.user_id);
            console.log("Fetched following:", result); 
            setFollowerData(result);
        } catch (error) {
            console.error("Error fetching following:", error);
        }
    };
    
    // Make sure `followerData` is not null before rendering the username
    if (!followerData) {
        return <Text>Loading...</Text>; // Optionally show loading state
    }

    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate("UserProfile", { searchedUser: followerData })}> 
            <View style={styles.content}>
                <View>
                    <Image 
                        source={{ uri: followerData.image || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' }} 
                        style={styles.image} 
                    />
                </View>
                <View>
                    <Text style={styles.item}>{followerData.username}</Text>
                    <Text style={styles.item}>{followerData.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default FollowerListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: 'lightgrey',
  },
  item: {
    fontSize: 16,
    marginVertical: 6,
    paddingHorizontal: 15,
  },
  content: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 40,
  }
});
