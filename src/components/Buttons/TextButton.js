import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants';
import { AppText } from '../../components';

export function TextButton({ title, style, titleColor, onPress, fontType, fontSize }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <AppText size={fontSize || 13} type={fontType || 'regular'} color={titleColor || Colors.white}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 15
  },
});
