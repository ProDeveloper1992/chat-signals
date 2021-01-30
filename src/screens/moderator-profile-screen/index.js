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
import styles from './style';
import { ModeratorIconLabel, ModeratorHeader } from '../../components';
import ModeratorProfileInfoTab from './moderator-profile-info-tab';
import ModeratorProfilePhotosTab from './moderator-profile-photos-tab';
import ModeratorProfileActionTab from './moderator-profile-action-tab';
import { ModeratorActivityModal } from '../../components/app-modals';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../../redux/actions/user-actions';
import { ChatGradientIcon, LikeGradientIcon, FriendGradientIcon, KissGradientIcon, StickerGradientIcon } from '../../constants/svg-icons';

export default function ModeratorProfile(props) {

  const dispatch = useDispatch();

  const { params } = props.route;

  const { appLabels } = useSelector((state) => state.appState);

  const [isFavorite, setIsFavorite] = useState(false);
  const [activityType, setActivityType] = useState('kisses');
  const [activityModalVisible, setActivityModalVisible] = useState(false);

  const toggleSwitch = async () => {
    if (isFavorite) {
      await dispatch(addToFavorite(params.item.id, 0));
    } else {
      await dispatch(addToFavorite(params.item.id, 1));
    }
    setIsFavorite(!isFavorite);
  }

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
    <View style={styles.container}>
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

          <View style={{ padding: 15 }}>
            <View style={styles.moderatorSwitchContainer}>
              <View>
                <View style={styles.moderatorNameContainer}>
                  <AppText type={'bold'} size={16} style={{ textTransform: 'capitalize' }}>
                    {params.item.username}
                  </AppText>
                  <View style={styles.onlineStatusSignal(params.item.is_online)} />
                </View>
                <AppText type={'regular'} style={{ textTransform: 'capitalize' }}>
                  {params.item.city + ", " + params.item.country}
                </AppText>

                {/* <View style={styles.moderatorLocationContainer}>
                <AppText style={styles.mRight}>{'5 km'}</AppText>
                <AppText style={styles.mRight}>{'Germany'}</AppText>
                <Image
                  source={{
                    uri:
                      'https://cdn.countryflags.com/thumbs/germany/flag-round-250.png',
                  }}
                  style={styles.flagImage}
                />
              </View> */}
              </View>

              {/* <View style={styles.switchViewContainer}>
              <Switch
                trackColor={{ false: '#e0e0e0', true: Colors.ui_primary_dark }}
                thumbColor={isFavorite ? Colors.white : Colors.white}
                ios_backgroundColor={Colors.white_80}
                onValueChange={toggleSwitch}
                value={isFavorite}
              />
              <AppText type={'bold'} uppercase style={{ marginHorizontal: 10 }}>{appLabels.bookmark ? appLabels.bookmark : 'Favourite'}</AppText>
            </View> */}
            </View>

            <View style={styles.moderatorIconViewHolder}>
              <ModeratorIconLabel
                onIconPress={() => showActivityModal('chat')}
                Icon={<ChatGradientIcon />}
              />

              <ModeratorIconLabel
                onIconPress={() => showActivityModal('like')}
                Icon={<LikeGradientIcon />}
              />

              <ModeratorIconLabel
                onIconPress={() => showActivityModal('addfriend')}
                Icon={<FriendGradientIcon />}
              />

              <ModeratorIconLabel
                onIconPress={() => showActivityModal('kisses')}
                Icon={<KissGradientIcon />}
              />

              <ModeratorIconLabel
                onIconPress={() => showActivityModal('sticker')}
                Icon={<StickerGradientIcon />}
              />
            </View>
          </View>
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
