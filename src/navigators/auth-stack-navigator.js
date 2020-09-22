import React, { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
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
import SplashScreen from 'react-native-splash-screen';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();

export default function AuthStackNavigator() {
  useEffect(()=>{
    SplashScreen.hide()
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  },[])
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
