import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {ModeratorListItem} from '../../components';
import {useNavigation} from '@react-navigation/native'

import styles from './style';

export default function SuperFlirtTab(props) {
  const {flirtsData} = useSelector((state) => state.flirtsState);

  const navigation = useNavigation();

  const superFlirtsList = flirtsData.filter((item) => item.is_super_flirt);

  return (
    <View style={styles.container}>
      <FlatList
        data={superFlirtsList}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ModeratorListItem
            item={item}
            key={String(index)}
            onPress={() =>
              navigation.navigate('ModeratorProfile', {item: item})
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
