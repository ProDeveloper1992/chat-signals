import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  Heading,
  Input,
  Button,
  TextButton,
  Error,
  AuthContainer,
  Loading,
} from '../../components';
import {AuthContext} from '../../contexts/AuthContext';

export function Login({navigation}) {
  const {login} = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <AuthContainer>
      <Heading style={styles.title}>LOGIN</Heading>
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

      <Text
        style={{
          alignSelf: 'flex-end',
          color: 'white',
          marginVertical: 10,
          marginEnd: 10,
          // fontSize:14
        }}>
        Forgot Password?
      </Text>

      <Button
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
          navigation.navigate('Registration');
        }}
      />
      <Loading loading={loading} />
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
  },
  input: {
    marginVertical: 5,
  },
  loginButton: {
    marginVertical: 20,
  },
});
