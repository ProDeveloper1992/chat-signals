import React from 'react';
import { TouchableOpacity, ImageBackground, View } from 'react-native';
import { Colors, DEFAULT_IMAGE_URL } from '../../../constants';
import styles from './style';
import { AppText, OnlineStatusCircle } from '../../index';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

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
        resizeMode={'cover'}
        imageStyle={{ borderRadius: 20 }}
        source={{
          uri: getItemImage(item.profilepicture),
        }}>
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
      </ImageBackground>
    </TouchableOpacity>
  );
}
