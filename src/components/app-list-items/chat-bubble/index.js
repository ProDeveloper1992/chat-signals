import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Colors, Icons } from '../../../constants';
import { AppText } from '../../index';
import styles from './style';

export default function ChatBubble({ item, isFromUser }) {

  const getTickIcon = (seen) => {
    if (seen == 1) {
      return Icons.double_tick_icon;
    } else {
      return Icons.tick_icon;
    }
  }

  if (item.attachment[0] != null) {
    return null;
    // return (
    //   <TouchableOpacity style={styles.container(isFromUser)}>
    //     <Image style={{ width: 150, height: 150 }} source={{ uri: 'http://chat-signal.com/' + item.attachment[0] }} />
    //   </TouchableOpacity>
    // )
  }

  return (
    <TouchableOpacity style={styles.container(isFromUser)}>
      <View style={styles.textMsgContainer}>
        <AppText type={'medium'} color={isFromUser ? Colors.white : Colors.ui_primary}>{item.message}</AppText>
        {isFromUser && (
          <Image style={styles.seenIcon} source={getTickIcon(item.seen)} />
        )}
      </View>
    </TouchableOpacity>
  );
}
