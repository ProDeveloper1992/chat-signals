import React, { useState } from 'react';
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { NoListData, AppText, BackHeader } from '../../components';
import { Icons, Colors, DEFAULT_IMAGE_URL } from '../../constants';
import ImagePicker from 'react-native-image-picker';
import styles from './style';
import { ModeratorIconLabel, ModeratorHeader } from '../../components';
import ModeratorProfileInfoTab from './moderator-profile-info-tab';
import ModeratorProfilePhotosTab from './moderator-profile-photos-tab';
import ModeratorProfileActionTab from './moderator-profile-action-tab';
import { ModeratorActivityModal } from '../../components/app-modals';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../../redux/actions/user-actions';

export default function ModeratorProfile(props) {

  const dispatch = useDispatch();

  const { params } = props.route;

  const { appLabels } = useSelector((state) => state.appState);

  const [isFavorite, setIsFavorite] = useState(false);
  const [activityType, setActivityType] = useState('kisses');
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [cuurentTab, setCurrentTab] = useState(0);

  const toggleSwitch = async () => {
    if (isFavorite) {
      await dispatch(addToFavorite(params.item.id, 0));
    } else {
      await dispatch(addToFavorite(params.item.id, 1));
    }
    setIsFavorite(!isFavorite);
  }

  const renderCurrentTab = () => {
    switch (cuurentTab) {
      case 0:
        return (
          <ModeratorProfilePhotosTab
            photosList={params.item.moderator_photos}
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

  const getItemImage = (imageUrl) => {
    if (imageUrl != null) {
      return imageUrl;
    } else {
      return DEFAULT_IMAGE_URL;
    }
  }

  return (
    <View>
      <BackHeader title={params.item.username} color={Colors.ui_primary} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <ImageBackground
            style={styles.imgBackground}
            resizeMode="cover"
            source={{ uri: getItemImage(params.item.picture) }}>
            {/* <ModeratorHeader
            label={params.item.username}
            onBackPress={() => props.navigation.goBack()}
          /> */}
          </ImageBackground>

          <View style={styles.hrLine}></View>

          <View style={styles.moderatorSwitchContainer}>
            <View>
              <View style={styles.moderatorNameContainer}>
                <View style={styles.onlineStatusSignal(params.item.is_online)} />
                <AppText type={'bold'} size={16} style={{ textAlign: 'center' }}>
                  {params.item.username}
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
                trackColor={{ false: '#e0e0e0', true: Colors.ui_primary_dark }}
                thumbColor={isFavorite ? Colors.white : Colors.white}
                ios_backgroundColor={Colors.white_80}
                onValueChange={toggleSwitch}
                value={isFavorite}
              />
              <AppText type={'bold'} uppercase style={{ marginHorizontal: 10 }}>{appLabels.bookmark ? appLabels.bookmark : 'Favourite'}</AppText>
            </View>
          </View>

          <View style={styles.hrLine}></View>

          <View style={styles.moderatorIconViewHolder}>
            <ModeratorIconLabel
              onIconPress={() => showActivityModal('kisses')}
              IconName={appLabels.kisses}
              Icon={Icons.kiss_icon}
            />

            <ModeratorIconLabel
              onIconPress={() => showActivityModal('like')}
              IconName={appLabels.likes}
              Icon={Icons.like_icon}
            />

            <ModeratorIconLabel
              onIconPress={() => showActivityModal('chat')}
              IconName={appLabels.chat}
              Icon={Icons.chat_flat_icon}
            />

            <ModeratorIconLabel
              onIconPress={() => showActivityModal('addfriend')}
              IconName={appLabels.add_friend}
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
    </View>
  );
}
