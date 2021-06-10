import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Colors, DEFAULT_IMAGE_URL, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants';
import styles from './style';
import { AppText, OnlineStatusCircle } from '../../index';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import ScalableImage from '../../app-scalable-image';

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
      <ImageBackground
        style={styles.listItemContainer}
        imageStyle={{ borderRadius: 20 }}
        source={{ uri: getItemImage(item.profilepicture) }}
      >
        <LinearGradient
          colors={getGradientColors()}
          style={{
            flex: 1, borderRadius: 20,
          }}>
          <View style={styles.bottomContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText numberOfLines={1} type={'bold'} color={Colors.white} size={14} style={styles.userName}>
                {item.username}{item.dob ? `, ${moment().diff(moment(item.dob, 'YYYY-MM-DD'), 'years')}` : ''}
              </AppText>
              <OnlineStatusCircle isOnline={true} size={12} />
            </View>
            <AppText
              size={12}
              type={'medium'}
              color={Colors.white}
              numberOfLines={2}
              style={[styles.userName, { textTransform: 'capitalize' }]}>{item.city + ", " + item.country}</AppText>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export const ModeratorListItemLoader = () => (
  <ContentLoader
    speed={1}
    width={(SCREEN_WIDTH / 2) - 20}
    height={SCREEN_HEIGHT / 3.5}
    viewBox={`0 0 ${SCREEN_WIDTH / 2} ${SCREEN_HEIGHT / 3.5}`}
    backgroundColor={Colors.ui_background}
    foregroundColor={Colors.grey}
  >
    <Rect x="20" y="10" rx="20" ry="20" width={(SCREEN_WIDTH / 2) - 20} height={SCREEN_HEIGHT / 3.5} />
  </ContentLoader>
);