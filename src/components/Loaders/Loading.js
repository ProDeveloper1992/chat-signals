import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

export function Loading({loading}) {
  const {colors} = useTheme();

  if (!loading) {
    return <View />;
  }

  return (
    <View style={styles.overlay}>
      <View style={[styles.container, {backgroundColor: colors.primary}]}>
        <ActivityIndicator color={colors.white} />
        <Text style={[styles.text, {color: colors.white}]}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    // backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  text: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: '500',
  },
});
