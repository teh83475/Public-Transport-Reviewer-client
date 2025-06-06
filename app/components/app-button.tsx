import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { SECONDARY_COLOR, TINT_COLOR } from '@/constants/Colors';


type AppButtonProps = {
  onClick: any; 
  children: React.ReactNode;
  extraClassName?: string;
}


const AppButton = (props: AppButtonProps) => { 
  return (
    <View className='h-10'>
      <TouchableOpacity className={`flex-1 flex-row h-[30%] border rounded-xl items-center justify-center ${props.extraClassName}`} onPress={props.onClick}>
        {props.children}       
      </TouchableOpacity>
    </View>
  )
}

export default AppButton