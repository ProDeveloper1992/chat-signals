import React from 'react';
import {StyleSheet, TextInput, Platform} from 'react-native';

export function AuthInput({style, ...props}) {
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
    paddingVertical: Platform.OS === 'ios' ? 15 : 10,
    borderRadius: 15,
    color: 'black',
  },
});
