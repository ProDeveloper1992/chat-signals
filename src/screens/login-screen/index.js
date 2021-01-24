import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  TextButton,
  AuthContainer,
  Loading,
  AuthInput,
  BackHeader,
  AppText,
  IconButton,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';

import { AppButton } from '../../components';
import { Images, mailformat, Color, Gifs, Icons, Colors } from '../../constants';
import { globalStyle } from '../../styles/global-style';
import { loginUser, loginWithSocialMedia } from '../../redux/actions/user-actions';
import GoogleIcon from '../../assets/icons/google.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import { loginWithFacebook, loginWithGoogle } from '../../services/social-login-service';
import { ForgotPasswordModal } from '../../components/app-modals';

const LoginScreen = (props) => {
  const { navigation } = props;

  //Actions to dispatch
  const dispatch = useDispatch();

  const { appLabels } = useSelector((state) => state.appState);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);

  const onLoginPress = async () => {
    let isValid = true;
    if (email.trim() == 0) {
      isValid = false;
      setEmailError('Please enter email address!');
    } else if (!email.match(mailformat)) {
      isValid = false;
      setEmailError('Invalid email address!');
    } else {
      setEmailError(null);
    }

    if (password.trim() == 0) {
      isValid = false;
      setPassError('Please enter password!');
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
    await loginWithGoogle();
  };

  const onFacebookIconPress = async () => {
    await loginWithFacebook();
  };

  return (
    <AuthContainer>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={globalStyle.logo} source={Gifs.chat_signal_logo} />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AuthInput
            label={appLabels.email}
            placeholder={appLabels.email}
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
            error={emailError}
          />
          <AuthInput
            label={appLabels.password}
            placeholder={appLabels.password}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={passError}
          />

          <View style={{ alignSelf: 'flex-end' }}>
            <TextButton
              fontType={'medium'}
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
            color={Colors.greydark}
            style={{ alignSelf: 'center', marginVertical: 15 }}>
            {'Or Login with'}
          </AppText>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <IconButton
              icon={<GoogleIcon width={40} height={40} />}
              buttonColor={Colors.white}
              onPress={onGoogleIconPress}
            />

            <IconButton
              icon={<FacebookIcon width={40} height={40} />}
              buttonColor={Colors.white}
              onPress={onFacebookIconPress}
            />
          </View>

          <TextButton
            style={{ alignSelf: 'center' }}
            fontType={'medium'}
            titleColor={Colors.black}
            title={appLabels.dont_have_an_account + '  ' + appLabels.create_one}
            onPress={() => {
              navigation.navigate('RegisterWithEmail');
            }}
          />
        </View>
      </ScrollView>
      <ForgotPasswordModal visible={forgotPasswordModalVisible} onHideModal={() => setForgotPasswordModalVisible(false)} />
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 5,
  },
  loginButton: {
    marginTop: 10,
  },
});

export default LoginScreen;
