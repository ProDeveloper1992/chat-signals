import React, {useState} from 'react';
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

export default function UserProfilePhotosTab(props) {
  const [photosList, setphotosList] = useState([
    {
      image: 'https://picsum.photos/200',
    },
    {
      image: 'https://picsum.photos/300',
    },
    {
      image: 'https://picsum.photos/220',
    },
    {
      image: 'https://picsum.photos/240',
    },
    {
      image: 'https://picsum.photos/260',
    },
    {
      image: 'https://picsum.photos/265',
    },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={photosList}
        numColumns={2}
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View
            key={String(index)}
            style={{
              flex: 1,
              marginTop: 3,
              marginHorizontal:2,
              width: listItemWidth,
              height: listItemHeight,
              backgroundColor: 'lightgrey',
            }}>
            <Image
              source={{uri: item.image}}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        )}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
}
