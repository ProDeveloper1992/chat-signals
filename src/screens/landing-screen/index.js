import React, {Component, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  BackHandler,
  Alert,
  TouchableOpacity,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {GradientButton, AuthContainer} from '../../components';
import {Colors, Icons, Images,Gifs} from '../../constants';
import {isIphoneX} from '../../utils/common';
import {globalStyle} from '../../styles/global-style';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLanguageModal} from '../../redux/actions/app-modals-actions';

const LandingScreen = (props) => {
  const {navigation} = props;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const {appStrings} = useSelector((state) => state.appState);

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

  const onLanguageIconPress = () => {
    dispatch(toggleLanguageModal(true));
  };

  return (
    <AuthContainer>
      <TouchableOpacity
        onPress={onLanguageIconPress}
        style={{
          backgroundColor: Colors.white,
          width: 50,
          height: 50,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-end',
          marginTop: 20,
          elevation: 5,
        }}>
        <Image
          style={{width: 24, height: 24, tintColor: Colors.ui_primary}}
          source={Icons.icon_languages}
        />
      </TouchableOpacity>
      <Image
        style={[globalStyle.logo, {marginTop: isIphoneX() ? 20 : 10,width:250,height:150}]}
        source={Gifs.chat_signal_logo}
      />
      <View style={styles.bottomView}>
        <View style={{marginEnd: 8, flex: 1}}>
          <GradientButton
            type={'light'}
            title={appStrings.landing.rigister}
            style={{paddingVertical: Platform.OS === 'ios' ? 18 : 15}}
            onPress={onRegister}
          />
        </View>
        <View style={{marginStart: 8, flex: 1}}>
          <GradientButton
            type={'primary'}
            title={appStrings.landing.login}
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
