import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Login,
  RegisterWithEmail,
  Landing,
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
      <AuthStack.Screen
        name={'RegisterWithEmail'}
        component={RegisterWithEmail}
      />
    </AuthStack.Navigator>
  );
}
