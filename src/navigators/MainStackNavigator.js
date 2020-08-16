import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../screens/Home';

const MainStack = createStackNavigator();

export function MainStackNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={'Home'}
        component={Home}
        options={{
          title: 'Home',
        }}
      />
    </MainStack.Navigator>
  );
}
