import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const SummaryLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  )
}

export default SummaryLayout