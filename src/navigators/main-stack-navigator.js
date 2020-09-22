import React, { useEffect } from 'react';
import { SafeAreaView, Alert, BackHandler } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Contact, Chat, DailyCoins, CoinPurchase, ModeratorProfile} from '../screens';
import BottomTabBar from '../components/BottomTabBar';
import {Colors} from '../constants';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerStyle: {backgroundColor: Colors.white},
  headerTintColor: Colors.ui_primary_dark,
  headerTitleStyle: {fontWeight: 'bold'},
};

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
    </Stack.Navigator>
  );
}

function ContactStack() {
  return (
    <Stack.Navigator
      initialRouteName="Contact"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{title: 'Contact'}}
      />
    </Stack.Navigator>
  );
}

function ChatStack() {
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Chat" component={Chat} options={{title: 'Chat'}} />
    </Stack.Navigator>
  );
}

function DailyCoinStack() {
  return (
    <Stack.Navigator
      initialRouteName="Daily Coins"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Daily Coins"
        component={DailyCoins}
        options={{title: 'Daily Coins'}}
      />
    </Stack.Navigator>
  );
}

function CoinPurchaseStack() {
  return (
    <Stack.Navigator
      initialRouteName="Coin Purchase"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Coin Purchase"
        component={CoinPurchase}
        options={{title: 'Coin Purchase'}}
      />
    </Stack.Navigator>
  );
}

const BottomTabNavigator = () => {
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
        component={ContactStack}
        options={{
          tabBarLabel: 'Contact',
        }}
      />
      <Tab.Screen
        name="ThirdTabStack"
        component={ChatStack}
        options={{
          tabBarLabel: 'Chat',
        }}
      />
      <Tab.Screen
        name="FourthTabStack"
        component={DailyCoinStack}
        options={{
          tabBarLabel: 'Daily Coins',
        }}
      />
      <Tab.Screen
        name="FifthTabStack"
        component={CoinPurchaseStack}
        options={{
          tabBarLabel: 'Purchase',
        }}
      />
    </Tab.Navigator>
  );
};

export default function MainStackNavigator() {
  useEffect(()=>{
    SplashScreen.hide();
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
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigator}
        // options={{title: 'Home'}}
      />
      <Stack.Screen
      name="ModeratorProfile"
      component={ModeratorProfile}
      options={{title: 'Moderator Profile'}}
    />
    </Stack.Navigator>
  );
}
