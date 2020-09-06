import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Setting} from '../screens';
import BottomTabBar from '../components/BottomTabBar';
import {Colors} from '../constants';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: Colors.white},
        headerTintColor: Colors.black,
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
        headerStyle: {backgroundColor: Colors.white},
        headerTintColor: Colors.black,
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

export default function MainStackNavigator() {
  return (
    <Tab.Navigator
      // initialRouteName="FirstTabStack"
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
        name="FirstTabStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="SecondTabStack"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Chat',
        }}
      />
      <Tab.Screen
        name="ThirdTabStack"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen
        name="FourthTabStack"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen
        name="FifthTabStack"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}
