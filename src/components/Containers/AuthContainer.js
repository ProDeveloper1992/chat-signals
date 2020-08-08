import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Platform,
} from 'react-native';
import {Images} from '../../constants';

export function AuthContainer({children, style, blur}) {
  return (
    <ImageBackground
      blurRadius={blur ? 5 : 0}
      style={styles.container}
      source={Images.login_bg_2}>
      <SafeAreaView style={[style, {flex: 1}]}>{children}</SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
});
