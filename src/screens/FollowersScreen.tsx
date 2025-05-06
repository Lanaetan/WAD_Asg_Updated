// screens/FollowersScreen.js
import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import SQLite from "react-native-sqlite-storage";
import { AuthContext } from "../contexts/AuthContext";

const db = SQLite.openDatabase({ name: "db.sqlite" });

const FollowersScreen = () => {
  const { user } = useContext(AuthContext); // current logged in user
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (user?.id) {
      loadFollowers(user.id);
    }
  }, [user]);

  const loadFollowers = (userId) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT users.id, users.username, users.name, users.image 
         FROM followers 
         JOIN users ON followers.follower_id = users.id 
         WHERE followers.user_id = ?`,
        [userId],
        (_, results) => {
          const rows = results.rows;
          let followersList = [];
          for (let i = 0; i < rows.length; i++) {
            followersList.push(rows.item(i));
          }
          setFollowers(followersList);
        },
        (err) => {
          console.log("Failed to load followers", err);
        }
      );
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Followers</Text>
      <FlatList
        data={followers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default FollowersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  itemContainer: { flexDirection: "row", marginBottom: 16, alignItems: "center" },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  username: { fontWeight: "bold", fontSize: 16 },
  name: { color: "gray" },
});
