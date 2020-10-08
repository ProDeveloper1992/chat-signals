import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AuthStackNavigator from './auth-stack-navigator';
import MainStackNavigator from './main-stack-navigator';
import {AppLoading} from '../screens';
import {StatusBar} from 'react-native';
import {Colors} from '../constants';
import {useSelector} from 'react-redux';

const RootStack = createStackNavigator();

export default function () {
  const {appLoading} = useSelector((state) => state.appState);
  const {isLoggedIn} = useSelector((state) => state.userState);

  function renderScreens() {
    if (appLoading) {
      return <RootStack.Screen name={'Splash'} component={AppLoading} />;
    } else if (!appLoading && isLoggedIn) {
      return (
        <RootStack.Screen name={'main-stack'} component={MainStackNavigator} />
      );
    }
    return (
      <RootStack.Screen name={'auth-stack'} component={AuthStackNavigator} />
    );
  }

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={Colors.black}
      />
      <NavigationContainer>
        <RootStack.Navigator
          // initialRouteName={isLoggedIn ? 'main-stack' : 'auth-stack'}
          initialRouteName={'app-loading-screen'}
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}>
          {/* {renderScreens()} */}
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
