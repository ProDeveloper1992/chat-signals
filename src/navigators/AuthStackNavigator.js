import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Login,
  RegisterLanding,
  RegisterWithEmail,
  Landing,
  ForgotPassword,
} from '../screens';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();

export function AuthStackNavigator() {
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
      <AuthStack.Screen name={'ForgotPassword'} component={ForgotPassword} />
    </AuthStack.Navigator>
  );
}
