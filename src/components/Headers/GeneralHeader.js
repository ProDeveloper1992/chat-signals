import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Colors } from '../../constants';

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
        <Text
          style={styles.headerTitle}>
          {label}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        <TouchableOpacity
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
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginStart: 20 }}
          onPress={onLanguagePress}>
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
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});
