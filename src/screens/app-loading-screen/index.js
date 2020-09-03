import React, {Component, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Colors} from '../../constants';

const AppLoading = (props) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: 'transparent'}]}>
      <ActivityIndicator size={'large'} color={Colors.ui_primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppLoading;
