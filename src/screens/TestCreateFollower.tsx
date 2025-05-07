import React, { useState } from "react";
import { View, Text, Alert, Pressable, TextInput, StyleSheet } from "react-native";
import { createFollower } from "../db-service/followerService";
import { getDBConnection } from "../db-service/database";
import { useAuth } from "../contexts/AuthContext";

const TestCreateFollower = () => {
    const { user } = useAuth();
    const [followerID, setFollowerID] = useState<string>("");

    const handleCreateFollower = async () => {
        try {
            const db = await getDBConnection();
            await createFollower(db, user.id, followerID);
            Alert.alert("Success", "Follower added!");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to save follower");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter id to follow"
                onChangeText={setFollowerID}
                value={followerID}
                keyboardType="numeric"
            />
            <Pressable style={styles.button} onPress={handleCreateFollower}>
                <Text style={styles.buttonText}>Add Follower</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default TestCreateFollower;
