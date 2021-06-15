import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, View, BackHandler, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';

import { Colors, Icons } from '../../constants';
import { FlirtTab, ProFlirtTab } from '../index';
import { GeneralHeader } from '../../components/Headers';
import styles from './style';

import { toggleFlirtFilterModal, toggleLanguageModal } from '../../redux/actions/app-modals-actions';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { getGeneralSettings } from '../../redux/actions/app-actions';

import FilterIcon from '../../assets/icons/filter.svg';
import { BoostIcon, KissGradientIcon32 } from '../../constants/svg-icons';
import { SpotlightModal } from '../../components/app-modals';

const initialLayout = { width: Dimensions.get('window').width };

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { appLabels } = useSelector((state) => state.appState);
  const { authToken } = useSelector((state) => state.userState);

  const [isSpotlightModalVisible, setSpolightModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'flirt', title: appLabels.flirts },
    { key: 'proflirt', title: appLabels.spotlight },
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

  const onShowFlirtFilterModal = () => {
    dispatch(toggleFlirtFilterModal(true));
  }

  const onChangeTab = (index) => {
    if (index === 1) {
      setSpolightModalVisible(true);
    } else {
      setIndex(index)
    }
  }

  const onGoToSpotlightTab = () => {
    setSpolightModalVisible(false);
    // setIndex(1);
  }

  return (
    <View style={styles.container}>
      <GeneralHeader
        rightIcon={<TouchableOpacity activeOpacity={0.8} onPress={onShowFlirtFilterModal}>
          <FilterIcon width={24} height={24} />
        </TouchableOpacity>}
        label={appLabels.flirts}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onChangeTab}
        swipeEnabled={false}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.topTabIndicator}
            style={styles.topTabContainer}
            labelStyle={styles.topTabLabel}
            activeColor={Colors.ui_primary}
            inactiveColor={Colors.greydark}
            tabStyle={{ flexDirection: 'row' }}
            renderIcon={({ route, focused, color }) => {
              if (route.key == 'proflirt') {
                return (
                  <View style={{ marginBottom: -15, marginTop: -5 }}>
                    <BoostIcon width={50} height={50} />
                  </View>
                )
              }
            }
            }
          />
        )}
      />
      <SpotlightModal
        visible={isSpotlightModalVisible}
        onContinue={onGoToSpotlightTab}
        onHideModal={() => setSpolightModalVisible(false)} />
    </View>
  );
}
