import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Profilelayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}}/>
      <Stack.Screen name="your-post" options={{ headerShown: false}}/>
      <Stack.Screen name="change-password" options={{ headerShown: false}}/>
    </Stack>
  )
}

export default Profilelayout