import React, { useState } from 'react';
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { NoListData, AppText, BackHeader, TagItem, OnlineStatusCircle } from '../../components';
import { Icons, Colors, DEFAULT_IMAGE_URL } from '../../constants';
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
  DotsCircleIcon
} from '../../constants/svg-icons';

export default function ModeratorProfile(props) {

  const dispatch = useDispatch();

  const { params } = props.route;
  const { navigation } = props;

  const { appLabels } = useSelector((state) => state.appState);

  const [isFavorite, setIsFavorite] = useState(false);
  const [activityType, setActivityType] = useState('kisses');
  const [activityModalVisible, setActivityModalVisible] = useState(false);

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
    // navigation.navigate('ChatDetail', { item: params.item });
  }

  return (
    <View style={styles.container}>
      <BackHeader title={'Flirts'} color={Colors.ui_primary} />
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
              <View style={{ flex: 0.7 }}>
                <View style={styles.moderatorNameContainer}>
                  <AppText type={'bold'} size={18} style={{ textTransform: 'capitalize', marginEnd: 10 }}>
                    {params.item.username}
                  </AppText>
                  <OnlineStatusCircle isOnline={true} size={12} />
                </View>
                <AppText type={'regular'} style={{ textTransform: 'capitalize' }}>
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
