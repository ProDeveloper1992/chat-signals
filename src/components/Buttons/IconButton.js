import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-ionicons';
import {Colors} from '../../constants';

export function IconButton({iconName, iconColor, size, style, onPress}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Icon
        name={iconName}
        color={iconColor || Colors.ui_primary}
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
