import React, { useEffect } from 'react';
import { SafeAreaView, Alert, BackHandler, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home,
  Contact,
  Chat,
  CoinPurchase,
  ModeratorProfile,
  UserProfile,
  ChatDetail,
  FriendsScreen,
  AccountDetail,
  PrivacyPolicy,
  HelpAndSupport,
  UserPhotos,
  LikesScreen,
  KissesScreen,
  HeartsScreen,
  AppearanceScreen,
  CreateTicket,
  EditLocationScreen,
  StickersScreen
} from '../screens';
import BottomTabBar from '../components/BottomTabBar';
import { Colors } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppGiftBadge, AppText } from '../components';
import { getRemainingTime } from '../utils/common';
import { getCustomerAppearanceAndInterests, getCustomerProfileDetail, getStickersList } from '../redux/actions/user-actions';
import { getAppStrings, getGeneralSettings } from '../redux/actions/app-actions';
import { getUserChatList } from '../redux/actions/chat-actions';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: Colors.white },
  headerTintColor: Colors.ui_primary_dark,
  headerTitleStyle: { fontWeight: 'bold' },
};

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
}

function NotificationTabStack() {
  return (
    <Stack.Navigator
      initialRouteName="Contact"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{ title: 'Contact' }}
      />
    </Stack.Navigator>
  );
}

function ChatStack() {
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Chat" component={Chat} options={{ title: 'Chat' }} />
    </Stack.Navigator>
  );
}

function CoinPurchaseStack() {
  return (
    <Stack.Navigator
      initialRouteName="Coin Purchase"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Coin Purchase"
        component={CoinPurchase}
        options={{ title: 'Coin Purchase' }}
      />
    </Stack.Navigator>
  );
}

const BottomTabNavigator = () => {
  const dispatch = useDispatch();
  const { appLabels } = useSelector((state) => state.appState);
  const { userData } = useSelector((state) => state.userState);

  useEffect(() => {
    if (userData) {
      dispatch(getAppStrings());
      dispatch(getGeneralSettings());
      dispatch(getCustomerAppearanceAndInterests());
      dispatch(getUserChatList());
      dispatch(getCustomerProfileDetail());
      dispatch(getStickersList());
    }
  }, []);

  return (
    <Tab.Navigator
      // initialRouteName="HomeTabStack"
      // tabBarOptions={{
      //   activeTintColor: '#42f44b',
      // }}
      tabBar={(props) => (
        <>
          <BottomTabBar {...props} />
          <View style={{ position: 'absolute', bottom: "18%" }}>
            <AppGiftBadge />
          </View>
          <SafeAreaView style={{ backgroundColor: 'white' }} />
        </>
      )}>
      <Tab.Screen
        name="HomeTabStack"
        component={HomeStack}
      />
      <Tab.Screen
        name="NotificationTabStack"
        component={NotificationTabStack}
      />
      <Tab.Screen
        name="ChatTabStack"
        component={ChatStack}
      />
      <Tab.Screen
        name="BuyCoinsTabStack"
        component={CoinPurchaseStack}
      />
      <Tab.Screen
        name="UserProfileTabStack"
        // component={CoinPurchaseStack}
        component={UserProfile}
      />
    </Tab.Navigator>
  );
};

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigator}
      />
      <Stack.Screen
        name="ModeratorProfile"
        component={ModeratorProfile}
      />

      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
      />

      <Stack.Screen
        name="ChatDetail"
        component={ChatDetail}
      />

      <Stack.Screen
        name="FriendsScreen"
        component={FriendsScreen}
      />

      <Stack.Screen
        name="AccountDetail"
        component={AccountDetail}
      />

      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />

      <Stack.Screen
        name="HelpAndSupport"
        component={HelpAndSupport}
      />

      <Stack.Screen
        name="UserPhotos"
        component={UserPhotos}
      />

      <Stack.Screen
        name="LikesScreen"
        component={LikesScreen}
      />

      <Stack.Screen
        name="KissesScreen"
        component={KissesScreen}
      />

      <Stack.Screen
        name="HeartsScreen"
        component={HeartsScreen}
      />

      <Stack.Screen
        name="StickersScreen"
        component={StickersScreen}
      />

      <Stack.Screen
        name="AppearanceScreen"
        component={AppearanceScreen}
      />

      <Stack.Screen
        name="CreateTicket"
        component={CreateTicket}
      />

      <Stack.Screen
        name="EditLocationScreen"
        component={EditLocationScreen}
      />
    </Stack.Navigator>
  );
}
