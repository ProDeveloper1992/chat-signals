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
import { EmailIcon, PasswordIcon } from '../../constants/svg-icons';

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

  const onBackPress = () => {
    navigation.goBack();
  }

  return (
    <AuthContainer>
      {/* <BackHeader onBackPress={() => navigation.goBack()} /> */}
      <View style={styles.container}>
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
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              error={passError}
              icon={<PasswordIcon width={24} height={24} />}
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
              type={'facebook'}
              title={"Log in with Facebook"}
              icon={<FacebookIcon width={30} height={30} />}
              onPress={onFacebookIconPress}
            />
            <View style={{ marginTop: 15 }} />
            <AppButton
              type={'google'}
              title={"Log in with Google"}
              icon={<GoogleIcon width={30} height={30} />}
              onPress={onGoogleIconPress}
            />

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
        <ForgotPasswordModal visible={forgotPasswordModalVisible} onHideModal={() => setForgotPasswordModalVisible(false)} />
      </View>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 25,
  },
  input: {
    marginVertical: 5,
  },
  loginButton: {
    marginTop: 10,
  },
});

export default LoginScreen;
