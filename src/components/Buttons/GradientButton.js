import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-ionicons';

export function GradientButton({type, title, icon, iconColor, style, onPress}) {
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
      case 'google':
        return colors.google;
      case 'facebook':
        return colors.facebook;
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
      case 'google':
        return colors.white;
      case 'facebook':
        return colors.white;
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
          justifyContent: icon ? 'flex-start' : 'center',
        },
      ]}
      onPress={onPress}>
      {icon && (
        <Icon name={icon} color={iconColor} style={{paddingHorizontal: 5}} />
      )}
      <Text style={[styles.text, {color: getTextColor()}]}>
        {title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: Platform.OS === 'ios' ? 15 : 12,
    borderRadius: 15,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
});
