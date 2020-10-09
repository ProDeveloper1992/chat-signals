import React, {Component, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  BackHandler,
  Alert,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {GradientButton, AuthContainer} from '../../components';
import {Images} from '../../constants';
import {isIphoneX} from '../../utils/common';
import {globalStyle} from '../../styles/global-style';
import {useIsFocused} from '@react-navigation/native';

const LandingScreen = (props) => {
  const {navigation} = props;
  const isFocused = useIsFocused();

  useEffect(() => {
    SplashScreen.hide();
    if (isFocused) {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
  }, [isFocused]);

  const onRegister = () => {
    navigation.navigate('RegisterLanding');
  };

  const onLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <AuthContainer>
      <Image
        style={[globalStyle.logo, {marginTop: isIphoneX() ? 60 : 50}]}
        source={Images.app_logo}
      />
      <View style={styles.bottomView}>
        <View style={{marginEnd: 8, flex: 1}}>
          <GradientButton
            type={'light'}
            title={'Register'}
            style={{paddingVertical: Platform.OS === 'ios' ? 18 : 15}}
            onPress={onRegister}
          />
        </View>
        <View style={{marginStart: 8, flex: 1}}>
          <GradientButton
            type={'primary'}
            title={'Login'}
            style={{paddingVertical: Platform.OS === 'ios' ? 18 : 15}}
            onPress={onLogin}
          />
        </View>
      </View>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  bottomView: {
    bottom: 25,
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default LandingScreen;
