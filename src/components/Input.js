import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

export function Input({style, ...props}) {
  return (
    <TextInput
      {...props}
      style={[styles.input, style]}
      placeholderTextColor={'darkgray'}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#e8e8e8',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    color: 'black',
  },
});
