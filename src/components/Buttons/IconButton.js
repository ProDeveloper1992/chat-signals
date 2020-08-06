import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-ionicons';
import {useTheme} from '@react-navigation/native';

export function IconButton({name, color, size, style, onPress}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Icon name={name} color={color || colors.primary} size={size || 30} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {padding: 5},
});
