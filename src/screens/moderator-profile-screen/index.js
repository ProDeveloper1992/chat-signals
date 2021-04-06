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
} from 'react-native';
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';

import { NoListData, AppText, BackHeader, TagItem, OnlineStatusCircle } from '../../components';
import { Icons, Colors, DEFAULT_IMAGE_URL, SCREEN_HEIGHT } from '../../constants';
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
import { getModeratorProfileDetail } from '../../redux/actions/flirts-actions';

export default function ModeratorProfile(props) {

  const dispatch = useDispatch();

  const { params } = props.route;
  const { navigation } = props;

  const { appLabels } = useSelector((state) => state.appState);

  const [isFavorite, setIsFavorite] = useState(false);
  const [activityType, setActivityType] = useState('kisses');
  const [activityModalVisible, setActivityModalVisible] = useState(false);

  useEffect(() => {
    console.log("Mederator Detail...", params.item);
    dispatch(getModeratorProfileDetail(params.item.id));
  }, [])

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

  const onChatPress = () => {
    console.log("moderator", params.item)
    let customer = {
      user: {
        id: params.item.id,
        username: params.item.username
      }
    }
    navigation.navigate('ChatDetail', { item: customer });
  }

  const _renderDotIndicator = (pages) => {
    return <PagerDotIndicator
      pageCount={pages}
      dotStyle={styles.inactiveViewPaggerDot(pages)}
      selectedDotStyle={styles.activeViewPaggerDot(pages)} />;
  }

  const onUnlockEroticImage = () => {
    dispatch(showToast('negative', 'This feature is under development!'))
  }

  return (
    <View style={styles.container}>
      <BackHeader title={'Flirts'} color={Colors.ui_primary} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>

          <IndicatorViewPager
            style={{ height: SCREEN_HEIGHT / 2, backgroundColor: Colors.grey }}
            indicator={_renderDotIndicator(params.item.profilepicture.length)}
          >
            {params.item.profilepicture.map((item, index) => {
              return <ImageBackground
                key={String(index)}
                blurRadius={item.is_erotic == "1" ? Platform.OS == 'ios' ? 40 : 5 : 0}
                style={styles.imgBackground}
                resizeMode={'cover'}
                source={{ uri: getItemImage(item.picture) }}>
                {item.is_erotic == "1" && (
                  <View style={styles.eroticContainer}>
                    <XXXCoinIcon width={60} height={60} />
                    <AppText
                      type={'black-italic'}
                      size={16}
                      style={{ marginTop: -10 }}
                      color={Colors.white}>{"EROTIC IMAGE"}</AppText>
                    <TouchableOpacity
                      onPress={onUnlockEroticImage}
                      style={styles.unlockEroticButtonContainer}>
                      <View style={{ marginBottom: -5, marginTop: 5, marginStart: -10 }}>
                        <CoinGradientIcon width={40} height={40} />
                      </View>
                      <AppText type={'black-italic'} size={12} color={Colors.white} uppercase>{`Unlock for ${10} coins`}</AppText>
                    </TouchableOpacity>
                  </View>
                )}
              </ImageBackground>
            })}

          </IndicatorViewPager>

          <View style={{ padding: 15 }}>
            <View style={styles.moderatorSwitchContainer}>
              <View style={{ flex: 0.7 }}>
                <View style={styles.moderatorNameContainer}>
                  <AppText type={'bold'} size={18} style={{ textTransform: 'capitalize', marginEnd: 10 }}>
                    {params.item.username}{params.item.dob ? `, ${moment().diff(moment(params.item.dob, 'YYYY-MM-DD'), 'years')}` : ''}
                  </AppText>
                  <OnlineStatusCircle isOnline={true} size={12} />
                </View>
                <AppText type={'regular'} size={16} style={{ textTransform: 'capitalize' }}>
                  {params.item.city + ", " + params.item.country}
                </AppText>
              </View>

              <View style={{ flex: 0.3, flexDirection: 'row' }}>
                <TouchableOpacity onPress={toggleSwitch}>
                  {isFavorite ? (
                    <StarFilledIcon width={24} height={24} />
                  ) : (
                    <StarOutlineIcon width={24} height={24} />
                  )}
                </TouchableOpacity>
                <DotsCircleIcon />
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
                onIconPress={onChatPress}
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
              <AppText type={'bold'} size={18}>{"Details"}</AppText>
              <AppText type={'regular'} color={Colors.greydark}>{"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias"}</AppText>
            </View>
            {params.item && params.item.dob && (
              <ProfileItem
                title={appLabels.dob}
                value={params.item.dob} />
            )}
            {params.item && params.item.Gender && (
              <ProfileItem
                title={appLabels.gender}
                value={params.item.Gender} />
            )}
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

const ProfileItem = ({ title, value }) => {
  return <View style={{ padding: 10 }}>
    <View>
      <AppText type={'regular'} size={14} color={Colors.black}>{title}</AppText>
      <AppText type={'bold'} size={16} color={Colors.black}>{value}</AppText>
    </View>
  </View>
}