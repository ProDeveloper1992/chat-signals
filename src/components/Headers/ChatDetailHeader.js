import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {Colors, Icons} from '../../constants';
import {AppText} from '..';
import Icon from 'react-native-ionicons';

export function ChatDetailHeader({
  style,
  leftIcon,
  onLeftPress,
  label,
  rightIcon,
  onRightPress,
  LanguageIcon,
  onLanguagePress,
}) {
  return (
    <View style={[styles.container, style]}>
      <Icon
        style={{marginRight: 10}}
        name={'arrow-back'}
        color={Colors.white}
        size={25}
        onPress={onLeftPress}
      />
      <Image
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          resizeMode: 'cover',
        }}
        source={leftIcon}
      />

      <AppText type={'bold'} size={16} style={styles.headerTitle}>
        {label}
      </AppText>

      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={onRightPress}>
          <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              tintColor: 'white',
            }}
            source={rightIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: Colors.ui_primary,
  },
  flexOne: {
    flex: 1,
  },
  headerTitle: {
    color: 'white',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginLeft: 15,
    textTransform: 'uppercase',
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
