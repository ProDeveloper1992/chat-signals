import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-ionicons';
import { Colors } from '../../constants';

export function IconButton({ icon, onPress, buttonColor }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {
        backgroundColor: buttonColor
      }]}>
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: Colors.white
  }
});
