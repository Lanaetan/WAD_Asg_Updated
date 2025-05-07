import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getFollowersById } from "../db-service/followerService";
import { getDBConnection } from "../db-service/database";
import { Pressable, View, Text, FlatList } from "react-native";

const FollowerList = ({followers}) => {
    const { user } = useAuth();

    
    return (
        <View>
            <FlatList 
                data={followers}
                renderItem={(item)=>{
                    <Pressable>
                        <Text>{item.id}</Text>
                    </Pressable>
                }}
            />
        </View>
    );
}

export default FollowerList;