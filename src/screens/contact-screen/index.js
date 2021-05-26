import * as React from 'react';
import { Dimensions, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import { Colors, Icons } from '../../constants';
import { GeneralHeader } from '../../components/Headers';
import { toggleLanguageModal } from '../../redux/actions/app-modals-actions';

//Top Tabs
import NotificationsTab from './notifications-tab';
import FriendsTopTab from './friend-requests-tab';

const initialLayout = { width: Dimensions.get('window').width };

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { appLabels } = useSelector((state) => state.appState);

  const [index, setIndex] = React.useState(0);
  const routes = [
    { key: 'notifications', title: 'Notifications' },
    { key: 'friends', title: 'Friend Requests' },
  ]

  const renderScene = SceneMap({
    notifications: NotificationsTab,
    friends: FriendsTopTab,
  });

  return (
    <View style={styles.container}>
      <GeneralHeader
        label={"Notifications"}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            // scrollEnabled
            indicatorStyle={styles.topTabIndicator}
            style={styles.topTabContainer}
            labelStyle={styles.topTabLabel}
            activeColor={Colors.ui_primary}
            inactiveColor={Colors.greydark}
          />
        )}
      />
    </View>
  );
}
