import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Colors, Icons, IMAGE_BASE_URL } from '../../../constants';
import { AppText } from '../../index';
import styles from './style';
import { MessageSeenIcon, MessageDeliveredIcon } from '../../../constants/svg-icons';
import { useDispatch } from 'react-redux';
import { toggleGallerySwiperModal } from '../../../redux/actions/app-modals-actions';

export default function ChatBubble({ item, isFromUser }) {

  const dispatch = useDispatch();

  const getTickIcon = (seen) => {
    if (seen * 1 == 1) {
      return <MessageSeenIcon width={wp(3.5)} height={wp(3.5)} />;
    } else {
      return <MessageDeliveredIcon width={wp(3.5)} height={wp(3.5)} />;
    }
  }

  if (item.attachment[0] != null) {
    if (item.attachment[2] == 'image') {
      return (
        <View>
          <TouchableOpacity
            // disabled
            activeOpacity={0.8}
            onPress={() => dispatch(toggleGallerySwiperModal(true, [{ url: IMAGE_BASE_URL + 'attachments/' + item.attachment[0] }]))}
            style={[styles.container(isFromUser), { paddingHorizontal: wp(2) }]}>
            <FastImage
              style={styles.imageContainer}
              source={{
                uri: IMAGE_BASE_URL + 'attachments/' + item.attachment[0],
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            {item.message != '' && (
              <AppText size={wp(3.5)} color={isFromUser ? Colors.black : Colors.white}>{item.message}</AppText>
            )}
          </TouchableOpacity>
          <View style={styles.seenTimeContainer(isFromUser)}>
            <AppText size={wp(2.8)}>{moment(item.fullTime).format("HH:mm")}</AppText>
            {isFromUser && (
              <View style={{ marginStart: wp(2) }}>
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
          <AppText size={wp(3.5)} type={'regular'} color={isFromUser ? Colors.black : Colors.white}>{item.message}</AppText>
        </View>
      </TouchableOpacity>
      <View style={styles.seenTimeContainer(isFromUser)}>
        <AppText size={wp(2.8)}>{moment(item.fullTime).format("HH:mm")}</AppText>
        {isFromUser && (
          <View style={{ marginStart: wp(2) }}>
            {getTickIcon(item.seen)}
          </View>
        )}
      </View>
    </View>
  );
}
