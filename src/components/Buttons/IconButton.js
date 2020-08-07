import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-ionicons';
import {useTheme} from '@react-navigation/native';

export function IconButton({iconName, iconColor, size, style, onPress}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Icon
        name={iconName}
        color={iconColor || colors.primary}
        size={size || 30}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
});
