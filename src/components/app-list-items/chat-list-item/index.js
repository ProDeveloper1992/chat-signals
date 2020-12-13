import moment from 'moment';
import React from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import PropTypes from 'prop-types';

import {Colors, Icons, Images} from '../../../constants';
import {AppText} from '../../index';
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
      <View style={{flexDirection: 'row'}}>
        <Image style={styles.profileImg} source={profileImage} />
        <View style={styles.userDetailContainer}>
          <AppText
            type={'bold'}
            size={14}
            color={Colors.black}
            >
            {userName}
          </AppText>
          <AppText
            type={'light'}
            size={12}
            color={Colors.black}
            style={{
              marginTop: 5,
            }}>
            {lastMessage!=""?lastMessage:"Media"}
          </AppText>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <AppText size={10}>{moment(lastMessageTime).fromNow()}</AppText>
        <Image style={styles.arrowRight} source={Icons.right_arrow} />
      </View>
    </TouchableOpacity>
  );
}

ChatListItem.propTypes = {
  profileImage:PropTypes.any,
  userName:PropTypes.string,
  lastMessage:PropTypes.any,
  lastMessageTime:PropTypes.string,
  onChatPress:PropTypes.func,
};

ChatListItem.defaultProps = {
  profileImage:Images.forgot_heart_logo,
  userName:'Username',
  lastMessage:'Last Message',
  lastMessageTime:new Date(),
  onChatPress:()=>{},
};
