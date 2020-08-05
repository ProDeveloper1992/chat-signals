import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  Input,
  TextButton,
  Error,
  AuthContainer,
  Loading,
} from '../../components';
import {AuthContext} from '../../contexts/AuthContext';
import {GradientButton} from '../../components/Buttons';
import {Images} from '../../constants';

export function Login({navigation}) {
  const {login} = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const {colors} = useTheme();

  return (
    <AuthContainer>
      <Image
        style={styles.logo}
        source={{
          uri: Images.app_logo,
        }}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Error error={error} />
        <Input
          style={styles.input}
          placeholder={'Email'}
          keyboardType={'email-address'}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.input}
          placeholder={'Password'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={{alignSelf: 'flex-end'}}>
          <TextButton
            title={'Forgot Password?'}
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}
          />
        </View>

        <GradientButton
          type={'primary'}
          title={'Login'}
          style={styles.loginButton}
          onPress={async () => {
            try {
              setLoading(true);
              await login(email, password);
            } catch (e) {
              setError(e.message);
              setLoading(false);
            }
          }}
        />
        <TextButton
          title={"Don't you have an account? Create one"}
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </View>
      <Loading loading={loading} />
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 5,
  },
  loginButton: {
    marginVertical: 20,
  },
  logo: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
  },
});
