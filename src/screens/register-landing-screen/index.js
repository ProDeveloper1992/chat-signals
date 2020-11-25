import React from 'react';
import {Image, View} from 'react-native';
import Icon from 'react-native-ionicons';
import {useSelector} from 'react-redux';

import {GradientButton, AuthContainer, BackHeader} from '../../components';
import {Images, Colors, Icons} from '../../constants';
import {globalStyle} from '../../styles/global-style';
import styles from './style';

const RegisterLanding = (props) => {
  const {navigation} = props;

  const {appLabels} = useSelector((state) => state.appState);

  return (
    <AuthContainer blur>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <Image style={globalStyle.logo} source={Images.app_logo} />
      <View style={styles.container}>
        <GradientButton
          type={'primary'}
          title={appLabels.register_with_email}
          icon={
            <Icon
              name={'mail'}
              color={Colors.white}
              style={{marginEnd: 10}}
              size={24}
            />
          }
          style={styles.registerButtom}
          onPress={() => navigation.navigate('RegisterWithEmail')}
        />
        <GradientButton
          type={'google'}
          title={appLabels.register_with_google}
          icon={<Image source={Icons.google_icon} style={styles.buttonIcon} />}
          style={styles.registerButtom}
          onPress={() => navigation.navigate('RegisterWithGoogle')}
        />
        <GradientButton
          type={'facebook'}
          title={appLabels.register_with_facebook}
          icon={
            <Image source={Icons.facebook_icon} style={styles.buttonIcon} />
          }
          style={styles.registerButtom}
          onPress={() => navigation.navigate('RegisterWithFacebook')}
        />
      </View>
    </AuthContainer>
  );
};

export default RegisterLanding;
