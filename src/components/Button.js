import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

export function Button({title, style, onPress}) {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, style, {backgroundColor: colors.primary}]}
      onPress={onPress}>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 30,
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});
