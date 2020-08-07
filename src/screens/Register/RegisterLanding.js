import React from 'react';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {AuthContext} from '../../contexts/AuthContext';
import {
  GradientButton,
  AuthInput,
  Loading,
  AuthContainer,
  BackHeader,
  IconButton,
} from '../../components';
import {Images} from '../../constants';
import {isIphoneX} from '../../utils/globalFunctions';

export function RegisterLanding({navigation}) {
  const {colors} = useTheme();

  return (
    <AuthContainer>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={styles.logo} source={Images.app_logo} />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <GradientButton
            type={'primary'}
            title={'Register With Email'}
            icon={'mail'}
            iconColor={colors.white}
            style={styles.registerButtom}
            onPress={() => navigation.navigate('RegisterWithEmail')}
          />
          <GradientButton
            type={'google'}
            title={'Register With Google'}
            icon={'mail'}
            iconColor={colors.white}
            style={styles.registerButtom}
            onPress={() => {}}
          />
          <GradientButton
            type={'facebook'}
            title={'Register With Facebook'}
            icon={'mail'}
            iconColor={colors.white}
            style={styles.registerButtom}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
  },
  registerButtom: {
    paddingVertical: 10,
    marginVertical: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 16,
  },
  logo: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: isIphoneX() ? 50 : 0,
  },
});
