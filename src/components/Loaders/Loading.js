import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Colors} from '../../constants';
import {AppText} from '../../components';

export function Loading({loading}) {
  if (!loading) {
    return <View />;
  }

  return (
    <View style={styles.overlay}>
      <View style={[styles.container, {backgroundColor: Colors.ui_primary}]}>
        <ActivityIndicator color={Colors.white} />
        <AppText
          type={'medium'}
          size={18}
          color={Colors.white}
          style={styles.text}>
          Loading...
        </AppText>
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
  },
});
