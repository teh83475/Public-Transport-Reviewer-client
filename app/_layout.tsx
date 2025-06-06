import { AuthProvider } from "@/context/AuthContext";
import { SplashScreen, Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from 'react-native-toast-message';
import store from '@/service/redux/store';
import { Provider } from 'react-redux';
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <AuthProvider>
          <GestureHandlerRootView>
            <Stack
              screenOptions={{
                headerShown: false
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false}}/>
              
            </Stack>
          </GestureHandlerRootView>
          
          <Toast/>
        </AuthProvider>
      </Provider>
      </SafeAreaView> 
    </>
  )

}
