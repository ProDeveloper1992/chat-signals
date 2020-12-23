import React from 'react';
import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';

import { GradientButton, AuthContainer, BackHeader } from '../../components';
import { Icons, Gifs } from '../../constants';
import { globalStyle } from '../../styles/global-style';
import styles from './style';

const RegisterLanding = (props) => {
  const { navigation } = props;

  const { appLabels } = useSelector((state) => state.appState);

  return (
    <AuthContainer blur>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <Image style={globalStyle.logo} source={Gifs.chat_signal_logo} />
      <View style={styles.container}>
        <GradientButton
          type={'primary'}
          title={appLabels.register_with_email}
          icon={<Image source={Icons.mail_icon} style={styles.buttonIcon} />}
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
