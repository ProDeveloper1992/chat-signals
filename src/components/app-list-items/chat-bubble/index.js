import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

import { Colors, Icons } from '../../../constants';
import { AppText } from '../../index';
import styles from './style';
import { MessageSeenIcon, MessageSentIcon } from '../../../constants/svg-icons';

export default function ChatBubble({ item, isFromUser }) {

  const getTickIcon = (seen) => {
    if (seen * 1 == 1) {
      return <MessageSeenIcon />;
    } else {
      return <MessageSentIcon />;
    }
  }

  if (item.attachment[0] != null) {
    if (item.attachment[2] == 'image') {
      return (
        <View>
          <TouchableOpacity
            disabled
            style={[styles.container(isFromUser), { paddingVertical: 10, paddingHorizontal: 10 }]}>
            <FastImage
              style={styles.imageContainer}
              source={{
                uri: 'http://www.chat-signal.com/public/storage/attachments/' + item.attachment[0],
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            {item.message != '' && (
              <AppText color={isFromUser ? Colors.black : Colors.white}>{item.message}</AppText>
            )}
          </TouchableOpacity>
          <View style={styles.seenTimeContainer(isFromUser)}>
            <AppText size={12}>{moment(item.fullTime).format("HH:mm")}</AppText>
            {isFromUser && (
              <View style={{ marginStart: 5 }}>
                {getTickIcon(item.seen)}
              </View>
            )}
          </View>
        </View>
      )
    }
    return null;
  }

  return (
    <View>
      <TouchableOpacity
        disabled
        style={styles.container(isFromUser)}>
        <View style={styles.textMsgContainer}>
          <AppText type={'regular'} color={isFromUser ? Colors.black : Colors.white}>{item.message}</AppText>
        </View>
      </TouchableOpacity>
      <View style={styles.seenTimeContainer(isFromUser)}>
        <AppText size={12}>{moment(item.fullTime).format("HH:mm")}</AppText>
        {isFromUser && (
          // <Image style={styles.seenIcon} source={getTickIcon(item.seen)} />
          <View style={{ marginStart: 5 }}>
            {getTickIcon(item.seen)}
          </View>
        )}
      </View>
    </View>
  );
}
