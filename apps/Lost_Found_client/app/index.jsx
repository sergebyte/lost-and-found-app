import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const router = useRouter();

  const checkAuthStatus = async () => {
    setIsCheckingAuth(true); // Show loader while checking authentication
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        router.replace('/(auth)/log-in'); // Redirect to home page if logged in
      } else {
        router.replace('/(auth)/log-in'); // Redirect to login if not logged in
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      router.replace('/(auth)/log-in'); // Fallback to login on error
    } finally {
      setIsCheckingAuth(false); // Hide loader after check
    }
  };

  if (isCheckingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Welcome to the App!</Text>
      <Button title="Continue" onPress={checkAuthStatus} />
    </View>
  );
};