import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import styles from './style';
import { AppText } from '../../index';

export default function ModeratorIconLabel({ onIconPress, Icon }) {
  return (
    <TouchableOpacity onPress={onIconPress} style={{ flex: 1 }}>
      <View style={styles.iconViewContainer}>
        {/* <Image source={Icon} style={styles.icon} /> */}
        {Icon}
      </View>
    </TouchableOpacity>
  );
}
