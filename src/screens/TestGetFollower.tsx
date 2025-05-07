import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getFollowersById } from "../db-service/followerService";
import { getDBConnection } from "../db-service/database";
import { View, FlatList, Text } from "react-native";
import FollowerList from "../components/FollowerList";
import FollowerListItem from "../components/FollowerListItem";

const TestGetFollower = () => {
    const { user } = useAuth();
    const [followers, setFollowers] = useState<any>([]);

    useEffect(() => {
        if (user?.id) {
            handleGetFollowers();
        }
    }, [user?.id]);
    
    const handleGetFollowers = async () => {
        try {
            const results = await getFollowersById(await getDBConnection(), user.id);
            console.log("Fetched followers:", results); // single source of logging
            setFollowers(results);
        } catch (error) {
            console.error("Error fetching followers:", error);
        }
    };

    return (
        <View>
            <FlatList
                data={followers}
                renderItem={({ item }) => (
                    <View>
                        <View>
                            <Text>currentUser: {item.user_id}</Text>
                            <Text>follower: {item.follower_id}</Text>
                        </View>
                        <FollowerListItem follower={item} />
                    </View>
                    
                )}
            >

            </FlatList>
                

        
            {/* <FollowerList followers={followers} /> */}
        </View>
    )
}

export default TestGetFollower;