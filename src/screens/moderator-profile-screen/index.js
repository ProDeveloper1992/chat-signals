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
import { PagerTabIndicator, IndicatorViewPager, ViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import HTML from "react-native-render-html";
import FastImage from 'react-native-fast-image';
import { Code } from 'react-content-loader/native';

import { NoListData, AppText, BackHeader, TagItem, OnlineStatusCircle, LegalActionMenu } from '../../components';
import { Icons, Colors, DEFAULT_IMAGE_URL, SCREEN_HEIGHT, DEFAULT_AVATAR_URL, Images } from '../../constants';
import styles from './style';
import { ModeratorIconLabel } from '../../components';
import { ModeratorActivityModal } from '../../components/app-modals';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, getModeratorAppearances } from '../../redux/actions/user-actions';
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
import { toggleGallerySwiperModal } from '../../redux/actions/app-modals-actions';
import ScalableImage from '../../components/app-scalable-image';
import { UnfriendIcon, BlockIcon } from '../../constants/svg-icons';

export default function ModeratorProfile(props) {

  const dispatch = useDispatch();

  const { params } = props.route;
  const { navigation } = props;

  const { appLabels, passionList } = useSelector((state) => state.appState);

  const [isFavorite, setIsFavorite] = useState(params.item.is_favorites);
  const [activityType, setActivityType] = useState('kiss');
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [swiperImages, setSwiperImages] = useState([]);
  const [appearances, setAppearances] = useState([]);

  const [moderatorDetail, setModeratorDetail] = useState(null);

  const PASSIONS = params && params.item && params.item.passions ? params.item.passions.split(',') : [];

  useEffect(() => {
    console.log("passionList", passionList);
    console.log("Mederator Detail...", params.item);
    getDetail();
    getAppearances();
    if (params && params.item && params.item.profilepicture) {
      let moderatorImages = [];
      for (let image of params.item.profilepicture) {
        let obj = { url: getItemImage(image.picture) };
        if (image.is_erotic == '1') {
          obj = { url: 'https://dcassetcdn.com/design_img/368831/55332/55332_2984458_368831_image.jpg' };
        }
        if (image.is_friend == '1') {
          obj = { url: 'https://mafasworld.files.wordpress.com/2010/11/2294890654_aa2c97b771_o.jpg' };
        }
        moderatorImages.push(obj);
      }
      setSwiperImages(moderatorImages);
    }
  }, []);

  const getAppearances = async () => {
    const appearances_response = await dispatch(getModeratorAppearances(params.item.id));
    console.log("appearances_response", appearances_response);
    if (appearances_response.meta.status == true) {
      setAppearances(appearances_response.data);
    }
  }

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
      let PROFILE_IMAGE = DEFAULT_AVATAR_URL;
      for (let profile_image of params.item.profilepicture) {
        if (profile_image.is_profile_photo == "1") {
          PROFILE_IMAGE = profile_image.picture
        }
      }
      return PROFILE_IMAGE;
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
    let pictures = [];
    for (let picture of params.item.profilepicture) {
      if (picture.is_active == '1') {
        pictures.push(picture);
      }
    }
    return pictures;
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

  const onPressImage = (item, index) => {
    dispatch(toggleGallerySwiperModal(true, swiperImages, index));
  }

  const getPassionsById = (id) => {
    for (let passion of passionList) {
      if (passion.id == id) {
        return passion.name;
      }
    }
  }

  return (
    <View style={styles.container}>
      <BackHeader title={appLabels.flirts} color={Colors.ui_primary} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.container}>
          {params && params.isFromChat ? (
            <View>
              {moderatorDetail && moderatorDetail.profile_picture && moderatorDetail.profile_picture.length > 0 && (
                <IndicatorViewPager
                  style={{ height: SCREEN_HEIGHT / 2, backgroundColor: Colors.grey, flex: 1, }}
                  indicator={_renderDotIndicator(moderatorDetail.profile_picture.length)}
                >
                  {moderatorDetail.profile_picture.map((item, index) => {
                    if (item.is_friend == "1") {
                      return (
                        <ImageBackground
                          key={String(index)}
                          style={styles.imgBackground}
                          source={{ uri: getItemImage(item.picture) }}
                          blurRadius={Platform.OS == 'ios' ? 40 : 5}
                        >
                          <View style={styles.eroticContainer}>
                            <XXXCoinIcon width={60} height={60} />
                            <AppText
                              type={'black-italic'}
                              size={16}
                              style={{ marginTop: -10 }}
                              color={Colors.white}
                              uppercase>{appLabels.only_for_friends}</AppText>
                            {/* <TouchableOpacity
                        onPress={onUnlockEroticImage}
                        style={styles.unlockEroticButtonContainer}>
                        <View style={{ marginBottom: -5, marginTop: 5, marginStart: -10 }}>
                          <CoinGradientIcon width={40} height={40} />
                        </View>
                        <AppText type={'black-italic'} size={12} color={Colors.white} uppercase>{`Unlock for ${10} coins`}</AppText>
                      </TouchableOpacity> */}
                          </View>
                        </ImageBackground>
                      )
                    }
                    if (item.is_erotic == "1") {
                      return (
                        <ImageBackground
                          key={String(index)}
                          style={styles.imgBackground}
                          source={{ uri: getItemImage(item.picture) }}
                          blurRadius={Platform.OS == 'ios' ? 40 : 5}
                        >
                          <View style={styles.eroticContainer}>
                            <XXXCoinIcon width={60} height={60} />
                            <AppText
                              type={'black-italic'}
                              size={16}
                              style={{ marginTop: -10 }}
                              color={Colors.white}
                              uppercase>{appLabels.erotic_image}</AppText>
                            {/* <TouchableOpacity
                        onPress={onUnlockEroticImage}
                        style={styles.unlockEroticButtonContainer}>
                        <View style={{ marginBottom: -5, marginTop: 5, marginStart: -10 }}>
                          <CoinGradientIcon width={40} height={40} />
                        </View>
                        <AppText type={'black-italic'} size={12} color={Colors.white} uppercase>{`Unlock for ${10} coins`}</AppText>
                      </TouchableOpacity> */}
                          </View>
                        </ImageBackground>
                      )
                    }
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        key={String(index)}
                        onPress={() => onPressImage(item, index)}>
                        <FastImage
                          style={styles.imgBackground}
                          source={{
                            uri: getItemImage(item.picture),
                            priority: FastImage.priority.high,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </TouchableOpacity>
                    )
                  })}
                </IndicatorViewPager>
              )}
            </View>
          ) : (
            <View>
              {params && params.item && params.item.profilepicture && params.item.profilepicture.length > 0 && (
                <IndicatorViewPager
                  style={{ height: SCREEN_HEIGHT / 2, backgroundColor: Colors.grey, flex: 1, }}
                  indicator={_renderDotIndicator(getProfilePictures().length)}
                >
                  {getProfilePictures().map((item, index) => {
                    if (item.is_friend == "1") {
                      return (
                        <ImageBackground
                          key={String(index)}
                          style={styles.imgBackground}
                          source={{ uri: getItemImage(item.picture) }}
                          blurRadius={Platform.OS == 'ios' ? 40 : 5}
                        >
                          <View style={styles.eroticContainer}>
                            <XXXCoinIcon width={60} height={60} />
                            <AppText
                              type={'black-italic'}
                              size={16}
                              style={{ marginTop: -10 }}
                              color={Colors.white}
                              uppercase>{appLabels.only_for_friends}</AppText>
                            {/* <TouchableOpacity
                        onPress={onUnlockEroticImage}
                        style={styles.unlockEroticButtonContainer}>
                        <View style={{ marginBottom: -5, marginTop: 5, marginStart: -10 }}>
                          <CoinGradientIcon width={40} height={40} />
                        </View>
                        <AppText type={'black-italic'} size={12} color={Colors.white} uppercase>{`Unlock for ${10} coins`}</AppText>
                      </TouchableOpacity> */}
                          </View>
                        </ImageBackground>
                      )
                    }
                    if (item.is_erotic == "1") {
                      return (
                        <ImageBackground
                          key={String(index)}
                          style={styles.imgBackground}
                          source={{ uri: getItemImage(item.picture) }}
                          blurRadius={Platform.OS == 'ios' ? 40 : 5}
                        >
                          <View style={styles.eroticContainer}>
                            <XXXCoinIcon width={60} height={60} />
                            <AppText
                              type={'black-italic'}
                              size={16}
                              style={{ marginTop: -10 }}
                              color={Colors.white}
                              uppercase>{appLabels.erotic_image}</AppText>
                            {/* <TouchableOpacity
                        onPress={onUnlockEroticImage}
                        style={styles.unlockEroticButtonContainer}>
                        <View style={{ marginBottom: -5, marginTop: 5, marginStart: -10 }}>
                          <CoinGradientIcon width={40} height={40} />
                        </View>
                        <AppText type={'black-italic'} size={12} color={Colors.white} uppercase>{`Unlock for ${10} coins`}</AppText>
                      </TouchableOpacity> */}
                          </View>
                        </ImageBackground>
                      )
                    }
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        key={String(index)}
                        onPress={() => onPressImage(item, index)}>
                        <FastImage
                          style={styles.imgBackground}
                          source={{
                            uri: getItemImage(item.picture),
                            priority: FastImage.priority.high,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                        {/* <ImageBackground
                      style={styles.imgBackground}
                      source={{ uri: getItemImage(item.picture) }}
                    /> */}
                      </TouchableOpacity>
                    )
                  })}
                </IndicatorViewPager>
              )}
            </View>
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
                      actions={[
                        {
                          id: 1,
                          title: appLabels.report,
                          icon: <UnfriendIcon />
                        },
                        {
                          id: 2,
                          title: appLabels.block,
                          icon: <BlockIcon />
                        }
                      ]}
                      onSelectAction={onSelectLegalAction} />
                  </View>
                </View>
                {params && params.isFromChat && moderatorDetail ? (
                  <AppText type={'regular'} size={16} style={{ textTransform: 'capitalize' }}>
                    {moderatorDetail.city + ", " + moderatorDetail.country}
                  </AppText>
                ) : (
                  <View>
                    {params && params.item && (
                      <AppText type={'regular'} size={16} style={{ textTransform: 'capitalize' }}>
                        {params.item.city + ", " + params.item.country}
                      </AppText>
                    )}
                  </View>
                )}
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
              {PASSIONS.length > 0 && (
                <View>
                  <AppText type={'bold'} size={18}>{appLabels.interests}</AppText>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
                    {PASSIONS.map((item, index) => {
                      if (item == "") {
                        return <TagItem key={String(index)} title={"N/A"} disabled />;
                      }
                      return <TagItem key={String(index)} title={item} disabled />
                    })}
                  </View>
                </View>
              )}
              {loadingDetail ? (
                <Code />
              ) : (
                <>
                  {moderatorDetail && moderatorDetail.description && (
                    <View>
                      <AppText type={'bold'} size={18}>{appLabels.details}</AppText>
                      <HTML source={{ html: moderatorDetail.description }} contentWidth={contentWidth} />
                    </View>
                  )}
                </>
              )}
            </View>
            {moderatorDetail ? (
              <View>
                <ProfileItem
                  title={appLabels.dob}
                  value={moment(moderatorDetail.dob).format('DD/MM/YYYY')} />
                <ProfileItem
                  title={appLabels.gender}
                  value={getGenderFromId(moderatorDetail.Gender)} />
              </View>
            ) : (
              <View>
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
            )}

            {appearances && appearances.length > 0 && (
              <View style={{ paddingHorizontal: 10 }}>
                <AppText type={'bold'} size={16} style={{ marginBottom: 10 }}>{appLabels.appearance}</AppText>
                {appearances.map((appearanceItem, appearanceIndex) => {
                  return <View
                    key={String(appearanceIndex)}
                    style={styles.appearanceItem}
                  >
                    <AppText style={{ flex: 1 }}>{appearanceItem.display_name}</AppText>
                    <AppText type={'bold'} style={{ flex: 1, textAlign: 'right' }}>{appearanceItem.attr_value || 'N/A'}</AppText>
                  </View>
                })}
              </View>
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