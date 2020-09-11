import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-ionicons';
import {Colors} from '../../constants';

export function GeneralHeader({
  title,
  color,
  size,
  style,
  onBackPress,
  rightContent,
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
      <View style={styles.flexOne}>
        <TouchableOpacity style={{height: 25, width: 25}} onPress={onLeftPress}>
          <Image
            style={{
              height: 25,
              width: 25,
              resizeMode: 'cover',
              tintColor: 'white',
            }}
            source={leftIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.flexOne}>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontWeight: 'bold',
            letterSpacing: 0.5,
            textAlign: 'center',
          }}>
          {label}
        </Text>
      </View>

      <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
        <TouchableOpacity
          style={{height: 25, width: 25}}
          onPress={onRightPress}>
          <Image
            style={{
              height: 25,
              width: 25,
              resizeMode: 'cover',
              tintColor: 'white',
            }}
            source={rightIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{height: 25, width: 25, marginStart: 20}}
          onPress={onLanguagePress}>
          <Image
            style={{
              height: 25,
              width: 25,
              resizeMode: 'cover',
              tintColor: 'white',
            }}
            source={LanguageIcon}
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    // justifyContent: 'space-between',
    backgroundColor: Colors.ui_primary,
  },

  flexOne: {
    flex: 1,
  },

  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});
