import { View, Text } from 'react-native'
import React from 'react'


type AppTagProps = {
  children: React.ReactNode;
  extraClassName?: string;
}


const AppTag = (props: AppTagProps) => {
  return (
    <View className={`flex-row rounded-xl items-center justify-center px-2 mr-1 ${props.extraClassName}`}>
      {props.children}
    </View>
  )
}

export default AppTag