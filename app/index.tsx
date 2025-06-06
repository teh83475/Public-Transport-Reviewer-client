import { Href, Link, router } from 'expo-router';
import React from 'react';
import { Text, TextInput, View } from "react-native";
import AppButton from './components/app-button';
import { useAuth } from '@/context/AuthContext';

export default function Index() {
  const {authState} = useAuth();

  const redirectToHome = () => {
    router.push("./reviews/home")
  }


  return (
    <View className="flex-1 items-center justify-center bg-white">
      <AppButton onClick={redirectToHome}>
        <Text className="font-bold">Go to HOME</Text>
      </AppButton>
    </View>
  );
}
