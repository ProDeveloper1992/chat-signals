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
} from '../../components';
import {Images} from '../../constants';
import {isIphoneX} from '../../utils/globalFunctions';

export function RegisterWithEmail({navigation}) {
  const {register} = React.useContext(AuthContext);
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const {colors} = useTheme();

  return (
    <AuthContainer>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={styles.logo} source={Images.app_logo} />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <AuthInput
            style={styles.input}
            placeholder={'User name'}
            keyboardType={'email-address'}
            value={userName}
            onChangeText={setUserName}
          />

          <AuthInput
            style={styles.input}
            placeholder={'E-mail address'}
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
          />

          <AuthInput
            style={styles.input}
            placeholder={'password'}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <GradientButton
            title={'Register'}
            style={styles.registerButtom}
            onPress={async () => {
              try {
                setLoading(true);
                await register(email, password);
                navigation.pop();
              } catch (e) {
                setLoading(false);
              }
            }}
          />
          <Loading loading={loading} />
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
    marginVertical: 32,
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
