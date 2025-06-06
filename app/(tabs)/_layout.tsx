import { View, Text } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { TINT_COLOR, DEFAULT_COLOR } from '@/constants/Colors';


const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: TINT_COLOR,
        tabBarInactiveTintColor: DEFAULT_COLOR,
        tabBarStyle: {
        }
      }}
    >
      <Tabs.Screen
        name="reviews"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons name="home-outline" size={32} color={focused? TINT_COLOR : DEFAULT_COLOR}/>
          )
        }}
      />
       <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons name="search-outline" size={32} color={focused? TINT_COLOR : DEFAULT_COLOR}/>
          )
        }}
      />
      <Tabs.Screen
        name="new-review"
        options={{
          title: 'New Review',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons name="add" size={32} color={focused? TINT_COLOR : DEFAULT_COLOR}/>
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons name="person-outline" size={32} color={focused? TINT_COLOR : DEFAULT_COLOR}/>
          )
        }}
      />
      
    </Tabs>
  )
}

export default TabsLayout