import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Colors, DEFAULT_IMAGE_URL, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants';
import styles from './style';
import { AppText, OnlineStatusCircle } from '../../index';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

export default function ModeratorListItem({ item, onPress, isBoosted }) {

  const getItemImage = (imageUrls) => {
    if (imageUrls && imageUrls.length > 0) {
      return imageUrls[0].picture;
    } else {
      return DEFAULT_IMAGE_URL;
    }
  }

  const getGradientColors = () => {
    if (isBoosted) {
      return [Colors.transparent, Colors.transparent, 'rgba(100, 55, 215, 0.44)'];
    } else {
      return [Colors.transparent, Colors.transparent, 'rgba(15, 41, 55, 0.47)'];
    }
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <FastImage
        style={styles.listItemContainer}
        source={{
          uri: getItemImage(item.profilepicture),
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      >
        <LinearGradient
          colors={getGradientColors()}
          style={{
            flex: 1, borderRadius: 20,
          }}>
          <View style={styles.bottomContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText type={'bold'} color={Colors.white} size={20} style={styles.userName}>
                {item.username}{item.dob ? `, ${moment().diff(moment(item.dob, 'YYYY-MM-DD'), 'years')}` : ''}
              </AppText>
              <OnlineStatusCircle isOnline={true} size={12} />
            </View>
            <AppText
              size={16}
              type={'regular'}
              color={Colors.white}
              style={[styles.userName, { textTransform: 'capitalize' }]}>{item.city + ", " + item.country}</AppText>
          </View>
        </LinearGradient>
      </FastImage>
    </TouchableOpacity>
  );
}

export const ModeratorListItemLoader = () => (
  <ContentLoader
    speed={1}
    width={SCREEN_WIDTH - 20}
    height={310}
    viewBox={`0 0 ${SCREEN_WIDTH} 310`}
    backgroundColor={Colors.ui_background}
    foregroundColor={Colors.grey}
  >
    <Rect x="20" y="10" rx="20" ry="20" width={SCREEN_WIDTH - 20} height="310" />
  </ContentLoader>
);