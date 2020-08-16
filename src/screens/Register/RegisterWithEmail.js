import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import StepIndicator from 'react-native-step-indicator';

import {AuthContext} from '../../contexts/AuthContext';
import {
  GradientButton,
  AuthInput,
  Loading,
  AuthContainer,
  BackHeader,
  CountryPicker,
  GenderPicker,
} from '../../components';

export function RegisterWithEmail({navigation}) {
  const {register} = React.useContext(AuthContext);
  const [userName, setUserName] = React.useState('');
  const [postalCode, setPostalCode] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confpassword, setConfPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [stepPosition, setStepPosition] = React.useState(0);
  const [stepCount, setStepCount] = React.useState(2);
  const {colors} = useTheme();

  const labels = ['User Details', 'Registration'];
  const stepIndicatorStyle = {
    stepIndicatorSize: 26,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 0.5,
    separatorStrokeFinishedWidth: 3,
    currentStepStrokeWidth: 3,
    stepStrokeWidth: 1,
    stepStrokeCurrentColor: colors.primary,
    stepStrokeFinishedColor: colors.primary,
    stepStrokeUnFinishedColor: colors.primary,
    separatorFinishedColor: colors.primary,
    separatorUnFinishedColor: colors.greydark,
    stepIndicatorFinishedColor: colors.primary,
    stepIndicatorUnFinishedColor: colors.white,
    stepIndicatorCurrentColor: colors.white,
    stepIndicatorLabelCurrentColor: colors.primary,
    stepIndicatorLabelFinishedColor: colors.white,
    stepIndicatorLabelUnFinishedColor: colors.greydark,
    currentStepLabelColor: colors.primary,
    labelSize: 12,
    labelColor: colors.greydark,
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
      try {
        setLoading(true);
        await register(email, password);
        navigation.pop();
      } catch (e) {
        setLoading(false);
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
    return <Text style={styles.lable}>{title}</Text>;
  };

  const renderPage = () => {
    if (stepPosition == 0) {
      return (
        <View>
          <SectionLable title={'Username'} />
          <AuthInput
            style={styles.input}
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
          <SectionLable title={'Postal code'} />
          <AuthInput
            style={styles.input}
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
          <SectionLable title={'Email'} />
          <AuthInput
            style={styles.input}
            placeholder={'E-mail address'}
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
          />

          <SectionLable title={'Password'} />
          <AuthInput
            style={styles.input}
            placeholder={'password'}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <SectionLable title={'Confirm Password'} />
          <AuthInput
            style={styles.input}
            placeholder={'confirm password'}
            secureTextEntry
            value={confpassword}
            onChangeText={setConfPassword}
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
              <Text style={[styles.lable, {color: colors.primary}]}>
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
        style={{marginTop: 20}}
        onPress={() => onBottomButtonPress()}
      />
    </AuthContainer>
  );
}

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
  lable: {
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 5,
  },
});
