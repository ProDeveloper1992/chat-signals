import React, {Component, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Colors} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {getAppStrings} from '../../redux/actions/app-actions';
import {wait} from '../../utils/common';

const AppLoading = (props) => {
  const dispatch = useDispatch();
  const {navigation} = props;
  const {isLoggedIn} = useSelector((state) => state.userState);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('main-stack');
    } else {
      navigation.navigate('auth-stack');
    }
    getAppData();
  }, []);

  async function getAppData() {
    let app_strings_response = await dispatch(getAppStrings());
    if (app_strings_response.data) {
    }
  }

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
