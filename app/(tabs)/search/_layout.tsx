import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const SearchLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}}/>
      
    </Stack>
    
  )
}

export default SearchLayout