import * as React from 'react';
import {Dimensions, View} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {FlirtTab, SuperFlirtTab} from '../index';
import {Colors, Icons} from '../../constants';
import {GeneralHeader} from '../../components/Headers';

const initialLayout = {width: Dimensions.get('window').width};

export default function Home() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'flirt', title: 'Flirts'},
    {key: 'superflirt', title: 'SuperFlirts'},
  ]);

  const renderScene = SceneMap({
    flirt: FlirtTab,
    superflirt: SuperFlirtTab,
  });

  return (
    <View style={{flex: 1}}>
      <GeneralHeader
        rightIcon={Icons.user_profile}
        onRightPress={() => {}}
        onLeftPress={() => {}}
        onLanguagePress={()=>{}}
        LanguageIcon={Icons.icon_languages}
        leftIcon={Icons.search}
        label={'FLIRTS'}
      />
      
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: Colors.ui_primary,
              height: 3,
              borderRadius: 30,
            }}
            style={{height: 50, backgroundColor: 'white'}}
            tabStyle={{}}
            labelStyle={{fontSize: 14, color: Colors.black}}
          />
        )}
      />
    </View>
  );
}
