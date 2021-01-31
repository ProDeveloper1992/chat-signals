import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Platform,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Colors, Images } from '../../constants';

export function AuthContainer({ children, style, gradientBackground }) {

  const getGradientColors = () => {
    if (gradientBackground) {
      return ['#5CCBD0', '#7DFFEF'];
    } else {
      return [Colors.white, Colors.white];
    }
  }

  if (!gradientBackground) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={[style, { flex: 1 }]}>{children}</SafeAreaView>
      </View>
    )
  }

  return (
    <ImageBackground
      style={styles.container}
      source={Images.app_bg}>
      {/* <LinearGradient
      angle={101.12}
      start={{ x: 0.0, y: 0.55 }}
      end={{ x: 1.0, y: 0.85 }}
      locations={[0, 0.5]}
      colors={getGradientColors()}
      style={styles.container}> */}
      <SafeAreaView style={[style, { flex: 1 }]}>{children}</SafeAreaView>
      {/* </LinearGradient> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
});
