import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const router = useRouter();
  const [locationPermission, setLocationPermission] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null); // Ref for the MapView

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermission(true);
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords); // Set the current user location
      } else {
        setLocationPermission(false);
        Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
      }
    })();
  }, []);

  const recenterMap = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000);
    }
  };

  const handleViewAnnouncementsPress = () => {
    router.push('../ViewAnnouncements'); // Navigate to the "ViewAnnouncements" page
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
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="You are here"
            description="Your current location"
          />
        )}
      </MapView>

      {/* Recenter Button */}
      <TouchableOpacity style={styles.recenterButton} onPress={recenterMap}>
        <Text style={styles.recenterButtonText}>Recenter</Text>
      </TouchableOpacity>

      {/* View Announcements Button */}
      <TouchableOpacity style={styles.viewAnnouncementsButton} onPress={handleViewAnnouncementsPress}>
        <Text style={styles.viewAnnouncementsButtonText}>View Announcements</Text>
      </TouchableOpacity>

      {/* Avatar Container */}
      <TouchableOpacity style={styles.avatarContainer} onPress={() => router.push('/profile')}>
        <Image
          source={require('../../assets/icons/generic-avatar.png')} // Update with your avatar image path
          style={styles.avatar}
        />
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
    position: 'absolute',
    bottom: 50,
    left: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  recenterButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewAnnouncementsButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  viewAnnouncementsButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  avatarContainer: {
    position: 'absolute',
    top: 55,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'black',
    zIndex: 1,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
});
