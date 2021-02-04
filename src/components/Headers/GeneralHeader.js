import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { Colors, Images } from '../../constants';
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

        {/* <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onLanguagePress}>
            <Image
              style={{
                height: 24,
                width: 24,
                resizeMode: 'contain',
                tintColor: Colors.white,
              }}
              source={LanguageIcon}
            />
          </TouchableOpacity>
        </View> */}

        <View style={styles.flexOne}>
          <AppText type={'bold'} size={16} color={Colors.white} style={styles.headerTitle}>
            {label}
          </AppText>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          {rightIcon}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Colors.ui_primary,
    marginBottom: 2
  },
  flexOne: {
    flex: 1,
  },
  headerTitle: {
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  profileImageContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grey
  },
  profileImage: {
    height: 46,
    width: 46,
    borderRadius: 23,
    resizeMode: 'cover',
  }
});
