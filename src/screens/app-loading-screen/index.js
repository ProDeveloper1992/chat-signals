import React, { Component, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Colors } from '../../constants';
import { useDispatch } from 'react-redux';
import { getAppStrings } from '../../redux/actions/app-actions';
import { wait } from '../../utils/common';

const AppLoading = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAppData();
  }, []);

  async function getAppData() {
    SplashScreen.hide();
    let app_strings_response = await dispatch(getAppStrings());
    if (app_strings_response.data) {
      console.log('app_strings_response', app_strings_response);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>
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
