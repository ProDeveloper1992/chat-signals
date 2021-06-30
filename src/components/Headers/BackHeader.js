import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-ionicons';
import { Colors } from '../../constants';
import { AppText } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from '../../constants/svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export function BackHeader({
  title,
  color,
  size,
  style,
  onBackPress,
  rightContent,
}) {

  const navigation = useNavigation();

  const _navigateToBack = () => {
    navigation.goBack();
  }

  return (
    <>
      <SafeAreaView style={{ backgroundColor: color || Colors.white }} />
      <View style={[styles.container, style, { backgroundColor: color || Colors.white }]}>
        <TouchableOpacity onPress={onBackPress ? onBackPress : _navigateToBack}>
          <ArrowLeftIcon width={size || hp(4)} height={size || hp(4)} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <AppText type={'bold'} size={hp(2.5)} color={color ? Colors.white : Colors.black}>
            {title}
          </AppText>
        </View>
        {rightContent}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
