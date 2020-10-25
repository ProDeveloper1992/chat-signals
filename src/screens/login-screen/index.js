import React from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {
  TextButton,
  AuthContainer,
  Loading,
  AuthInput,
  BackHeader,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';

import {GradientButton} from '../../components';
import {Images, mailformat} from '../../constants';
import {globalStyle} from '../../styles/global-style';
import {loginUser} from '../../redux/actions/user-actions';

const LoginScreen = (props) => {
  const {navigation} = props;

  //Actions to dispatch
  const dispatch = useDispatch();

  const {appStrings} = useSelector((state) => state.appState);

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
        await dispatch(loginUser(email, password));
        navigation.navigate('main-stack');
      } catch (e) {
        setLoading(false);
      }
    }
  };

  const login = (email, password) => {
    dispatch(loginUser('email'));
    // setLoading(true);
    //TODO: login method
  };

  return (
    <AuthContainer blur>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={globalStyle.logo} source={Images.app_logo} />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <AuthInput
            style={styles.input}
            label={appStrings.login.email}
            placeholder={appStrings.login.email}
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
            error={emailError}
          />
          <AuthInput
            style={styles.input}
            label={appStrings.login.password}
            placeholder={appStrings.login.password}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={passError}
          />

          <View style={{alignSelf: 'flex-end'}}>
            <TextButton
              title={appStrings.login.forgot_password}
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}
            />
          </View>

          <GradientButton
            type={'primary'}
            title={appStrings.login.login}
            style={styles.loginButton}
            // onPress={() => login()}
            onPress={() => onLoginPress()}
          />
          <TextButton
            title={
              appStrings.login.dont_have_an_account +
              appStrings.login.create_one
            }
            onPress={() => {
              navigation.navigate('RegisterLanding');
            }}
          />
          <Loading loading={loading} />
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
    marginVertical: 20,
  },
});

export default LoginScreen;
