import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, View, BackHandler, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';

import { Colors, Icons } from '../../constants';
import { FlirtTab, ProFlirtTab } from '../index';
import { GeneralHeader } from '../../components/Headers';
import styles from './style';

import { toggleLanguageModal } from '../../redux/actions/app-modals-actions';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { getGeneralSettings } from '../../redux/actions/app-actions';

import FilterIcon from '../../assets/icons/filter.svg';

const initialLayout = { width: Dimensions.get('window').width };

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { appLabels } = useSelector((state) => state.appState);
  const { authToken } = useSelector((state) => state.userState);

  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'flirt', title: appLabels.flirts },
    { key: 'proflirt', title: appLabels.super_flirts ? appLabels.super_flirts : 'ProFlirts' },
  ];

  useEffect(() => {
    if (authToken) {
      dispatch(getGeneralSettings());
    }
  }, []);

  useEffect(() => {
    SplashScreen.hide();
    if (isFocused) {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, [isFocused]);

  const renderScene = SceneMap({
    flirt: FlirtTab,
    proflirt: ProFlirtTab,
  });

  const onLogout = () => {
    Alert.alert('Confirm Logout!', 'Are you sure you want to logout?', [
      {
        text: 'No',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          AsyncStorage.clear();
          try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
          } catch (error) {
            // console.error(error);
          }
          navigation.navigate('auth-stack');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <GeneralHeader
        leftIcon={Icons.user_profile}
        onLeftPress={() => navigation.navigate('UserProfile')}
        rightIcon={<TouchableOpacity activeOpacity={0.8}>
          <FilterIcon width={24} height={24} />
        </TouchableOpacity>}
        // onRightPress={()=>navigation.navigate('SearchScreen')}
        LanguageIcon={Icons.icon_languages}
        onLanguagePress={() => dispatch(toggleLanguageModal(true))}
        label={appLabels.flirts}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.topTabIndicator}
            style={styles.topTabContainer}
            labelStyle={styles.topTabLabel}
            activeColor={Colors.ui_primary}
            inactiveColor={Colors.black}
          />
        )}
      />
    </View>
  );
}
