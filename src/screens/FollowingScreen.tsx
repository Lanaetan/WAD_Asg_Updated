import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { getFollowersById, getFollowingById } from "../db-service/followerService";
import { getDBConnection } from "../db-service/database";
import FollowerListItem from "../components/FollowerListItem";

const FollowingScreen = ({route, navigation}: any) => {
    const {searchedUser} = route.params;
    const [following, setFollowing] = useState<any>([]);

    useEffect(() => {
        console.log('searched User: ', searchedUser);
        if (searchedUser?.id) {
            handleGetFollowing();
        }
    }, []);

     const handleGetFollowing = async () => {
            try {
                const results = await getFollowingById(await getDBConnection(), searchedUser.id);
                console.log("Fetched following:", results);
                setFollowing(results);
            } catch (error) {
                console.error("Error fetching following users:", error);
            }
        };

    return (
        <View>
            <FlatList
                data={following}
                renderItem={({ item }) => (
                    <View style={{paddingHorizontal: 15}}>
                        <FollowerListItem follower={item} />
                    </View>
                )}
            />
        </View>
    )
}

export default FollowingScreen;