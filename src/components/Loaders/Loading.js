import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {Colors} from '../../constants';

export function Loading({loading}) {
  if (!loading) {
    return <View />;
  }

  return (
    <View style={styles.overlay}>
      <View style={[styles.container, {backgroundColor: Colors.ui_primary}]}>
        <ActivityIndicator color={Colors.white} />
        <Text style={[styles.text, {color: Colors.white}]}>Loading...</Text>
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
