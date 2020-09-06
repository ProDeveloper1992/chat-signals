import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {
  TextButton,
  AuthContainer,
  Loading,
  AuthInput,
  BackHeader,
} from '../../components';
import {useDispatch} from 'react-redux';

import {GradientButton} from '../../components';
import {Images, mailformat} from '../../constants';
import {globalStyle} from '../../styles/global-style';
import {loginUser} from '../../redux/actions/user-actions';

const LoginScreen = (props) => {
  const {navigation} = props;

  //Actions to dispatch
  const dispatch = useDispatch();

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
        await login(email, password);
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
            label={'Email'}
            placeholder={'Email'}
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
            error={emailError}
          />
          <AuthInput
            style={styles.input}
            label={'Password'}
            placeholder={'Password'}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={passError}
          />

          <View style={{alignSelf: 'flex-end'}}>
            <TextButton
              title={'Forgot Password?'}
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}
            />
          </View>

          <GradientButton
            type={'primary'}
            title={'Login'}
            style={styles.loginButton}
            onPress={() => login()}
            // onPress={() => onLoginPress()}
          />
          <TextButton
            title={"Don't you have an account? Create one"}
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