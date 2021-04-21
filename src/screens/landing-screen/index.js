import React, { Component, useEffect, useState } from 'react';
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

import { AppButton, AppText, AuthContainer } from '../../components';
import { Colors, Icons, Images, Gifs } from '../../constants';
import { isIphoneX } from '../../utils/common';
import { globalStyle } from '../../styles/global-style';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLanguageModal } from '../../redux/actions/app-modals-actions';

import LandingIntro from '../../assets/images/landing_intro.svg';
import { RegisterLandingModal } from '../../components/app-modals';
import { getGenderList, getPassionList, getSexualOrientationList } from '../../redux/actions/app-actions';
import { configurePushNotification } from '../../services/notification-service';

const LandingScreen = (props) => {
  const { navigation } = props;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const { appLabels } = useSelector((state) => state.appState);

  const [registerLandingModalVisible, setRegisterLandingModalVisible] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    if (isFocused) {
      dispatch(getPassionList());
      dispatch(getSexualOrientationList());
      dispatch(getGenderList());
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
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
    // setRegisterLandingModalVisible(true);
    // navigation.navigate('RegisterWithEmail');
    configurePushNotification();
  };

  const onLogin = () => {
    navigation.navigate('Login');
  };

  const onLanguageIconPress = () => {
    dispatch(toggleLanguageModal(true));
  };

  return (
    <AuthContainer gradientBackground>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image
            style={[globalStyle.logo, { tintColor: Colors.black }]}
            source={Platform.OS == "android" ? Gifs.chat_signal_logo : Images.app_logo}
          />
          {/* <TouchableOpacity
            onPress={onLanguageIconPress}
            style={{
              backgroundColor: Colors.white,
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              // alignSelf: 'flex-end',
              // marginTop: 20,
              elevation: 5,
            }}>
            <Image
              style={{ width: 24, height: 24, tintColor: Colors.ui_primary }}
              source={Icons.icon_languages}
            />
          </TouchableOpacity> */}
        </View>
        <View style={{ flex: 1, marginTop: '5%' }}>
          <AppText size={15} color={Colors.white}>{"Find your match with our poweful algorithms"}</AppText>
          <AppText type={'bold'} size={24} color={Colors.white} style={{ marginBottom: '5%' }}>{"Casual chatting and flirting"}</AppText>
          {/* <LandingIntro width={"100%"} height={"65%"} /> */}
          <Image style={{ width: '100%', height: '70%', resizeMode: 'contain' }} source={require('../../assets/images/landing_intro.png')} />
        </View>
        <View style={styles.bottomView}>
          <AppButton
            type={'light'}
            title={appLabels.login}
            onPress={onLogin}
          />
          <AppButton
            style={{ marginTop: 10 }}
            type={'transparent'}
            title={appLabels.register}
            onPress={onRegister}
          />
        </View>
        <RegisterLandingModal
          visible={registerLandingModalVisible}
          onHideModal={() => setRegisterLandingModalVisible(false)} />
      </View>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 25,
  },
  bottomView: {
    width: '100%',
    // bottom: 25,
    // position: 'absolute',
    // flexDirection: 'row',
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default LandingScreen;
