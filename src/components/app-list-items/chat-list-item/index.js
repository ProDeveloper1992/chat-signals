import moment from 'moment';
import React from 'react';
import { View, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import { Colors, Images, SCREEN_WIDTH } from '../../../constants';
import { AppText, CommonImage } from '../../index';
import styles from './style';
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { toggleGallerySwiperModal } from '../../../redux/actions/app-modals-actions';

export default function ChatListItem({
  onChatPress,
  profileImage,
  userName,
  lastMessage,
  lastMessageTime,
  isActive,
  item
}) {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      // underlayColor={'rgba(15, 41, 55, 0.1)'}
      style={[styles.container, { backgroundColor: item.unseenCounter * 1 > 0 ? 'rgba(15, 41, 55, 0.1)' : Colors.white }]}
      onPress={onChatPress}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.profileImageContainer}>
          <CommonImage
            touchable={true}
            size={57}
            borderWidth={0}
            source={profileImage}
          // onPress={() => dispatch(toggleGallerySwiperModal(true, [profileImage]))}
          />
          <View style={styles.activeStatusCircle(isActive)} />
        </View>
        <View style={styles.userDetailContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText
              type={'bold'}
              size={16}
              color={Colors.black}
              numberOfLines={1}
              style={{ flex: 1, textTransform: 'capitalize' }}

            >
              {userName}
            </AppText>
            <AppText size={12} type={item.unseenCounter * 1 > 0 ? 'bold' : 'regular'}>{moment(lastMessageTime).fromNow()}</AppText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText
              type={item.unseenCounter * 1 > 0 ? 'bold' : 'regular'}
              size={14}
              color={Colors.black}
              numberOfLines={1}
              style={{
                flex: 1.2,
                marginTop: 5,
              }}>
              {lastMessage != "" ? lastMessage : "Attachment"}
            </AppText>
            <View style={{ flex: 0.8, alignItems: 'flex-end' }}>
              {item.unseenCounter * 1 > 0 && (
                <LinearGradient
                  colors={[Colors.ui_counter_badge_gradient_1, Colors.ui_counter_badge_gradient_2]}
                  style={styles.unSeenBadgeContainer}>
                  <AppText
                    type={'bold'}
                    size={11}
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
  lastMessageTime: new Date(),
  item: {},
  onChatPress: () => { },
};
