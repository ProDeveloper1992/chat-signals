import React, { useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView } from 'react-native';

import {
  GradientButton,
  Loading,
  AuthContainer,
  BackHeader,
  AppText,
  CountryPicker,
} from '../../components';
import { Gifs, Icons, Images } from '../../constants';
import { globalStyle } from '../../styles/global-style';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { Colors } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginWithSocialMedia } from '../../redux/actions/user-actions';
import { showToast } from '../../redux/actions/app-actions';

const RegisterWithGoogle = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const { appLabels } = useSelector((state) => state.appState);

  const [loading, setLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = React.useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '621048235124-rfcui16pf4g76mo2vm0ijbr3frjnkqqd.apps.googleusercontent.com',
    });
    _isSignedIn;
  });

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      // alert('User is already signed in');
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };

  const _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('User has not signed in yet', error);
      } else {
        console.log("Something went wrong. Unable to get user's info", error);
      }
    }
  };

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      setLoading(true);
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
      let requestData = {
        username: userInfo.user.name,
        email: userInfo.user.email,
        avatar: userInfo.user.photo,
        provider: 'google',
        provider_id: userInfo.user.id,
        access_token: userInfo.user.id
      }
      const response = await dispatch(loginWithSocialMedia(requestData));
      setLoading(false);
      if (response.meta.status) {
        navigation.navigate('main-stack');
      }
    } catch (error) {
      setLoading(false);
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        dispatch(
          showToast('negative', 'Play Services Not Available or Outdated'),
        );
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  const _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContainer blur>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={globalStyle.logo} source={Gifs.chat_signal_logo} />
        <View style={{ marginTop: '10%' }}>
          <CountryPicker />

          <GradientButton
            type={'google'}
            title={appLabels.register_with_google}
            icon={
              <Image source={Icons.google_icon} style={styles.googleIcon} />
            }
            iconColor={Colors.white}
            style={styles.registerButtom}
            onPress={() => _signIn()}
            loading={loading}
          />
          {/* {userInfo && (
            <TouchableOpacity style={styles.button} onPress={_signOut}>
              <AppText>Logout</AppText>
            </TouchableOpacity>
          )} */}
        </View>
      </ScrollView>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
  },
  registerButtom: {
    marginVertical: 10,
    paddingVertical: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  googleIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.white,
    marginEnd: 8,
  },
});

export default RegisterWithGoogle;
