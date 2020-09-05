import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

import {GradientButton, AuthContainer, BackHeader} from '../../components';
import {Images, Colors} from '../../constants';
import {globalStyle} from '../../styles/global-style';

const RegisterLanding = (props) => {
  const {navigation} = props;

  return (
    <AuthContainer blur>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <Image style={globalStyle.logo} source={Images.app_logo} />
      <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 15}}>
        <GradientButton
          type={'primary'}
          title={'Register With Email'}
          icon={'mail'}
          iconColor={Colors.white}
          style={styles.registerButtom}
          onPress={() => navigation.navigate('RegisterWithEmail')}
        />
        <GradientButton
          type={'google'}
          title={'Register With Google'}
          icon={'mail'}
          iconColor={Colors.white}
          style={styles.registerButtom}
          onPress={() => navigation.navigate('RegisterWithGoogle')}
        />
        <GradientButton
          type={'facebook'}
          title={'Register With Facebook'}
          icon={'mail'}
          iconColor={Colors.white}
          style={styles.registerButtom}
          onPress={() => navigation.navigate('RegisterWithFacebook')}
        />
      </View>
    </AuthContainer>
  );
};

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

export default RegisterLanding;
