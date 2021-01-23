import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Platform,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Images } from '../../constants';

export function AuthContainer({ children, style, blur }) {
  return (
    // <ImageBackground
    //   blurRadius={blur ? 15 : 0}
    //   style={styles.container}
    //   source={Images.login_bg_2}>
    <LinearGradient
      angle={101.12}
      start={{ x: 0.0, y: 0.55 }}
      end={{ x: 1.0, y: 0.85 }}
      // locations={[0.347, 1.364]}
      locations={[0, 0.5]}
      colors={['#5CCBD0', '#7DFFEF']}
      style={styles.container}>
      <SafeAreaView style={[style, { flex: 1 }]}>{children}</SafeAreaView>
    </LinearGradient>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
});
