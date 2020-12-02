import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {
  GradientButton,
  AuthInput,
  AuthContainer,
  BackHeader,
  AppText,
} from '../../components';
import {Colors, Images, mailformat} from '../../constants';
import {globalStyle} from '../../styles/global-style';
import {forgotPassword} from '../../redux/actions/user-actions';
import {useDispatch, useSelector} from 'react-redux';

const ForgotPassword = (props) => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const {appLabels} = useSelector((state) => state.appState);

  const [email, SetEmail] = useState('');
  const [emailError, setEmailError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onForgotPasswordClick = async () => {
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

    if (isValid) {
      try {
        //   setLoading(true);
        //   await register(email, password);
        let requestData = {
          language: 'en',
          email: email,
        };
        setLoading(true);
        const response = await dispatch(forgotPassword(requestData));
        setLoading(false);
        if (response.meta.status) {
          // navigation.navigate('main-stack');
        }
      } catch (e) {
        setLoading(false);
      }
    }
  };

  return (
    <AuthContainer blur>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <Image style={globalStyle.logo} source={Images.forgot_heart_logo} />
      <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 20}}>
        <AppText
          type={'medium'}
          color={Colors.white}
          style={{
            paddingHorizontal: 5,
            paddingVertical: 10,
          }}>
          {
            'Forgot Password?  Not bad.  As a registered member, you can now request a new password using your email address.'
          }
        </AppText>
        <AuthInput
          placeholder={'Email'}
          keyboardType={'email-address'}
          value={email}
          onChangeText={SetEmail}
          style={{margintVertical: 8}}
          label={appLabels.email}
          placeholder={appLabels.email}
          error={emailError}
        />
        <GradientButton
          type={'primary'}
          title={'Request New Password'}
          style={{marginTop: 20}}
          onPress={() => onForgotPasswordClick()}
          loading={loading}
        />
      </View>
    </AuthContainer>
  );
};

export default ForgotPassword;
