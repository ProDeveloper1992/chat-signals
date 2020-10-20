import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-ionicons';
import {Colors} from '../../constants';
import {AppText} from '../../components';

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
        color={Colors.black}
        size={size || 30}
        onPress={onBackPress}
      />
      <View style={styles.titleContainer}>
        <AppText type={'bold'} size={16}>
          {title}
        </AppText>
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
});
