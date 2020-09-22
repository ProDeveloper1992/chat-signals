import * as React from 'react';
import { Alert, Dimensions, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useDispatch } from 'react-redux';

import { Colors, Icons } from '../../constants';
import { FlirtTab, SuperFlirtTab } from '../index';
import { GeneralHeader } from '../../components/Headers';
import styles from './style'

import { toggleLanguageModal } from '../../redux/actions/app-modals-actions';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const initialLayout = { width: Dimensions.get('window').width };

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'flirt', title: 'Flirts' },
    { key: 'superflirt', title: 'SuperFlirts' },
  ]);

  const renderScene = SceneMap({
    flirt: FlirtTab,
    superflirt: SuperFlirtTab,
  });

  const onLogout=()=>{
    Alert.alert("Confirm Logout!", "Are you sure you want to logout?", [
      {
        text: "No",
        onPress: () => null,
        style: "cancel"
      },
      { text: "Yes", onPress: () => {
        AsyncStorage.clear();
        navigation.navigate('auth-stack');
      } }
    ]);
  }

  return (
    <View style={styles.container}>
      <GeneralHeader
        rightIcon={Icons.user_profile}
        onRightPress={() => { }}
        onLeftPress={onLogout}
        onLanguagePress={() => dispatch(toggleLanguageModal(true))}
        LanguageIcon={Icons.icon_languages}
        leftIcon={Icons.search}
        label={'Flirts'}
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
