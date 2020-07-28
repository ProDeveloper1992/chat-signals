import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Colors} from '../constants'

export function Heading({children, style, ...props}) {
  const {colors} = useTheme();
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    color:Colors.ui_primary
  },
});
