import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { getFollowersById, getFollowingById } from "../db-service/followerService";
import { getDBConnection } from "../db-service/database";
import FollowerListItem from "../components/FollowerListItem";

const FollowingScreen = ({route, navigation}: any) => {
    const {searchedUser, viewMode} = route.params;
    const [followers, setFollowers] = useState<any>([]);

    useEffect(() => {
        console.log('searched User: ', searchedUser);
        // choose database operation depending on the viewMode
        if (viewMode == 'followers') {
            handleGetFollowers();
        } else {
            handleGetFollowing();
        }
    }, []);

     const handleGetFollowers = async () => {
        try {
            const results = await getFollowersById(await getDBConnection(), searchedUser.id);
            console.log("Fetched followers:", results);
            setFollowers(results);
        } catch (error) {
            console.error("Error fetching followers:", error);
        }
    };

    const handleGetFollowing = async () => {
        try {
            const results = await getFollowingById(await getDBConnection(), searchedUser.id);
            console.log("Fetched following:", results);
            setFollowers(results);
        } catch (error) {
            console.error("Error fetching following users:", error);
        }
    };

    return (
        <View>
            <FlatList
                data={followers}
                renderItem={({ item }) => (
                    <View style={{paddingHorizontal: 15}}>
                        <FollowerListItem follower={item} viewMode={viewMode} />
                    </View>
                )}
            />
        </View>
    )
}

export default FollowingScreen;