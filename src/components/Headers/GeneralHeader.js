import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { Colors } from '../../constants';
import { AppText } from '../../components';

export function GeneralHeader({
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
    <>
      <SafeAreaView style={{ backgroundColor: Colors.ui_primary }} />
      <View style={[styles.container, style]}>
        <View style={styles.flexOne}>
          <TouchableOpacity onPress={onLeftPress}>
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
          <AppText type={'bold'} size={14} style={styles.headerTitle}>
            {label}
          </AppText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          {/* <TouchableOpacity
          onPress={onRightPress}>
          <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              tintColor: 'white',
            }}
            source={rightIcon}
          />
        </TouchableOpacity> */}
          <TouchableOpacity style={{ marginStart: 20 }} onPress={onLanguagePress}>
            <Image
              style={{
                height: 24,
                width: 24,
                resizeMode: 'contain',
                tintColor: 'white',
              }}
              source={LanguageIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
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
    textTransform: 'uppercase',
  },
});
