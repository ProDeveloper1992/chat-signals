import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-ionicons';
import {useTheme} from '@react-navigation/native';

export function BackHeader({title, color, size, style, onBackPress}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onBackPress}>
      <Icon name={'arrow-back'} color={colors.primary} size={size || 30} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center', paddingVertical: 20},
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});
