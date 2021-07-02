import moment from 'moment';
import React from 'react';
import { View, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import { Colors, Images, SCREEN_WIDTH } from '../../../constants';
import { OnlineStatusCircle, SwipableRow } from '../../../components';
import { AppText, CommonImage } from '../../index';
import styles from './style';
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { toggleGallerySwiperModal } from '../../../redux/actions/app-modals-actions';
import { MessageSeenIcon, MessageDeliveredIcon, StickerGradientIcon32 } from '../../../constants/svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function ChatListItem({
  onChatPress,
  profileImage,
  userName,
  lastMessageTime,
  isActive,
  item
}) {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.userState);

  const getLastMessage = () => {
    if (item.lastMessage != null) {
      if (item.lastMessage.attachment) {
        return "Attachment";
      } else {
        return item.lastMessage.body;
      }
    } else {
      return "";
    }
  }

  // const renderDelete = () => {
  //   return <StickerGradientIcon32 />;
  // }

  return (
    <View style={{
      flex: 1,
      borderBottomWidth: 1,
      borderColor: Colors.grey
    }}>
      {/* <SwipableRow
        width={wp(5)}
        buttons={[renderDelete()]}
      > */}
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.container, { backgroundColor: item.unseenCounter * 1 > 0 ? 'rgba(15, 41, 55, 0.1)' : Colors.white }]}
        onPress={onChatPress}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={styles.profileImageContainer}>
            <CommonImage
              touchable={false}
              size={wp(15)}
              borderWidth={0}
              source={profileImage}
            // onPress={() => dispatch(toggleGallerySwiperModal(true, [profileImage]))}
            />
            <View style={styles.activeStatusCircle}>
              <OnlineStatusCircle isOnline={isActive} size={wp(3.3)} />
            </View>

          </View>
          <View style={styles.userDetailContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText
                type={'bold'}
                size={wp(4.5)}
                color={Colors.black}
                numberOfLines={1}
                style={{ flex: 1, textTransform: 'capitalize' }}

              >
                {userName}
              </AppText>
              <AppText size={wp(3.5)} type={item.unseenCounter * 1 > 0 ? 'bold' : 'regular'}>{moment(lastMessageTime).fromNow()}</AppText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1.2, flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                {userData && item.lastMessage && item.lastMessage.from_id == userData.id && item.lastMessage.seen == '0' && (
                  <View style={{ marginEnd: 5 }}>
                    <MessageDeliveredIcon />
                  </View>
                )}
                {userData && item.lastMessage && item.lastMessage.from_id == userData.id && item.lastMessage.seen == '1' && (
                  <View style={{ marginEnd: 5 }}>
                    <MessageSeenIcon />
                  </View>
                )}
                <AppText
                  type={item.unseenCounter * 1 > 0 ? 'bold' : 'regular'}
                  size={wp(4)}
                  color={Colors.black}
                  numberOfLines={1}
                >
                  {getLastMessage()}
                </AppText>
              </View>
              <View style={{ flex: 0.8, alignItems: 'flex-end' }}>
                {item.unseenCounter * 1 > 0 && (
                  <LinearGradient
                    colors={[Colors.ui_counter_badge_gradient_1, Colors.ui_counter_badge_gradient_2]}
                    style={styles.unSeenBadgeContainer}>
                    <AppText
                      type={'bold'}
                      size={wp(3)}
                      color={Colors.white}>
                      {item.unseenCounter}
                    </AppText>
                  </LinearGradient>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {/* </SwipableRow> */}
    </View>
  );
}

export const ChatListItemLoader = () => (
  <View style={styles.container}>
    <ContentLoader
      speed={0.5}
      width={SCREEN_WIDTH}
      height={80}
      viewBox={`0 0 ${SCREEN_WIDTH} 80`}
      backgroundColor={Colors.ui_background}
      foregroundColor={Colors.grey}
    >
      <Circle cx="30" cy="40" r="30" />
      <Rect x="80" y="10" rx="5" ry="5" width={SCREEN_WIDTH / 1.5} height="20" />
      <Rect x="80" y="40" rx="5" ry="5" width={SCREEN_WIDTH / 2} height="15" />
    </ContentLoader>
  </View>
);

ChatListItem.propTypes = {
  isActive: PropTypes.bool,
  loading: PropTypes.bool,
  profileImage: PropTypes.any,
  userName: PropTypes.string,
  lastMessage: PropTypes.any,
  lastMessageTime: PropTypes.string,
  onChatPress: PropTypes.func,
  item: PropTypes.object
};

ChatListItem.defaultProps = {
  isActive: false,
  loading: true,
  profileImage: Images.app_logo,
  userName: 'Username',
  lastMessage: 'Last Message',
  lastMessageTime: Date.now(),
  item: {},
  onChatPress: () => { },
};
