import moment from 'moment';
import React from 'react';
import { View, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import { Colors, Images, SCREEN_WIDTH } from '../../../constants';
import { AppText, CommonImage } from '../../index';
import styles from './style';
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

export default function ChatListItem({
  onChatPress,
  profileImage,
  userName,
  lastMessage,
  lastMessageTime,
  isActive
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      // underlayColor={'rgba(15, 41, 55, 0.1)'}
      style={styles.container}
      onPress={onChatPress}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.profileImageContainer}>
          <CommonImage size={57} source={profileImage} />
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
            <AppText size={12}>{moment(lastMessageTime).fromNow()}</AppText>
          </View>
          <AppText
            size={14}
            color={Colors.black}
            numberOfLines={1}
            style={{
              marginTop: 5,
            }}>
            {lastMessage != "" ? lastMessage : "Attachment"}
          </AppText>
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
};

ChatListItem.defaultProps = {
  isActive: false,
  loading: true,
  profileImage: Images.forgot_heart_logo,
  userName: 'Username',
  lastMessage: 'Last Message',
  lastMessageTime: new Date(),
  onChatPress: () => { },
};
