import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-ionicons';
import {Colors} from '../../constants';

export function BackHeader({
  title,
  color,
  size,
  style,
  onBackPress,
  rightContent,
}) {
  return (
    <View style={[styles.container, style]}>
      <Icon
        name={'arrow-back'}
        color={Colors.ui_primary}
        size={size || 30}
        onPress={onBackPress}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {rightContent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center', paddingVertical: 12},
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});
