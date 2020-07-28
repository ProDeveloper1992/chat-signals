import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Colors} from '../constants';

export function AuthContainer({children}) {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/images/login_bg1.jpg')}>
      <View style={styles.container}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor:Colors.ui_primary_dark
  },
});
