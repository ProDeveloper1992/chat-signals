import React from 'react';
import {StyleSheet, Image, View, ScrollView, Platform} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {GradientButton, AuthContainer, BackHeader} from '../../components';
import {Images} from '../../constants';
import {globalStyle} from '../../styles/globalStyle';

export function RegisterLanding({navigation}) {
  const {colors} = useTheme();

  return (
    <AuthContainer blur>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <Image style={globalStyle.logo} source={Images.app_logo} />
      <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 15}}>
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
          onPress={() => navigation.navigate('RegisterWithGoogle')}
        />
        <GradientButton
          type={'facebook'}
          title={'Register With Facebook'}
          icon={'mail'}
          iconColor={colors.white}
          style={styles.registerButtom}
          onPress={() => navigation.navigate('RegisterWithFacebook')}
        />
      </View>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
  },
  registerButtom: {
    paddingVertical: 12,
    marginVertical: 8,
  },
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 16,
  },
});
