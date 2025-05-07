import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getFollowersById } from "../db-service/followerService";
import { getDBConnection } from "../../db-service/database";
import { Pressable, View, Text, FlatList } from "react-native";
import { getUserById } from "../../db-service/userService";

const FollowerListItem = ({follower}) => {
    const { user } = useAuth();
    const [followerData, setFollowerData] = useState(null);

    useEffect(() => {
        if (user?.id) {
            handleGetFollower();
        }
    }, [user?.id]);
    
    const handleGetFollower = async () => {
        try {
            const result = await getUserById(await getDBConnection(), follower.follower_id);
            console.log("Fetched follower:", result); 
            setFollowerData(result);
        } catch (error) {
            console.error("Error fetching follower:", error);
        }
    };
    
    // Make sure `followerData` is not null before rendering the username
    if (!followerData) {
        return <Text>Loading...</Text>; // Optionally show loading state
    }

    return (
        <View>
            <Text>{followerData.username}</Text>
            {/* You can render other fields too */}
            <Text>{followerData.name}</Text>
            <Text>{followerData.bio}</Text>
        </View>
    );
}

export default FollowerListItem;