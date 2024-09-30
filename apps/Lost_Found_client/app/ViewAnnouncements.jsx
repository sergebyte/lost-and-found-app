import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

export default function ViewAnnouncements() {
  const [locationPermission, setLocationPermission] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const mapRef = useRef(null); // Ref for the MapView

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationPermission(true);
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords); // Set the current user location
        fetchAnnouncements(); // Fetch announcements after getting user location
      } else {
        setLocationPermission(false);
        Alert.alert(
          "Permission Denied",
          "Location permission is required to use this feature."
        );
      }
    })();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("http://localhost:3000/announcements"); // Replace with your backend URL
      setAnnouncements(response.data); // Assume the response contains an array of announcements with coordinates
    } catch (error) {
      console.error("Error fetching announcements:", error);
      Alert.alert(
        "Error",
        "There was an error fetching announcements. Please try again."
      );
    }
  };

  const recenterMap = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userLocation?.latitude || 37.78825, // Default to some location
          longitude: userLocation?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locationPermission && userLocation && (
          <>
            {/* User location marker */}
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="You are here"
              description="Your current location"
            />
            {/* Announcement markers */}
            {announcements.map((announcement, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: announcement.location[1], // Extract latitude from the second element of the array
                  longitude: announcement.location[0], // Extract longitude from the first element of the array
                }}
                title={announcement.title} // Assuming there's a title field
                description={announcement.description} // Assuming there's a description field
              />
            ))}
          </>
        )}
      </MapView>

      {/* Recenter Button */}
      <TouchableOpacity style={styles.recenterButton} onPress={recenterMap}>
        <Text style={styles.recenterButtonText}>Recenter</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recenterButton: {
    position: "absolute",
    bottom: 50,
    left: 20,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  recenterButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
