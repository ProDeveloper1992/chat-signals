import React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {useDispatch, useSelector} from 'react-redux';

import {
  GradientButton,
  AuthInput,
  Loading,
  AuthContainer,
  BackHeader,
  CountryPicker,
  GenderPicker,
  AppText,
} from '../../components';
import {mailformat, Colors} from '../../constants';
import {registerUser} from '../../redux/actions/user-actions';

const RegisterWithEmail = (props) => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const {appStrings} = useSelector((state) => state.appState);

  const [userName, setUserName] = React.useState('');
  const [userNameError, setUsernameError] = React.useState(null);
  const [postalCode, setPostalCode] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(null);
  const [password, setPassword] = React.useState('');
  const [passError, setPassError] = React.useState(null);
  const [confpassword, setConfPassword] = React.useState('');
  const [confPassError, setConfPassError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [stepPosition, setStepPosition] = React.useState(0);
  const [stepCount, setStepCount] = React.useState(2);

  const labels = [
    appStrings.register.user_details,
    appStrings.register.registration,
  ];
  const stepIndicatorStyle = {
    stepIndicatorSize: 26,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 0.5,
    separatorStrokeFinishedWidth: 3,
    currentStepStrokeWidth: 3,
    stepStrokeWidth: 1,
    stepStrokeCurrentColor: Colors.ui_primary,
    stepStrokeFinishedColor: Colors.ui_primary,
    stepStrokeUnFinishedColor: Colors.ui_primary,
    separatorFinishedColor: Colors.ui_primary,
    separatorUnFinishedColor: Colors.greydark,
    stepIndicatorFinishedColor: Colors.ui_primary,
    stepIndicatorUnFinishedColor: Colors.white,
    stepIndicatorCurrentColor: Colors.white,
    stepIndicatorLabelCurrentColor: Colors.ui_primary,
    stepIndicatorLabelFinishedColor: Colors.white,
    stepIndicatorLabelUnFinishedColor: Colors.greydark,
    currentStepLabelColor: Colors.ui_primary,
    labelSize: 12,
    labelColor: Colors.greydark,
  };

  const onStepPress = (position) => {
    setStepPosition(position);
  };

  const onSkipPress = () => {
    setStepPosition(1);
  };

  const onBottomButtonPress = async () => {
    if (stepPosition == 0) {
      setStepPosition(1);
    } else {
      let isValid = true;
      if (userName.trim() == 0) {
        isValid = false;
        setUsernameError('Username must not be empty!');
        // setEmailError(appStrings.register.email_error_1);
      } else {
        setUsernameError(null);
      }
      if (email.trim() == 0) {
        isValid = false;
        setEmailError(appStrings.register.email_error_1);
      } else if (!email.match(mailformat)) {
        isValid = false;
        setEmailError(appStrings.register.email_error_2);
      } else {
        setEmailError(null);
      }

      if (password.trim() == 0) {
        isValid = false;
        setPassError(appStrings.register.password_error_1);
      } else {
        setPassError(null);
      }

      if (confpassword != password) {
        isValid = false;
        setConfPassError(appStrings.register.password_error_2);
      } else {
        setConfPassError(null);
      }

      if (isValid) {
        try {
          //   setLoading(true);
          //   await register(email, password);
          let requestData = {
            language: 'en',
            username: userName,
            email: email,
            password: password,
          };
          setLoading(true);
          const response = await dispatch(registerUser(requestData));
          setLoading(false);
          if (response.meta.status) {
            // navigation.navigate('main-stack');
          }
        } catch (e) {
          setLoading(false);
        }
      }
    }
  };

  const onBackPress = () => {
    if (stepPosition == 0) {
      navigation.goBack();
    } else {
      setStepPosition(0);
    }
  };

  const SectionLable = ({title}) => {
    return (
      <AppText type={'bold'} size={16} color={Colors.greydark}>
        {title}
      </AppText>
    );
  };

  const renderPage = () => {
    if (stepPosition == 0) {
      return (
        <View>
          <SectionLable title={appStrings.register.i_am} />
          <GenderPicker />
          <SectionLable title={appStrings.register.i_am_looking_for} />
          <GenderPicker />
          <SectionLable title={appStrings.register.country} />
          <CountryPicker />
          <AuthInput
            style={styles.input}
            label={appStrings.register.postal_code}
            placeholder={appStrings.register.postal_code}
            keyboardType={'number-pad'}
            value={postalCode}
            onChangeText={setPostalCode}
          />
        </View>
      );
    } else {
      return (
        <View>
          <AuthInput
            style={styles.input}
            label={appStrings.register.user_name}
            placeholder={appStrings.register.user_name}
            keyboardType={'email-address'}
            value={userName}
            onChangeText={setUserName}
            error={userNameError}
          />
          <AuthInput
            style={styles.input}
            label={appStrings.register.email}
            placeholder={appStrings.register.email}
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
            error={emailError}
          />

          <AuthInput
            label={appStrings.register.password}
            style={styles.input}
            placeholder={appStrings.register.password}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={passError}
          />

          <AuthInput
            style={styles.input}
            label={appStrings.register.confirm_password}
            placeholder={appStrings.register.confirm_password}
            secureTextEntry
            value={confpassword}
            onChangeText={setConfPassword}
            error={confPassError}
          />
        </View>
      );
    }
  };

  return (
    <AuthContainer blur>
      <BackHeader
        onBackPress={() => onBackPress()}
        rightContent={
          stepPosition == 0 && (
            <TouchableOpacity onPress={() => onSkipPress()}>
              <AppText type={'bold'} size={16} color={Colors.ui_primary}>
                {appStrings.register.skip}
              </AppText>
            </TouchableOpacity>
          )
        }
      />
      <StepIndicator
        stepCount={stepCount}
        customStyles={stepIndicatorStyle}
        currentPosition={stepPosition}
        labels={labels}
        onPress={(position) => onStepPress(position)}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingTop: 30}}>{renderPage()}</View>
      </ScrollView>
      <GradientButton
        title={
          stepPosition == 0
            ? appStrings.register.next
            : appStrings.register.register
        }
        style={{marginVertical: 20}}
        onPress={() => onBottomButtonPress()}
        loading={loading}
      />
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 25,
  },
  input: {
    marginVertical: 8,
  },
  registerButtom: {
    marginVertical: 32,
  },
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 16,
  },
});

export default RegisterWithEmail;
