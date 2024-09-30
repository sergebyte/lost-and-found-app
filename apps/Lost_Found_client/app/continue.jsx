import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Button,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import debounce from "lodash.debounce";
import { useRouter } from "expo-router";

export default function ContinuePage() {
  const router = useRouter(); // Initialize navigation
  const [locationPermission, setLocationPermission] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedLocation, setSearchedLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [searchResults, setSearchResults] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationPermission(true);
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      } else {
        setLocationPermission(false);
        Alert.alert(
          "Permission Denied",
          "Location permission is required to use this feature."
        );
      }
    })();
  }, []);

  // Function to fetch places based on search query
  async function getPlaces(query) {
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
        {
          params: {
            access_token:
              "pk.eyJ1IjoiY3Jpc3RpYnVsYXQiLCJhIjoiY20xNWNhbnZkMDZtdzJycXZoOHpxYTlkbSJ9.HhGmVWTMZa9r1-dOL0RPXQ",
          },
        }
      );
      if (response.data?.features.length === 0) {
        Alert.alert("No Results", "No locations found for your search.");
        setSearchResults([]);
      } else {
        setSearchResults(response.data.features);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      Alert.alert(
        "Error",
        "There was an error while fetching places. Please try again."
      );
      setSearchResults([]);
    }
  }

  // Create a debounced version of the getPlaces function
  const debouncedGetPlaces = useCallback(debounce(getPlaces, 500), []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    debouncedGetPlaces(query); // Use the debounced function
  };

  const handleSearchPress = async () => {
    await getPlaces(searchQuery);
  };

  const handleSelectLocation = (location) => {
    if (!location || !location.center) {
      Alert.alert("Invalid Location", "Please select a valid location.");
      return;
    }

    const [longitude, latitude] = location.center;
    setSearchedLocation({ latitude, longitude });
    setSearchQuery(location.place_name);
    setSearchResults([]);

    // Move the map to the selected location
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  };

  const handleMarkerDrag = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSearchedLocation({ latitude, longitude });
  };

  const recenterMap = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000
      );
    }
  };

  const handleSubmit = async () => {
    if (!searchedLocation.latitude || !searchedLocation.longitude) {
      Alert.alert(
        "No Location Selected",
        "Please select a location before submitting."
      );
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/announcements/update-location`, // Ensure the endpoint is correct
        {
          latitude: searchedLocation.latitude,
          longitude: searchedLocation.longitude,
        }
      );

      if (response.status === 200) {
        // Check for a successful response
        Alert.alert("Success", "Location submitted successfully!");
        router.push("../welcome");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error submitting location:", error);
      if (error.response && error.response.status === 404) {
        Alert.alert(
          "Error",
          "No announcements without location found. Try creating a new announcement."
        );
      } else {
        Alert.alert(
          "Error",
          "There was an error submitting your location. Please try again."
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {searchedLocation.latitude && searchedLocation.longitude && (
            <>
              <Marker
                coordinate={{
                  latitude: searchedLocation.latitude,
                  longitude: searchedLocation.longitude,
                }}
                draggable
                onDragEnd={handleMarkerDrag}
              />
              <Circle
                center={{
                  latitude: searchedLocation.latitude,
                  longitude: searchedLocation.longitude,
                }}
                radius={100}
                strokeWidth={2}
                strokeColor="rgba(0, 0, 255, 0.5)"
                fillColor="rgba(0, 0, 255, 0.1)"
              />
            </>
          )}
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="You are here"
            pinColor="blue"
          />
        </MapView>
      )}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a location"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        <Button title="Search" onPress={handleSearchPress} />
      </View>

      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleSelectLocation(item)}
            >
              <Text>{item.place_name}</Text>
            </TouchableOpacity>
          )}
          style={styles.resultsList}
        />
      )}

      <TouchableOpacity style={styles.recenterButton} onPress={recenterMap}>
        <Text style={styles.recenterButtonText}>Recenter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Location</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  resultsList: {
    position: "absolute",
    top: 60,
    left: 10,
    right: 10,
    backgroundColor: "white",
    maxHeight: 200,
    elevation: 5,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
  submitButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  submitButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
