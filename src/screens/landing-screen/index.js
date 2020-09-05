import React, {Component} from 'react';
import {View, StyleSheet, Image, Platform} from 'react-native';
import {GradientButton, AuthContainer} from '../../components';
import {Images} from '../../constants';
import {isIphoneX} from '../../utils/common';
import {globalStyle} from '../../styles/global-style';

const LandingScreen = (props) => {
  const {navigation} = props;

  const onRegister = () => {
    navigation.navigate('RegisterLanding');
  };

  const onLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <AuthContainer>
      <Image
        style={[globalStyle.logo, {marginTop: isIphoneX() ? 60 : 50}]}
        source={Images.app_logo}
      />
      <View style={styles.bottomView}>
        <View style={{marginEnd: 8, flex: 1}}>
          <GradientButton
            type={'light'}
            title={'Register'}
            style={{paddingVertical: Platform.OS === 'ios' ? 18 : 15}}
            onPress={onRegister}
          />
        </View>
        <View style={{marginStart: 8, flex: 1}}>
          <GradientButton
            type={'primary'}
            title={'Login'}
            style={{paddingVertical: Platform.OS === 'ios' ? 18 : 15}}
            onPress={onLogin}
          />
        </View>
      </View>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  bottomView: {
    bottom: 25,
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default LandingScreen;
