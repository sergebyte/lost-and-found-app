import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router"; // Add useRouter for navigation
import genericAvatar from "../assets/icons/generic-avatar.png";
import phoneIcon from "../assets/icons/phone.png";
import homeIcon from "../assets/icons/home.png";
import atIcon from "../assets/icons/at-sign.png";

const ProfileDetail = () => {
  const router = useRouter(); // Initialize the router

  return (
    <LinearGradient colors={["#C3D6F9", "#F1FBFF"]} style={styles.container}>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.avatarContainer}>
            <Image source={genericAvatar} style={styles.avatar} />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Your Name</Text>
          </View>
          <View style={styles.infoContainer}>
            <Image source={phoneIcon} style={styles.icon} />
            <Text style={styles.infoText}>+373 XX XXX XXX</Text>
          </View>
          <View style={styles.infoContainer}>
            <Image source={homeIcon} style={styles.icon} />
            <Text style={styles.infoText}>Your Location</Text>
          </View>
          <View style={styles.infoContainer}>
            <Image source={atIcon} style={styles.icon} />
            <Text style={styles.infoText}>your.name@gmail.com</Text>
          </View>

          {/* Add Edit Profile Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Edit Profile"
              onPress={() => router.push("/edit-profile")} // Navigate to the edit screen
            />
            <Button title="Go Home" onPress={() => router.push("/welcome")} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "radial-gradient1",
  },
  body: {
    marginTop: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    width: 130,
    height: 130,
    borderRadius: 70,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
    borderWidth: 3,
    borderColor: "black",
  },
  avatar: {
    width: 120, // Increase the width
    height: 120, // Increase the height
    borderRadius: 90,
  },
  nameContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  infoLabel: {
    fontSize: 20,
    fontWeight: "600",
    color: "#666666",
    marginRight: 8,
  },
  infoText: {
    fontSize: 18,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  buttonContainer: {
    marginTop: 24,
  },
});

export default ProfileDetail;
