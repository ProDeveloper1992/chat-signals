import React from 'react';
import { TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import styles from './style';
import { Colors, Icons } from '../../../constants';
import { AppText } from '../../index';

export default function ModeratorHeader({ onBackPress, label }) {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: 'transparent' }} />
      <View style={styles.headerContainer}>
        <View>
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backIconContainer}>
            <Image style={styles.backIcon} source={Icons.back_icon} />
          </TouchableOpacity>
        </View>

        <View>
          <AppText
            type={'bold'}
            size={16}
            color={Colors.white}
            style={styles.headerTitle}>
            {label}
          </AppText>
        </View>

        <View />
      </View>
    </>
  );
}
