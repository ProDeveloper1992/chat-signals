import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, View, BackHandler, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
import { SpotlightModal, BoostProfileModal } from '../../components/app-modals';

const initialLayout = { width: Dimensions.get('window').width };

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { appLabels } = useSelector((state) => state.appState);
  const { authToken, userData } = useSelector((state) => state.userState);

  const [isSpotlightModalVisible, setSpolightModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'flirt', title: appLabels.flirts },
    { key: 'proflirt', title: appLabels.spotlight },
  ];

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
    if (userData && userData.is_boosted == '1') {
      setIndex(index);
    } else {
      if (index != 1) {
        setIndex(index);
      } else {
        setSpolightModalVisible(true);
      }
    }
  }

  return (
    <View style={styles.container}>
      <GeneralHeader
        rightIcon={<TouchableOpacity activeOpacity={0.8} onPress={onShowFlirtFilterModal}>
          <FilterIcon width={hp(3.5)} height={hp(3.5)} />
        </TouchableOpacity>}
        label={appLabels.flirts}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onChangeTab}
        swipeEnabled={userData && userData.is_boosted == '1' ? true : false}
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
                    <BoostIcon width={wp(13)} height={wp(13)} />
                  </View>
                )
              }
            }
            }
          />
        )}
      />
      <BoostProfileModal
        visible={isSpotlightModalVisible}
        onHideModal={() => setSpolightModalVisible(false)} />
    </View>
  );
}
