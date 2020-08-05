import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

export function GradientButton({type, title, style, onPress}) {
  const {colors} = useTheme();

  function getBgColor() {
    switch (type) {
      case 'primary':
        return colors.primary;
      case 'positive':
        return colors.positive;
      case 'transparent':
        return colors.transparent;
      case 'light':
        return colors.white;
      default:
        return colors.primary;
    }
  }

  function getTextColor() {
    switch (type) {
      case 'primary':
        return colors.white;
      case 'positive':
        return colors.white;
      case 'transparent':
        return colors.primary;
      case 'light':
        return colors.black;
      default:
        return colors.white;
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        {
          backgroundColor: getBgColor(),
          borderWidth: type == 'transparent' ? 1 : 0,
          borderColor: type == 'transparent' ? colors.primary : 'transparent',
        },
      ]}
      onPress={onPress}>
      <Text style={[styles.text, {color: getTextColor()}]}>
        {title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
  },
});
