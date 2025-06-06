import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown';

interface DropdownOption {
  label: string,
  value: string,
}

type AppDropdownProps = {
  options: DropdownOption[];
  onChange: any; 
  extraClassName?: string;
  placeholder: string;
}


const AppDropdown = (props: AppDropdownProps) => { 
  return (
    <View className={`${props.extraClassName}`}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={props.options}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={props.placeholder}
        onChange={item => {
          props.onChange(item.value);
        }}
      />
    </View>
  )
}

export default AppDropdown

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dropdown: {
    margin: 12,
    height: 12,
    alignSelf: "stretch",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  }
});