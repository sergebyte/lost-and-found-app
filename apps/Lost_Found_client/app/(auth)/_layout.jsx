import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AuthLayout = () => {
  return (
    <>
      <Stack initialRouteName="sign-in">
        <Stack.Screen 
          name='log-in'
          options = {{headerShown: false}}
        />
          
        <Stack.Screen 
          name='code-submission'
          options = {{headerShown: false}}
        />
      </Stack>

      <StatusBar />
    </>
  )
}

export default AuthLayout