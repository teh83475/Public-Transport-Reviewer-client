import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Reviewslayout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false}}/>
      <Stack.Screen name="[id]" options={{ headerShown: false}}/>
    </Stack>
  )
}

export default Reviewslayout