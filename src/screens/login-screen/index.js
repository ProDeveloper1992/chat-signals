import React from 'react';
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

import { GradientButton } from '../../components';
import { Images, mailformat, Color, Gifs, Icons, Colors } from '../../constants';
import { globalStyle } from '../../styles/global-style';
import { loginUser } from '../../redux/actions/user-actions';

const LoginScreen = (props) => {
  const { navigation } = props;

  //Actions to dispatch
  const dispatch = useDispatch();

  const { appLabels } = useSelector((state) => state.appState);

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(null);
  const [password, setPassword] = React.useState('');
  const [passError, setPassError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

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

  const onGoogleIconPress = () => {
    navigation.navigate('RegisterWithGoogle');
  };

  const onFacebookIconPress = () => {
    navigation.navigate('RegisterWithFacebook');
  };

  return (
    <AuthContainer blur>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={globalStyle.logo} source={Gifs.chat_signal_logo} />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AuthInput
            style={styles.input}
            label={appLabels.email}
            placeholder={appLabels.email}
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
            error={emailError}
          />
          <AuthInput
            style={styles.input}
            label={appLabels.password}
            placeholder={appLabels.password}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={passError}
          />

          <View style={{ alignSelf: 'flex-end' }}>
            <TextButton
              fontType={'bold'}
              fontSize={14}
              title={appLabels.forgot_password}
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}
            />
          </View>

          <GradientButton
            type={'primary'}
            title={appLabels.login}
            style={styles.loginButton}
            // onPress={() => login()}
            onPress={() => onLoginPress()}
            loading={loading}
          />

          <AppText
            color={Colors.white}
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
              icon={Icons.google_icon}
              buttonColor={Colors.google}
              onPress={onGoogleIconPress}
            />

            <IconButton
              icon={Icons.facebook_icon}
              buttonColor={Colors.facebook}
              onPress={onFacebookIconPress}
            />
          </View>

          <TextButton
            style={{ alignSelf: 'center' }}
            fontType={'bold'}
            title={appLabels.dont_have_an_account + '  ' + appLabels.create_one}
            onPress={() => {
              navigation.navigate('RegisterLanding');
            }}
          />
        </View>
      </ScrollView>
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
