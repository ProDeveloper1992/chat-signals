import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import styles from './style';
import { AppText } from '../../index';

export default function ModeratorIconLabel({ onIconPress, Icon, IconName }) {
  return (
    <TouchableOpacity onPress={onIconPress} style={{ flex: 1 }}>
      <View style={styles.iconViewContainer}>
        <Image source={Icon} style={styles.icon} />
        <AppText numberOfLines={1} style={styles.pBottom}>{IconName}</AppText>
      </View>
    </TouchableOpacity>
  );
}
