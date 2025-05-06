import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri:
              user?.image ||
              "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.username || "User Name"}</Text>
        <Text style={styles.email}>{user?.email || "email@example.com"}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>129</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>88</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>34</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="create-outline" size={18} color="white" />
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => console.log("Sign Out")}>
        <Ionicons name="exit-outline" size={18} color="white" />
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: "Anta-Regular",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "gray",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "gray",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "skyblue",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontFamily: "Anta-Regular",
  },
});
