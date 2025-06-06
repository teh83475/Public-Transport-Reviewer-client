import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, Text, Image, ImageSourcePropType, ColorValue } from "react-native"

type TabItemOption = {
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: ColorValue;
  name: string;
}

const TabItem= ({iconName, iconColor, name}: TabItemOption) => {
  return (
    <Tabs.Screen
      name={name}
      options={{
        title: name,
        headerShown: false,
        tabBarIcon: () => (
          <Ionicons name={iconName} size={32} color={iconColor}/>
        )
      }}
    />
  )
}

export default TabItem