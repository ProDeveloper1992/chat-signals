import React from 'react';
import {TouchableOpacity, ImageBackground, View, Image} from 'react-native';
import {Colors, Icons} from '../../../constants';
import styles from './style';
import {AppText} from '../../index';

export default function ModeratorListItem({item, onPress, bookmarked}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <ImageBackground
        style={styles.listItemContainer}
        resizeMode={'cover'}
        imageStyle={{borderRadius: 5}}
        source={{
          uri: item.image_url,
        }}>
        {bookmarked && (
          <View style={styles.bookmarkedContainer}>
            <Image source={Icons.bookmark} style={styles.bookmarkIcon} />
          </View>
        )}
        <View style={styles.bottomContainer}>
          <View style={styles.onlineStatusSignal(item.is_online)} />
          <AppText type={'bold'} color={Colors.white}>
            {item.name}
          </AppText>
          <Image
            source={{
              uri:
                'https://cdn.countryflags.com/thumbs/germany/flag-round-250.png',
            }}
            style={{width: 18, height: 18, resizeMode: 'contain'}}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
