import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { useDispatch } from 'react-redux';

import {
  GradientButton,
  AuthInput,
  Loading,
  AuthContainer,
  BackHeader,
  CountryPicker,
  GenderPicker,
} from '../../components';
import {mailformat, Colors} from '../../constants';
import { loginUser } from '../../redux/actions/user-actions';

const RegisterWithEmail = (props) => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const [userName, setUserName] = React.useState('');
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

  const labels = ['User Details', 'Registration'];
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

      if (confpassword != password) {
        isValid = false;
        setConfPassError('Passwords not matching!');
      } else {
        setConfPassError(null);
      }

      if (isValid) {
        try {
          //   setLoading(true);
          //   await register(email, password);
          dispatch(loginUser())
          navigation.navigate('main-stack');
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
      <Text style={[styles.label, {color: Colors.greydark}]}>{title}</Text>
    );
  };

  const renderPage = () => {
    if (stepPosition == 0) {
      return (
        <View>
          <AuthInput
            style={styles.input}
            label={'Username'}
            placeholder={'User name'}
            keyboardType={'email-address'}
            value={userName}
            onChangeText={setUserName}
          />
          <SectionLable title={'I am...'} />
          <GenderPicker />
          <SectionLable title={"I'm looking for..."} />
          <GenderPicker />
          <SectionLable title={'Country'} />
          <CountryPicker />
          <AuthInput
            style={styles.input}
            label={'Postal code'}
            placeholder={'Postal Code'}
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
            label={'Email'}
            placeholder={'E-mail address'}
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
            error={emailError}
          />

          <AuthInput
            label={'Password'}
            style={styles.input}
            placeholder={'password'}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={passError}
          />

          <AuthInput
            style={styles.input}
            label={'Confirm password'}
            placeholder={'confirm password'}
            secureTextEntry
            value={confpassword}
            onChangeText={setConfPassword}
            error={confPassError}
          />
          <Loading loading={loading} />
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
              <Text style={[styles.label, {color: Colors.ui_primary}]}>
                {'Skip'}
              </Text>
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
        title={stepPosition == 0 ? 'Next' : 'Register'}
        style={{marginVertical: 20}}
        onPress={() => onBottomButtonPress()}
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
  label: {
    fontSize: 16,
    fontWeight: '700',
    // paddingTop: 5,
  },
});

export default RegisterWithEmail;
