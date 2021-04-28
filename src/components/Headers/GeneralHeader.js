import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { Colors, Images } from '../../constants';
import { AppText } from '../../components';

export function GeneralHeader({
  style,
  label,
  rightIcon,
}) {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.ui_primary }} />
      <View style={[styles.container, style]}>
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
