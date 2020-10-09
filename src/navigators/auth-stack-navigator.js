import React, {useEffect} from 'react';
import {Alert, BackHandler} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Login,
  RegisterLanding,
  RegisterWithEmail,
  Landing,
  ForgotPassword,
  RegisterWithGoogle,
  RegisterWithFacebook,
} from '../screens';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      mode={'modal'}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Landing'}>
      <AuthStack.Screen name={'Landing'} component={Landing} />
      <LoginStack.Screen name={'Login'} component={Login} />
      <AuthStack.Screen name={'RegisterLanding'} component={RegisterLanding} />
      <AuthStack.Screen
        name={'RegisterWithEmail'}
        component={RegisterWithEmail}
      />
      <AuthStack.Screen
        name={'RegisterWithGoogle'}
        component={RegisterWithGoogle}
      />
      <AuthStack.Screen
        name={'RegisterWithFacebook'}
        component={RegisterWithFacebook}
      />
      <AuthStack.Screen name={'ForgotPassword'} component={ForgotPassword} />
    </AuthStack.Navigator>
  );
}
