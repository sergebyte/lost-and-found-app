import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const LostScreen = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null);
  const [phoneError, setPhoneError] = useState("");

  // Phone number validation
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{9}$/;
    return phoneRegex.test(number);
  };

  const handlePhoneChange = (text) => {
    const cleanedText = text.replace(/\D/g, "");
    setPhoneNumber(cleanedText);

    if (cleanedText.length === 9) {
      if (validatePhoneNumber(cleanedText)) {
        setPhoneError("");
      } else {
        setPhoneError("Invalid phone number");
      }
    } else {
      setPhoneError("Phone number must be 9 digits");
    }
  };

  // Image picker for selecting an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Image picker for taking a photo
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Form submission handler
  const handleContinuePress = async () => {
    if (!description || !phoneNumber || phoneError) {
      Alert.alert(
        "Error",
        "Please fill in all fields correctly before continuing."
      );
      return;
    }

    try {
      const announcementData = {
        type: "lost",
        description,
        phoneNumber,
        image: image
          ? { uri: image, type: "image/jpeg", name: "photo.jpg" }
          : null,
      };

      // Send the form data with multipart/form-data headers
      const response = await axios.post(
        "http://localhost:3000/announcements",
        announcementData
      );

      const announcementId = response.data.id;

      router.push({
        pathname: "../continue",
        query: { announcementId },
      });
    } catch (error) {
      console.error("Error submitting announcement:", error);

      // If the error has a response (validation or server-side)
      if (error.response && error.response.status === 400) {
        Alert.alert(
          "Validation Error",
          "The announcement could not be submitted. Please check your inputs."
        );
      } else {
        Alert.alert(
          "Error",
          "Failed to submit the announcement. Please try again."
        );
      }
    }
  };

  return (
    <LinearGradient colors={["#C3D6F9", "#F1FBFF"]} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Lost Item Report</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Describe the item you lost..."
            value={description}
            onChangeText={setDescription}
            style={styles.textInput}
            multiline
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Phone Number (9 digits)"
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            style={styles.phoneInput}
            keyboardType="phone-pad"
            maxLength={9}
          />
          {phoneError ? (
            <Text style={styles.errorText}>{phoneError}</Text>
          ) : null}
        </View>

        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={takePhoto}>
            <FontAwesome name="camera" size={32} color="#007BFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
            <FontAwesome name="image" size={32} color="#007BFF" />
          </TouchableOpacity>
        </View>

        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

        <TouchableOpacity
          onPress={handleContinuePress}
          style={styles.continueContainer}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  textInput: {
    fontSize: 16,
    color: "#333",
    height: 120,
    textAlignVertical: "top",
    padding: 16,
  },
  phoneInput: {
    fontSize: 16,
    color: "#333",
    padding: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 16,
    marginBottom: 8,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  iconButton: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginTop: 20,
    borderRadius: 10,
  },
  continueContainer: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
  },
  continueText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
});

export default LostScreen;
