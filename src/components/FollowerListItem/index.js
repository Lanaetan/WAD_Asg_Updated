import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { getDBConnection } from "../../db-service/database";
import { getUserById } from "../../db-service/userService";
import styles from "./styles";

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