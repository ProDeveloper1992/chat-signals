import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { NoListData, AppText } from '../../components';
import { Icons, Colors, DEFAULT_IMAGE_URL } from '../../constants';
import ImagePicker from 'react-native-image-picker';
import styles from './style';
import { ModeratorIconLabel, ModeratorHeader } from '../../components';
import ModeratorProfileInfoTab from './user-profile-info-tab';
import ModeratorProfilePhotosTab from './user-profile-photos-tab';
import ModeratorProfileActionTab from './user-profile-action-tab';
import { ModeratorActivityModal } from '../../components/app-modals';
import { useSelector } from 'react-redux';

export default function UserProfile(props) {
  const { params } = props.route;

  const [activityType, setActivityType] = useState('kisses');
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [cuurentTab, setCurrentTab] = useState(0);

  const { userData } = useSelector((state) => state.userState);
  const { appLabels } = useSelector((state) => state.appState);

  useEffect(() => { }, []);

  const renderCurrentTab = () => {
    switch (cuurentTab) {
      case 0:
        return (
          <ModeratorProfilePhotosTab
          // photosList={params.item.moderator_photos}
          />
        );

      case 1:
        return <ModeratorProfileInfoTab />;

      case 2:
        return <ModeratorProfileActionTab />;
    }
  };

  const showActivityModal = (type) => {
    setActivityType(type);
    setActivityModalVisible(true);
  };

  const getProfilePicture = () => {
    var profilePic = DEFAULT_IMAGE_URL;
    if (
      userData &&
      userData.avatar
    ) {
      profilePic = userData.avatar;
    }
    return profilePic;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imgBackground}
          resizeMode="cover"
          source={{ uri: getProfilePicture() }}>
          <ModeratorHeader
            label={userData && userData.username}
            onBackPress={() => props.navigation.goBack()}
          />
        </ImageBackground>

        <View style={styles.hrLine}></View>

        <View style={styles.moderatorSwitchContainer}>
          <View style={styles.container}>
            <View style={styles.moderatorNameContainer}>
              <View style={styles.onlineStatusSignal(true)} />
              <AppText type={'bold'} size={16} style={{ textAlign: 'center' }}>
                {userData && userData.username}
              </AppText>
            </View>

            <View style={styles.moderatorLocationContainer}>
              <Image source={Icons.coins_icon} style={styles.flagImage} />
              <AppText
                style={styles.mRight}
                color={'gold'}
                type={'bold'}
                size={14}>
                {'5'}
              </AppText>
              <AppText style={styles.mRight} size={14}>
                {appLabels.charge_coins}
              </AppText>
            </View>
          </View>

          <TouchableOpacity
            style={styles.proFlirtContainer}
            activeOpacity={0.8}
            onPress={() => { }}>
            <Image
              style={{
                height: 24,
                width: 24,
                resizeMode: 'cover',
                marginHorizontal: 5,
              }}
              source={Icons.super_flirt_heart_icon}
            />
            <AppText type={'regular'} size={14} color={Colors.ui_primary} style={{ marginHorizontal: 10 }}>
              {appLabels.get_super_flirt}
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.hrLine}></View>

        <View style={styles.moderatorIconViewHolder}>
          <ModeratorIconLabel
            onIconPress={() => { }}
            IconName={`0 ${appLabels.kisses}`}
            Icon={Icons.kiss_icon}
          />

          <ModeratorIconLabel
            onIconPress={() => { }}
            IconName={`2 ${appLabels.likes}`}
            Icon={Icons.like_icon}
          />

          <ModeratorIconLabel
            onIconPress={() => { }}
            IconName={`0 ${appLabels.stickers}`}
            Icon={Icons.sticker_icon}
          />

          <ModeratorIconLabel
            onIconPress={() => { }}
            IconName={`1 ${appLabels.heart}`}
            Icon={Icons.heart_icon}
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
              numberOfLines={1}
              type={'bold'}
              size={16}
              color={cuurentTab === 0 ? Colors.white : Colors.black}>
              {appLabels.photos}
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
              numberOfLines={1}
              type={'bold'}
              size={16}
              color={cuurentTab === 1 ? Colors.white : Colors.black}>
              {appLabels.profile_info}
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
              numberOfLines={1}
              type={'bold'}
              size={16}
              color={cuurentTab === 2 ? Colors.white : Colors.black}>
              {appLabels.action}
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={{ minHeight: 200 }}>{renderCurrentTab()}</View>
        <ModeratorActivityModal
          visible={activityModalVisible}
          onHideModal={() => setActivityModalVisible(false)}
          type={activityType}
        />
      </View>
    </ScrollView>
  );
}
