import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../constants';
import {AppText} from '../../components';

export function TextButton({title, style, titleColor, onPress, fontType, fontSize}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <AppText size={fontSize || 13} type={fontType || 'medium'} color={titleColor || Colors.white}>
        {title.toUpperCase()}
      </AppText>
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
});
