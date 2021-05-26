import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  Switch,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import HTML from "react-native-render-html";
import FastImage from 'react-native-fast-image';
import { Code } from 'react-content-loader/native'

import { NoListData, AppText, BackHeader, TagItem, OnlineStatusCircle, LegalActionMenu } from '../../components';
import { Icons, Colors, DEFAULT_IMAGE_URL, SCREEN_HEIGHT, DEFAULT_AVATAR_URL } from '../../constants';
import styles from './style';
import { ModeratorIconLabel } from '../../components';
import { ModeratorActivityModal } from '../../components/app-modals';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../../redux/actions/user-actions';
import {
  ChatGradientIcon,
  LikeGradientIcon,
  FriendGradientIcon,
  KissGradientIcon,
  StickerGradientIcon,
  StarOutlineIcon,
  StarFilledIcon,
  DotsCircleIcon,
  XXXCoinIcon,
  CoinGradientIcon
} from '../../constants/svg-icons';
import { showToast } from '../../redux/actions/app-actions';
import moment from 'moment';
import { blockModerator, getModeratorProfileDetail, reportModerator } from '../../redux/actions/flirts-actions';

export default function ModeratorProfile(props) {

  const dispatch = useDispatch();

  const { params } = props.route;
  const { navigation } = props;

  const { appLabels } = useSelector((state) => state.appState);

  const [isFavorite, setIsFavorite] = useState(params.item.is_favorites);
  const [activityType, setActivityType] = useState('kiss');
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(true);

  const [moderatorDetail, setModeratorDetail] = useState(null);

  useEffect(() => {
    console.log("Mederator Detail...", params.item);
    getDetail();
  }, [])

  const getDetail = async () => {
    setLoadingDetail(true);
    const response = await dispatch(getModeratorProfileDetail(params.item.id));
    setLoadingDetail(false);
    if (response.meta.status) {
      setModeratorDetail(response.data);
    }
  }

  const toggleSwitch = async () => {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      await dispatch(addToFavorite(params.item.id, 0));
    } else {
      await dispatch(addToFavorite(params.item.id, 1));
    }
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

  const getModeratorProfileImage = () => {
    if (params.item.profilepicture && params.item.profilepicture.length > 0) {
      return params.item.profilepicture[0].picture;
    } else {
      return DEFAULT_AVATAR_URL;
    }
  }

  const onChatPress = () => {
    console.log("moderator", params.item)
    let customer = {
      user: {
        id: params.item.id,
        username: params.item.username,
        is_active: "1"  //Will Need to set dynamic value for it.
      },
      profile_picture: getModeratorProfileImage()
    }
    navigation.navigate('ChatDetail', { item: customer });
  }

  const _renderDotIndicator = (pages) => {
    if (pages > 1) {
      return <PagerDotIndicator
        pageCount={pages}
        dotStyle={styles.inactiveViewPaggerDot(pages)}
        selectedDotStyle={styles.activeViewPaggerDot(pages)} />
    }
    return null;
  }

  const onUnlockEroticImage = () => {
    dispatch(showToast('negative', 'This feature is under development!'))
  }

  const getProfilePictures = () => {
    if (moderatorDetail != null) {
      return moderatorDetail.profile_picture;
    }
    return params.item.profilepicture;
  }

  const contentWidth = useWindowDimensions().width;

  const onSelectLegalAction = async (action) => {
    console.log("action", action)
    if (action.title == 'Report') {
      dispatch(reportModerator(params.item.id));
    }
    if (action.title == 'Block') {
      await dispatch(blockModerator(params.item.id));
      navigation.goBack();
    }
  }

  const onBuyCoinsPress = () => {
    navigation.goBack();
    navigation.navigate('BuyCoinsTabStack')
  }

  const getGenderFromId = (id) => {
    switch (id) {
      case '1':
        return 'Men';

      case '2':
        return 'Women';

      case '3':
        return 'Bigender'

      default:
        return 'Women';
    }
  }

  return (
    <View style={styles.container}>
      <BackHeader title={'Flirts'} color={Colors.ui_primary} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {params && params.item && params.item.profilepicture && params.item.profilepicture.length > 0 && (
            <IndicatorViewPager
              style={{ height: SCREEN_HEIGHT / 2, backgroundColor: Colors.grey }}
              indicator={_renderDotIndicator(params.item.profilepicture.length)}
            >
              {getProfilePictures().map((item, index) => {
                if (item.is_friend == "1") {
                  return (<ImageBackground
                    key={String(index)}
                    blurRadius={Platform.OS == 'ios' ? 40 : 5}
                    style={styles.imgBackground}
                    resizeMode={'cover'}
                    source={{ uri: getItemImage(item.picture) }}>
                    <View style={styles.eroticContainer}>
                      <XXXCoinIcon width={60} height={60} />
                      <AppText
                        type={'black-italic'}
                        size={16}
                        style={{ marginTop: -10 }}
                        color={Colors.white}>{"ONLY FOR FRIENDS"}</AppText>
                      {/* <TouchableOpacity
                        onPress={onUnlockEroticImage}
                        style={styles.unlockEroticButtonContainer}>
                        <View style={{ marginBottom: -5, marginTop: 5, marginStart: -10 }}>
                          <CoinGradientIcon width={40} height={40} />
                        </View>
                        <AppText type={'black-italic'} size={12} color={Colors.white} uppercase>{`Unlock for ${10} coins`}</AppText>
                      </TouchableOpacity> */}
                    </View>
                  </ImageBackground>)
                }
                if (item.is_erotic == "1") {
                  return (<ImageBackground
                    key={String(index)}
                    blurRadius={Platform.OS == 'ios' ? 40 : 5}
                    style={styles.imgBackground}
                    resizeMode={'cover'}
                    source={{ uri: getItemImage(item.picture) }}>
                    <View style={styles.eroticContainer}>
                      <XXXCoinIcon width={60} height={60} />
                      <AppText
                        type={'black-italic'}
                        size={16}
                        style={{ marginTop: -10 }}
                        color={Colors.white}>{"EROTIC IMAGE"}</AppText>
                      {/* <TouchableOpacity
                        onPress={onUnlockEroticImage}
                        style={styles.unlockEroticButtonContainer}>
                        <View style={{ marginBottom: -5, marginTop: 5, marginStart: -10 }}>
                          <CoinGradientIcon width={40} height={40} />
                        </View>
                        <AppText type={'black-italic'} size={12} color={Colors.white} uppercase>{`Unlock for ${10} coins`}</AppText>
                      </TouchableOpacity> */}
                    </View>
                  </ImageBackground>)
                }
                return (
                  <FastImage
                    key={String(index)}
                    style={styles.imgBackground}
                    source={{
                      uri: getItemImage(item.picture),
                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                )
              })}
            </IndicatorViewPager>
          )}

          <View style={{ padding: 15 }}>
            <View style={styles.moderatorSwitchContainer}>
              <View style={{ flex: 1 }}>
                <View style={styles.moderatorNameContainer}>
                  <View style={styles.moderatorNameContainer}>
                    <AppText type={'bold'} size={18} style={{ textTransform: 'capitalize', marginEnd: 10 }}>
                      {params.item.username}{params.item.dob ? `, ${moment().diff(moment(params.item.dob, 'YYYY-MM-DD'), 'years')}` : ''}
                    </AppText>
                    <OnlineStatusCircle isOnline={true} size={12} />
                  </View>
                  <View style={[styles.moderatorNameContainer, { justifyContent: 'flex-end', marginEnd: 15 }]}>
                    <TouchableOpacity onPress={toggleSwitch} style={{ marginHorizontal: 10 }}>
                      {isFavorite ? (
                        <StarFilledIcon width={24} height={24} />
                      ) : (
                        <StarOutlineIcon width={24} height={24} />
                      )}
                    </TouchableOpacity>
                    <LegalActionMenu
                      onSelectAction={onSelectLegalAction} />
                  </View>
                </View>
                <AppText type={'regular'} size={16} style={{ textTransform: 'capitalize' }}>
                  {params.item.city + ", " + params.item.country}
                </AppText>
              </View>
            </View>

            <View style={styles.moderatorIconViewHolder}>
              <ModeratorIconLabel
                onIconPress={onChatPress}
                Icon={<ChatGradientIcon />}
              />

              <ModeratorIconLabel
                onIconPress={() => showActivityModal('like')}
                Icon={<LikeGradientIcon />}
              />

              {params && params.item && !params.item.is_friend && (
                <ModeratorIconLabel
                  onIconPress={() => showActivityModal('addfriend')}
                  Icon={<FriendGradientIcon />}
                />
              )}
              <ModeratorIconLabel
                onIconPress={() => showActivityModal('kiss')}
                Icon={<KissGradientIcon />}
              />

              <ModeratorIconLabel
                onIconPress={() => showActivityModal('sticker')}
                Icon={<StickerGradientIcon />}
              />
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <AppText type={'bold'} size={18}>{"Interests"}</AppText>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
                <TagItem title={"Netflix"} disabled />
                <TagItem title={"Music"} disabled />
                <TagItem title={"Walking"} disabled />
                <TagItem title={"Traveling"} disabled />
              </View>
              {loadingDetail ? (
                <Code />
              ) : (
                <>
                  {moderatorDetail && moderatorDetail.description && (
                    <View>
                      <AppText type={'bold'} size={18}>{"Details"}</AppText>
                      <HTML source={{ html: moderatorDetail.description }} contentWidth={contentWidth} />
                    </View>
                  )}
                </>
              )}
            </View>
            {params.item && params.item.dob && (
              <ProfileItem
                title={appLabels.dob}
                value={moment(params.item.dob).format('DD/MM/YYYY')} />
            )}
            {params.item && params.item.Gender && (
              <ProfileItem
                title={appLabels.gender}
                value={getGenderFromId(params.item.Gender)} />
            )}
          </View>
          <ModeratorActivityModal
            visible={activityModalVisible}
            onHideModal={() => setActivityModalVisible(false)}
            moderator={params.item}
            type={activityType}
            onSentItem={onChatPress}
            onBuyCoins={onBuyCoinsPress}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const ProfileItem = ({ title, value }) => {
  return <View style={{ padding: 10 }}>
    <View>
      <AppText type={'regular'} size={14} color={Colors.black}>{title}</AppText>
      <AppText type={'bold'} size={16} color={Colors.black}>{value}</AppText>
    </View>
  </View>
}