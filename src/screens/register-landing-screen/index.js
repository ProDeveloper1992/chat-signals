import React from 'react';
import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';

import { AppButton, AuthContainer, BackHeader } from '../../components';
import { Icons, Gifs, Colors } from '../../constants';
import { globalStyle } from '../../styles/global-style';
import styles from './style';

const RegisterLanding = (props) => {
  const { navigation } = props;

  const { appLabels } = useSelector((state) => state.appState);

  return (
    <AuthContainer blur>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <Image style={[globalStyle.logo, { tintColor: Colors.black }]} source={Gifs.chat_signal_logo} />
      <View style={styles.container}>
        <AppButton
          type={'primary'}
          title={appLabels.register_with_email}
          icon={<Image source={Icons.mail_icon} style={styles.buttonIcon} />}
          style={styles.registerButtom}
          onPress={() => navigation.navigate('RegisterWithEmail')}
        />
        <AppButton
          type={'google'}
          title={appLabels.register_with_google}
          icon={<Image source={Icons.google_icon} style={styles.buttonIcon} />}
          style={styles.registerButtom}
          onPress={() => navigation.navigate('RegisterWithGoogle')}
        />
        <AppButton
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
