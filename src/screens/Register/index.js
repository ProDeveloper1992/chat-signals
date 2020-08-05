import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

import {Input} from '../../components/Input';
import {Error} from '../../components/Error';
import {IconButton} from '../../components/IconButton';
import {AuthContainer} from '../../components/AuthContainer';
import {AuthContext} from '../../contexts/AuthContext';
import {Loading} from '../../components/Loading';
import {GradientButton} from '../../components/Buttons';
import {Images} from '../../constants';

export function Register({navigation}) {
  const {register} = React.useContext(AuthContext);
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <AuthContainer>
      <Image
        style={styles.logo}
        source={Images.app_logo}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Error error={error} />
        <Input
          style={styles.input}
          placeholder={'User name'}
          keyboardType={'email-address'}
          value={userName}
          onChangeText={setUserName}
        />

        <Input
          style={styles.input}
          placeholder={'E-mail address'}
          keyboardType={'email-address'}
          value={email}
          onChangeText={setEmail}
        />

        <Input
          style={styles.input}
          placeholder={'password'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <GradientButton
          title={'Register'}
          style={styles.loginButton}
          onPress={async () => {
            try {
              setLoading(true);
              await register(email, password);
              navigation.pop();
            } catch (e) {
              setError(e.message);
              setLoading(false);
            }
          }}
        />
      </View>
      <Loading loading={loading} />
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
  },
  loginButton: {
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
    marginTop: 50,
  },
});
