import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../constants';

export function TextButton({title, style, titleColor, onPress}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.text, {color: titleColor || Colors.white}]}>
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
    padding: 20,
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
  },
});
