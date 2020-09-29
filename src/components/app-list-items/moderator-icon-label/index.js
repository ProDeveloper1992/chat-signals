import React from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import styles from './style';
import {AppText} from '../../index';

export default function ModeratorIconLabel({onIconPress, Icon, IconName}) {
  return (
    <TouchableOpacity onPress={onIconPress}>
      <View style={styles.iconViewContainer}>
        <Image source={Icon} style={styles.icon} />
        <AppText style={styles.pBottom}>{IconName}</AppText>
      </View>
    </TouchableOpacity>
  );
}
