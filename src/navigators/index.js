import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthStackNavigator from './auth-stack-navigator';
import MainStackNavigator from './main-stack-navigator';
import { AppLoading } from '../screens';
import { StatusBar } from 'react-native';
import { Colors } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { navigationRef } from './root-navigation';
import linking from '../utils/linking';
import { getAppLanguages } from '../redux/actions/app-actions';

const RootStack = createStackNavigator();

export default function (props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppLanguages());
  }, [])

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={Colors.ui_primary}
      />
      <NavigationContainer ref={navigationRef} linking={linking}>
        <RootStack.Navigator
          initialRouteName={'app-loading-screen'}
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}>
          <RootStack.Screen
            name={'app-loading-screen'}
            component={AppLoading}
          />
          <RootStack.Screen
            name={'main-stack'}
            component={MainStackNavigator}
          />
          <RootStack.Screen
            name={'auth-stack'}
            component={AuthStackNavigator}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}
