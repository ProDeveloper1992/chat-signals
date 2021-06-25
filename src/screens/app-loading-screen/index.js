import React, { Component, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Colors, Images } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getAppStrings } from '../../redux/actions/app-actions';
import { wait } from '../../utils/common';
import { AuthContainer } from '../../components';
import { globalStyle } from '../../styles/global-style';

const AppLoading = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const { isLoggedIn } = useSelector((state) => state.userState);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('main-stack');
    } else {
      navigation.navigate('auth-stack');
    }
    getAppData();
  }, []);

  async function getAppData() {
    dispatch(getAppStrings());
  }

  return (
    <AuthContainer gradientBackground>
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <Image style={[globalStyle.logo, { tintColor: Colors.black }]} source={Images.app_logo} />
      </View>
      <View style={styles.bottomContainer}>
        <ActivityIndicator size={'large'} color={Colors.white} />
      </View>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default AppLoading;
