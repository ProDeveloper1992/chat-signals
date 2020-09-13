import React, { useState } from 'react';
import { View, FlatList, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { ModeratorListItem } from '../../components';

import styles from './style'

export default function FlirtTab(props) {

  const { flirtsData } = useSelector((state) => state.flirtsState);

  const flirtsList = flirtsData.filter((item) => item.is_super_flirt === false)

  return (
    <View style={styles.container}>
      <FlatList
        data={flirtsList}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ModeratorListItem item={item} key={String(index)} onPress={() => { }} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};