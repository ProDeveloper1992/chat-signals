import React from 'react';
import {View, ScrollView, Image, FlatList} from 'react-native';
import {AppText} from '../../../components';
import {Colors, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import styles from './style';

const listColums = 2;
const listRows = 3.5;
const listItemMargin = 10;
const listItemWidth =
  (SCREEN_WIDTH - (listColums + 1) * listItemMargin) / listColums;
const listItemHeight =
  (SCREEN_HEIGHT - (listRows + 1) * listItemMargin) / listRows;

export default function ModeratorProfilePhotosTab(props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={props.photosList}
        numColumns={2}
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View
            key={String(index)}
            style={{
              flex: 1,
              marginLeft: listItemMargin,
              marginTop: 10,
              width: listItemWidth,
              height: listItemHeight,
              backgroundColor: 'lightgrey',
              borderRadius: 5,
            }}>
            <Image
              source={{uri: item.image}}
              style={{height:"100%",width:'100%'}}
            />
          </View>
        )}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
}
