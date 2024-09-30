import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // For navigation
import { LinearGradient } from 'expo-linear-gradient';

const EditProfile = () => {
  const router = useRouter();

  // State variables to hold the form data (you can prefill these with existing data)
  const [name, setName] = useState('Your Name');
  const [phone, setPhone] = useState('+373 XX XXX XXX');
  const [location, setLocation] = useState('Your Location');
  const [email, setEmail] = useState('your.name@gmail.com');

  // Function to handle form submission
  const handleSubmit = () => {
    // Here you would typically send the updated data to a backend or update local state
    console.log({ name, phone, location, email });
    
    // For now, we'll just display an alert
    Alert.alert('Profile Updated', 'Your profile has been successfully updated.');

    // After updating, navigate back to the profile page
    router.push('/profile');
  };

  return (
    <LinearGradient
    colors={['#C3D6F9', '#F1FBFF']}
      style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* Input field for name */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      {/* Input field for phone */}
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* Input field for location */}
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      {/* Input field for email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Button to save changes */}
      <Button title="Save Changes" onPress={handleSubmit} />
    </View>
    </LinearGradient>
  );
};

// Styles for the Edit Profile screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "white"
  },
});

export default EditProfile;
