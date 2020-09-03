import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../screens';
import {Setting} from '../screens/Setting';
import BottomTabBar from '../components/BottomTabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: '#42f44b'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Home Page'}}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: {backgroundColor: '#42f44b'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="Settings"
        component={Setting}
        options={{title: 'Setting Page'}}
      />
    </Stack.Navigator>
  );
}

export function MainStackNavigator() {
  return (
    <Tab.Navigator
      // initialRouteName="HomeStack"
      // tabBarOptions={{
      //   activeTintColor: '#42f44b',
      // }}
      tabBar={(props) => (
        <>
          <BottomTabBar {...props} />
          <SafeAreaView style={{backgroundColor: 'white'}} />
        </>
      )}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => <Text>HOME</Text>,
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => <Text>Setting</Text>,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => <Text>Setting</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
