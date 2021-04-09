import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './style';

export default function ModeratorIconLabel({ onIconPress, Icon }) {
  return (
    <TouchableOpacity onPress={onIconPress} style={{ flex: 1 }}>
      <View style={styles.iconViewContainer}>
        {Icon}
      </View>
    </TouchableOpacity>
  );
}
