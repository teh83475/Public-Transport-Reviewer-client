import React from 'react';
import { Href, Link, router } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AppButton from '../../components/app-button';
import { useAuth } from '@/context/AuthContext';
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, selectProfile } from '@/service/redux/profileSlice';
import { ChangePassword } from '@/service/serverAPI';
import { Ionicons } from '@expo/vector-icons'
import { DEFAULT_COLOR } from '@/constants/Colors';

const ChangePasswordPage = () => {
  const [oldPassword, onOldPasswordChange] = React.useState('');
  const [newPassword, onNewPasswordChange] = React.useState('');
  const [confirmPassword, onConfirmPasswordChange] = React.useState('');

  const onChangePassword = async () => {
    if (newPassword != confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match."
      });
      return;
    }

    const result = await ChangePassword(oldPassword, newPassword) as any;
    console.log(result.status," <-Login status result");
    Toast.show({
      type: (result.status!="SUCCESS")?"error":"success",
      text1: result.status
    });

    if (result.status!="SUCCESS") {
      return;
    }

    router.back();
  }
  return (
    <View className='flex h-full'>
      <View className="bg-white h-[7%]">
        <View className='flex flex-row flex-wrap p-1 mt-auto my-auto items-center'>
          <TouchableOpacity className='' onPress={router.back}>
            <Ionicons name="arrow-back-outline" size={26} color={DEFAULT_COLOR}/>
          </TouchableOpacity>
          <Text className='text-xl ml-2'>Change Password</Text>
        </View>
        <View className="border-b border-gray-300"/>
      </View>
      <View className='w-[100%] px-5 my-auto bg-green'>
      

        <Text className='font-bold'>Old Password:</Text>
        <TextInput
          className='border'
          onChangeText={onOldPasswordChange}
        />
        <Text className='font-bold'>New Password:</Text>
        <TextInput
          className='border'
          onChangeText={onNewPasswordChange}
        />
        <Text className='font-bold'>Confirm Password:</Text>
        <TextInput
          className='border mb-5'
          onChangeText={onConfirmPasswordChange}
        />

        {/* <Text className='font-bold'>{username}</Text>
        <Text className='font-bold'>{password}</Text> */}
        <AppButton onClick={onChangePassword}>
          <Text className="font-bold">Change Password</Text>
        </AppButton>

      </View>
    </View>
    
  )
}

export default ChangePasswordPage