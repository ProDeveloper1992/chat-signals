import React from 'react';
import {StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import {Images} from '../../constants';

export function AuthContainer({children, style}) {
  return (
    <ImageBackground style={styles.container} source={Images.login_bg_2}>
      <SafeAreaView style={[style, {flex: 1}]}>{children}</SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
});
