import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  TextButton,
  AuthContainer,
  Loading,
  AuthInput,
  BackHeader,
} from '../../components';
import {AuthContext} from '../../contexts/AuthContext';
import {GradientButton} from '../../components';
import {Images} from '../../constants';
import {isIphoneX} from '../../utils/globalFunctions';
import {globalStyle} from '../../styles/globalStyle';

export function Login({navigation}) {
  const {login} = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const {colors} = useTheme();

  return (
    <AuthContainer blur>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={globalStyle.logo} source={Images.app_logo} />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <AuthInput
            style={styles.input}
            placeholder={'Email'}
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
          />
          <AuthInput
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
                setLoading(false);
              }
            }}
          />
          <TextButton
            title={"Don't you have an account? Create one"}
            onPress={() => {
              navigation.navigate('RegisterLanding');
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
    marginVertical: 5,
  },
  loginButton: {
    marginVertical: 20,
  },
});
