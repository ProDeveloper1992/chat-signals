import moment from 'moment';
import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import { Colors, Icons, Images } from '../../../constants';
import { AppText } from '../../index';
import style from '../moderator-list-item/style';
import styles from './style';

export default function ChatListItem({
  onChatPress,
  profileImage,
  userName,
  lastMessage,
  lastMessageTime,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onChatPress}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.profileImageContainer}>
          <Image style={styles.profileImg} source={profileImage} />
          <View style={styles.activeStatusCircle} />
        </View>
        <View style={styles.userDetailContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText
              type={'bold'}
              size={16}
              color={Colors.black}
              numberOfLines={1}
              style={{ flex: 1 }}
            >
              {userName}
            </AppText>
            <AppText size={12}>{moment(lastMessageTime).fromNow()}</AppText>
          </View>
          <AppText
            type={'regular'}
            size={14}
            color={Colors.black}
            numberOfLines={1}
            style={{
              marginTop: 5,
            }}>
            {lastMessage != "" ? lastMessage : "Media"}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

ChatListItem.propTypes = {
  profileImage: PropTypes.any,
  userName: PropTypes.string,
  lastMessage: PropTypes.any,
  lastMessageTime: PropTypes.string,
  onChatPress: PropTypes.func,
};

ChatListItem.defaultProps = {
  profileImage: Images.forgot_heart_logo,
  userName: 'Username',
  lastMessage: 'Last Message',
  lastMessageTime: new Date(),
  onChatPress: () => { },
};
