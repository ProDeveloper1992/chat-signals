import React from 'react';
import { TouchableOpacity, ImageBackground, View, Image } from 'react-native';
import { Colors, DEFAULT_IMAGE_URL, Icons } from '../../../constants';
import styles from './style';
import { AppText } from '../../index';

export default function ModeratorListItem({ item, onPress, bookmarked }) {

  const getItemImage = (imageUrl) => {
    if (imageUrl != null) {
      return imageUrl;
    } else {
      return DEFAULT_IMAGE_URL;
    }
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <ImageBackground
        style={styles.listItemContainer}
        resizeMode={'cover'}
        imageStyle={{ borderRadius: 20 }}
        source={{
          uri: getItemImage(item.picture),
        }}>
        {bookmarked && (
          <View style={styles.bookmarkedContainer}>
            <Image source={Icons.bookmark} style={styles.bookmarkIcon} />
          </View>
        )}
        <View style={styles.bottomContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText type={'bold'} color={Colors.white}>
              {item.username}
            </AppText>
            <View style={styles.onlineStatusSignal(item.is_online)} />
          </View>
          <AppText size={12} type={'regular'} color={Colors.white} uppercase>{item.city + ", " + item.country}</AppText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
