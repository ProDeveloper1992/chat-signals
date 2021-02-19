import React, { useState } from 'react';
import { TouchableOpacity, ImageBackground, View, Image } from 'react-native';
import { Colors, DEFAULT_IMAGE_URL, Icons } from '../../../constants';
import styles from './style';
import { AppText, OnlineStatusCircle } from '../../index';

export default function ModeratorListItem({ item, onPress, bookmarked }) {

  const [contentVisible, setContentVisible] = useState(false);

  const getItemImage = (imageUrl) => {
    if (imageUrl != null) {
      return imageUrl;
    } else {
      return DEFAULT_IMAGE_URL;
    }
  }

  const onItemPress = () => {
    setContentVisible(true);
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ImageBackground
        style={styles.listItemContainer}
        resizeMode={'cover'}
        imageStyle={{ borderRadius: 20 }}
        source={{
          uri: getItemImage(item.picture),
        }}>
        {/* {contentVisible ? (
          <TouchableOpacity style={styles.popupContainer} onPress={() => setContentVisible(false)}>
            <TouchableOpacity onPress={onPress} style={styles.bottomContainer}>
              <AppText size={12} type={'medium'} color={Colors.white} style={{ textAlign: 'center' }}>{"View Profile"}</AppText>
            </TouchableOpacity>
          </TouchableOpacity>
        ) : ( */}
        <View style={styles.bottomContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText type={'bold'} color={Colors.white} size={20} style={styles.userName}>
              {item.username}
            </AppText>
            <OnlineStatusCircle isOnline={true} size={12} />
          </View>
          <AppText
            size={16}
            type={'regular'}
            color={Colors.white}
            style={[styles.userName, { textTransform: 'capitalize' }]}>{item.city + ", " + item.country}</AppText>
        </View>
        {/* )} */}
      </ImageBackground>
    </TouchableOpacity>
  );
}
