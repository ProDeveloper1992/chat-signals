import React from 'react';
import {StyleSheet, TextInput, Platform} from 'react-native';
import {useTheme} from '@react-navigation/native';

export function AuthInput({style, ...props}) {
  const {colors} = useTheme();

  return (
    <TextInput
      {...props}
      style={[
        styles.input,
        style,
        {
          backgroundColor: '#fff',
          borderWidth: 0.5,
          borderColor: colors.primary,
        },
      ]}
      placeholderTextColor={'darkgray'}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 15 : 10,
    borderRadius: 8,
    color: 'black',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
});
