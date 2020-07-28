import React from 'react';
import {View, StyleSheet,Image} from 'react-native';
import {useTheme} from '@react-navigation/native';

export function SplashScreen() {
  const {colors} = useTheme();
  return <View style={[styles.container, {backgroundColor: 'transparent'}]} >
    <Image source={require('../assets/images/splash1.jpg')} style={{height:'100%',width:'100%'}}/>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});