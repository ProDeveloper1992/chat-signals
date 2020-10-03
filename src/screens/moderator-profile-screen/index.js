import React, {useState} from 'react';
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {NoListData, AppText} from '../../components';
import {Icons, Colors} from '../../constants';
import ImagePicker from 'react-native-image-picker';
import styles from './style';
import {ModeratorIconLabel, ModeratorHeader} from '../../components';
import ModeratorProfileInfoTab from './moderator-profile-info-tab'
import ModeratorProfilePhotosTab from './moderator-profile-photos-tab'

export default function ModeratorProfile(props) {
  const {params} = props.route;

  const [isEnabled, setIsEnabled] = useState(false);
  const [cuurentTab, setCurrentTab] = useState(0);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const renderCurrentTab = () => {
    switch (cuurentTab) {
      case 0:
        return <NoListData title={'No photos found!'} />;

      case 1:
        return <ModeratorProfileInfoTab/>;

      case 2:
        return <NoListData title={'No actions found!'} />;
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imgBackground}
          resizeMode="cover"
          source={{uri: params.item.image_url}}>
          <ModeratorHeader
            label={params.item.name}
            onBackPress={() => props.navigation.goBack()}
          />
        </ImageBackground>

        <View style={styles.hrLine}></View>

        <View style={styles.moderatorSwitchContainer}>
          <View>
            <View style={styles.moderatorNameContainer}>
              <View style={styles.onlineStatusSignal(params.item.is_online)} />
              <AppText type={'bold'} size={16} style={{textAlign: 'center'}}>
                {params.item.name}
              </AppText>
            </View>

            <View style={styles.moderatorLocationContainer}>
              <AppText style={styles.mRight}>{'5 km'}</AppText>
              <AppText style={styles.mRight}>{'Germany'}</AppText>
              <Image
                source={{
                  uri:
                    'https://cdn.countryflags.com/thumbs/germany/flag-round-250.png',
                }}
                style={styles.flagImage}
              />
            </View>
          </View>

          <View style={styles.switchViewContainer}>
            <Switch
              trackColor={{false: '#e0e0e0', true: Colors.ui_primary_dark}}
              thumbColor={isEnabled ? Colors.white : Colors.white}
              ios_backgroundColor={Colors.white_80}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <AppText type={'bold'}>{'BOOKMARK'}</AppText>
          </View>
        </View>

        <View style={styles.hrLine}></View>

        <View style={styles.moderatorIconViewHolder}>
          <ModeratorIconLabel
            onIconPress={() => {}}
            IconName={'Kisses'}
            Icon={Icons.kiss_icon}
          />

          <ModeratorIconLabel
            onIconPress={() => {}}
            IconName={'Like'}
            Icon={Icons.like_icon}
          />

          <ModeratorIconLabel
            onIconPress={() => {}}
            IconName={'Chat'}
            Icon={Icons.chat_flat_icon}
          />

          <ModeratorIconLabel
            onIconPress={() => {}}
            IconName={'Add Friend'}
            Icon={Icons.add_friend_icon}
          />
        </View>

        <View style={styles.tabViewContainer}>
          <TouchableOpacity
            style={{
              ...styles.tabView,
              backgroundColor:
                cuurentTab === 0 ? Colors.ui_primary_dark : Colors.white,
            }}
            onPress={() => setCurrentTab(0)}>
            <AppText
              type={'bold'}
              size={16}
              color={cuurentTab === 0 ? Colors.white : Colors.black}>
              {'Photos'}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.centerTabView,
              backgroundColor:
                cuurentTab === 1 ? Colors.ui_primary_dark : Colors.white,
            }}
            onPress={() => setCurrentTab(1)}>
            <AppText
              type={'bold'}
              size={16}
              color={cuurentTab === 1 ? Colors.white : Colors.black}>
              {'Profile-Info'}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.tabView,
              backgroundColor:
                cuurentTab === 2 ? Colors.ui_primary_dark : Colors.white,
            }}
            onPress={() => setCurrentTab(2)}>
            <AppText
              type={'bold'}
              size={16}
              color={cuurentTab === 2 ? Colors.white : Colors.black}>
              {'Action'}
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={{minHeight: 200}}>{renderCurrentTab()}</View>
      </View>
    </ScrollView>
  );
}
