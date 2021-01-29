import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { useDispatch, useSelector } from 'react-redux';

import {
  AppButton,
  AuthInput,
  Loading,
  AuthContainer,
  BackHeader,
  GenderPicker,
  AppText,
  CountryPicker,
} from '../../components';
import { mailformat, Colors } from '../../constants';
import { EmailIcon, PasswordIcon, ProfileIcon } from '../../constants/svg-icons';
import { registerUser, setSelectedGender, setSelectedLookingGender } from '../../redux/actions/user-actions';

const RegisterWithEmail = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const { appLabels } = useSelector((state) => state.appState);

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

  const onBottomButtonPress = async () => {
    if (stepPosition == 0) {
      setStepPosition(1);
    } else {
      let isValid = true;
      if (userName.trim() == 0) {
        isValid = false;
        setUsernameError('Username must not be empty!');
        // setEmailError(appLabels.email_error_1);
      } else {
        setUsernameError(null);
      }
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

      if (confpassword != password) {
        isValid = false;
        setConfPassError(appLabels.password_error_2);
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

  const SectionLable = ({ title }) => {
    return (
      <AppText type={'regular'} size={14} color={Colors.black}>
        {title}
      </AppText>
    );
  };

  const onSelectUserGenderItem = (genderItem) => {
    dispatch(setSelectedGender(genderItem));
  };

  const onSelectLookingGenderItem = (genderItem) => {
    dispatch(setSelectedLookingGender(genderItem));
  };

  const renderPage = () => {
    if (stepPosition == 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AppText
            type={'bold'}
            size={24}
            style={{ textAlign: 'center', marginVertical: 20 }}>
            {"Create account"}
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

          <AuthInput
            label={appLabels.confirm_password}
            placeholder={appLabels.confirm_password}
            secureTextEntry
            value={confpassword}
            onChangeText={setConfPassword}
            error={confPassError}
            icon={<PasswordIcon width={24} height={24} />}
          />
          <AppButton
            // disabled={postalCode.trim() === ''}
            title={appLabels.next}
            style={{ marginBottom: 20, marginTop: "20%" }}
            onPress={() => onBottomButtonPress()}
            loading={loading}
          />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AppText
            type={'bold'}
            size={24}
            style={{ textAlign: 'center', marginVertical: 20 }}>
            {"Create account"}
          </AppText>
          <AuthInput
            label={appLabels.user_name}
            placeholder={appLabels.user_name}
            keyboardType={'email-address'}
            value={userName}
            onChangeText={setUserName}
            error={userNameError}
            icon={<ProfileIcon width={24} height={24} />}
          />
          <AuthInput
            label={appLabels.postal_code}
            placeholder={appLabels.postal_code}
            keyboardType={'number-pad'}
            value={postalCode}
            onChangeText={setPostalCode}
          />
          <SectionLable title={appLabels.i_am} />
          <GenderPicker type={'user'} onSelectGenderItem={(item) => onSelectUserGenderItem(item)} />
          <SectionLable title={appLabels.i_am_looking_for} />
          <GenderPicker type={'opponent'} onSelectGenderItem={(item) => onSelectLookingGenderItem(item)} />
          {/* <SectionLable title={appLabels.country} /> */}
          {/* <CountryPicker /> */}
          <AppButton
            // disabled={postalCode.trim() === ''}
            title={appLabels.register}
            style={{ marginBottom: 20, marginTop: "20%" }}
            onPress={() => onBottomButtonPress()}
            loading={loading}
          />
        </View>
      );
    }
  };

  return (
    <AuthContainer>
      {/* <BackHeader
        onBackPress={() => onBackPress()}
      /> */}
      {/* <StepIndicator
        stepCount={stepCount}
        customStyles={stepIndicatorStyle}
        currentPosition={stepPosition}
        labels={labels}
      /> */}
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, justifyContent: 'center' }}>{renderPage()}</View>
        </ScrollView>
        {/* <AppButton
          // disabled={postalCode.trim() === ''}
          title={stepPosition == 0 ? appLabels.next : appLabels.register}
          style={{ marginVertical: 20 }}
          onPress={() => onBottomButtonPress()}
          loading={loading}
        /> */}
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
