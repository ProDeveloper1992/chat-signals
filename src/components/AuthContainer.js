import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Colors, Images} from '../constants';

export function AuthContainer({children}) {
  return (
    <ImageBackground style={styles.container} source={Images.login_bg_1}>
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
