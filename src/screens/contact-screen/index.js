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
import BookMarkTopTab from './bookmark-top-tab';
import FriendsTopTab from './friends-top-tab';
import VisitorsTopTab from './visitors-top-tab';
import BlockedTopTab from './blocked-top-tab';

const initialLayout = { width: Dimensions.get('window').width };

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { appLabels } = useSelector((state) => state.appState);

  const [index, setIndex] = React.useState(0);
  const routes = [
    { key: 'bookmarks', title: 'Favorites' },
    { key: 'friends', title: appLabels.friends },
    { key: 'visitors', title: appLabels.visitors },
    { key: 'blocked', title: appLabels.blocked },
  ]

  const renderScene = SceneMap({
    bookmarks: BookMarkTopTab,
    friends: FriendsTopTab,
    visitors: VisitorsTopTab,
    blocked: BlockedTopTab,
  });

  return (
    <View style={styles.container}>
      <GeneralHeader
        leftIcon={Icons.user_profile}
        onLeftPress={() => navigation.navigate('UserProfile')}
        // rightIcon={Icons.search}
        // onRightPress={() => {}}
        LanguageIcon={Icons.icon_languages}
        onLanguagePress={() => dispatch(toggleLanguageModal(true))}
        label={appLabels.contact}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            scrollEnabled
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
