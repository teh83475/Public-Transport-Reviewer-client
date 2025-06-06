import React from 'react';
import { Href, Link, router } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AppButton from '../../components/app-button';
import { useAuth } from '@/context/AuthContext';
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, selectProfile } from '@/service/redux/profileSlice';
import { Ionicons } from '@expo/vector-icons'
import { DEFAULT_COLOR, SECONDARY_COLOR } from '@/constants/Colors';

const Profile = () => {
  const profile = useSelector(selectProfile);
  const dispatch = useDispatch();

  const [username, onUsernameChange] = React.useState('');
  const [password, onPasswordChange] = React.useState('');
  const {authState, login, logout, register } = useAuth();

  const [isRegisterMode, setIsRegisterMode] = React.useState(false);

  const onLogin = async () => {
    const result = await login!(username, password) as any;
    console.log(result.status," <-Login status result");
    Toast.show({
      type: (result.status!="SUCCESS")?"error":"success",
      text1: result.status
    });

    if (result.status!="SUCCESS") {
      return;
    }

    //if login success
    dispatch(setProfile(result.userProfile));
  }

  const onRegister = async () => {
    const result = await register!(username, password) as any;
    console.log(result.status," <-Register status result");
    Toast.show({
      type: (result.status!="SUCCESS")?"error":"success",
      text1: result.status
    });
  }

  const onLogout = () => {
    const result = logout!();
    
  }

  const onChangePasswordButtonPressed = () => {
    router.push("./profile/change-password")
    
  }

  const onYourPostsButtonPressed = () => {
    router.push("./profile/your-post")
    
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      {authState?.logged_in && <View className="p-2 w-full">
        <Text className='text-4xl'>Profile</Text>
        <View className='w-full mb-2 h-auto border rounded-xl bg-gray-100'>
          <View className='flex-row items-center m-1'>
            <Ionicons name="person-circle-outline" size={56} color={DEFAULT_COLOR}/>

            <Text className="text-2xl ml-1">{profile.username}</Text>
          </View>
          <View className="border-b mx-1 border-gray-400"/>
          
          <TouchableOpacity className='p-2' onPress={onYourPostsButtonPressed}>
            <Text className="">Your posts</Text>
          </TouchableOpacity>
          <View className="border-b mx-1 border-gray-400"/>
          
          <TouchableOpacity className='p-2' onPress={onChangePasswordButtonPressed}>
            <Text className="">Change Password</Text>
          </TouchableOpacity>

          

        </View>

        <AppButton onClick={onLogout} extraClassName='bg-red-500'>
          <Text className="text-white font-bold">Logout</Text>
        </AppButton>
      </View>}
      
      {!authState?.logged_in && <View className='w-[100%] px-5 bg-green'>
        <Text className='font-bold'>Username:</Text>
        <TextInput
          className='border'
          onChangeText={onUsernameChange}
          
        />
        <Text className='font-bold'>Password:</Text>
        <TextInput
          className='border mb-5'
          onChangeText={onPasswordChange}
        />

        {!isRegisterMode && <View>
            <AppButton onClick={onLogin}>
              <Text className="font-bold">Login</Text>
            </AppButton>
            <Text className='mt-2'>Don't have a account? <Text className="text-blue-600 underline" onPress={()=>setIsRegisterMode(true)}>Register</Text> now!</Text>
          </View>
        }

        {isRegisterMode && <View className=''>
            <AppButton onClick={onRegister}>
              <Text className="font-bold">Register</Text>
            </AppButton>
            <Text className='mt-2'>Already have a account? <Text className="text-blue-600 underline" onPress={()=>setIsRegisterMode(false)}>Login</Text> now!</Text>

          </View>
        }
        


        

      </View>}

      
      

    </View>
  )
}

export default Profile 