import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Platform,
} from 'react-native';
import {
  TextButton,
  AuthContainer,
  AuthInput,
  AppText,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import appleAuth, {
  AppleButton,
  appleAuthAndroid
} from "@invertase/react-native-apple-authentication";
import 'react-native-get-random-values';

import styles from './style';
import { AppButton } from '../../components';
import { mailformat, Colors } from '../../constants';
import { loginUser } from '../../redux/actions/user-actions';
import GoogleIcon from '../../assets/icons/google.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import { fetchAndUpdateCredentialState, loginWithFacebook, loginWithGoogle, onAppleLoginForAndroid, onAppleLoginForiOS } from '../../services/social-login-service';
import { ForgotPasswordModal } from '../../components/app-modals';
import { EmailIcon, PasswordIcon, EyeCloseIcon, EyeOpenIcon, AppleLogoIcon } from '../../constants/svg-icons';
import { getFontFamily } from '../../utils/common';

const LoginScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const { appLabels } = useSelector((state) => state.appState);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoginLoading, setGoogleLoginLoading] = useState(false);
  const [facebookLoginLoading, setFacebookLoginLoading] = useState(false);
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);

  const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);
  useEffect(() => {
    if (!appleAuth.isSupported) return;

    fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
      updateCredentialStateForUser(`Error: ${error.code}`),
    );
  }, []);

  useEffect(() => {
    if (!appleAuth.isSupported) return;

    return appleAuth.onCredentialRevoked(async () => {
      console.warn('Credential Revoked');
      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(`Error: ${error.code}`),
      );
    });
  }, []);


  const onLoginPress = async () => {
    let isValid = true;
    if (email.trim() == 0) {
      isValid = false;
      setEmailError(appLabels.email_error_1);
    } else if (!email.match(mailformat)) {
      isValid = false;
      setEmailError(appLabels.email_error_2);
    } else {
      setEmailError(null);
    }

    if (password.trim() == 0) {
      isValid = false;
      setPassError(appLabels.password_error_1);
    } else {
      setPassError(null);
    }

    if (isValid) {
      try {
        let requestData = {
          email: email,
          password: password,
        };
        setLoading(true);
        const response = await dispatch(loginUser(requestData));
        setLoading(false);
        if (response.meta.status) {
          navigation.push('main-stack');
        }
      } catch (e) {
        setLoading(false);
      }
    }
  };

  const onGoogleIconPress = async () => {
    setGoogleLoginLoading(true);
    await loginWithGoogle();
    setGoogleLoginLoading(false);
  };

  const onFacebookIconPress = async () => {
    setFacebookLoginLoading(true);
    await loginWithFacebook();
    setFacebookLoginLoading(false);
  };

  const onBackPress = () => {
    navigation.goBack();
  }

  return (
    <AuthContainer>
      {/* <BackHeader onBackPress={() => navigation.goBack()} /> */}
      <View pointerEvents={loading ? 'none' : 'auto'} style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}>
          {/* <Image style={globalStyle.logo} source={Gifs.chat_signal_logo} /> */}
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <AppText
              type={'bold'}
              size={24}
              style={{ textAlign: 'center', marginVertical: 20 }}>
              {appLabels.login}
            </AppText>
            <AuthInput
              label={appLabels.email}
              placeholder={appLabels.email}
              keyboardType={'email-address'}
              value={email}
              onChangeText={setEmail}
              error={emailError}
              icon={<EmailIcon width={24} height={24} />}
            />
            <AuthInput
              label={appLabels.password}
              placeholder={appLabels.password}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              error={passError}
              icon={<PasswordIcon width={24} height={24} />}
              rightIcon={showPassword ? <EyeOpenIcon width={24} height={24} /> : <EyeCloseIcon width={24} height={24} />}
              onRightIconPress={() => setShowPassword(!showPassword)}
              onSubmitEditing={onLoginPress}
            />

            <View style={{ alignSelf: 'flex-end' }}>
              <TextButton
                fontType={'bold'}
                fontSize={14}
                titleColor={Colors.black}
                title={appLabels.forgot_password}
                onPress={() => setForgotPasswordModalVisible(true)}
              />
            </View>

            <AppButton
              type={'primary'}
              title={appLabels.login}
              style={styles.loginButton}
              // onPress={() => login()}
              onPress={() => onLoginPress()}
              loading={loading}
            />

            <AppText
              color={Colors.black}
              style={{ alignSelf: 'center', marginBottom: 10, marginTop: 20 }}>
              {'or'}
            </AppText>

            <AppButton
              type={'sociallogin'}
              title={"Log in with Facebook"}
              icon={<FacebookIcon width={30} height={30} />}
              onPress={onFacebookIconPress}
              loading={facebookLoginLoading}
            />
            <View style={{ marginTop: 15 }} />
            <AppButton
              type={'sociallogin'}
              title={"Log in with Google"}
              icon={<GoogleIcon width={30} height={30} />}
              onPress={onGoogleIconPress}
              loading={googleLoginLoading}
            />
            <View style={{ marginTop: 15 }} />
            {Platform.OS == 'android' ? (
              <View>
                {appleAuthAndroid.isSupported && (
                  <AppButton
                    type={'sociallogin'}
                    title={"Log in with Apple"}
                    icon={<AppleLogoIcon width={30} height={30} />}
                    onPress={onAppleLoginForAndroid}
                  // loading={googleLoginLoading}
                  />
                )}
              </View>
            ) : (
              <AppButton
                type={'sociallogin'}
                title={"Log in with Apple"}
                icon={<AppleLogoIcon width={30} height={30} />}
                onPress={() => onAppleLoginForiOS(updateCredentialStateForUser)}
              // loading={googleLoginLoading}
              />
            )}

            <TextButton
              style={{ alignSelf: 'center', marginTop: 10 }}
              fontType={'bold'}
              titleColor={Colors.black}
              title={appLabels.dont_have_an_account + '  ' + appLabels.create_one}
              onPress={() => {
                navigation.navigate('RegisterWithEmail');
              }}
            />
          </View>
          <TextButton
            style={{ alignSelf: 'center' }}
            title={'Back'}
            fontType={'bold'}
            titleColor={Colors.black}
            onPress={onBackPress} />
        </ScrollView>
        <ForgotPasswordModal
          visible={forgotPasswordModalVisible}
          onHideModal={() => setForgotPasswordModalVisible(false)} />
      </View>
    </AuthContainer>
  );
};

export default LoginScreen;
