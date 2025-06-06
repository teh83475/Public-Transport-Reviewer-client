import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const NewReviewlayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}}/>
      <Stack.Screen name="scan-camera" options={{ headerShown: false}}/>
      <Stack.Screen name="scan-result" options={{ headerShown: false}}/>
      <Stack.Screen name="location-track" options={{ headerShown: false}}/>
    </Stack>
  )
}

export default NewReviewlayout