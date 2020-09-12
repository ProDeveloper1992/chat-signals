import React, { useState } from 'react';
import { View, FlatList, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

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
          <TouchableOpacity
            key={String(index)}
            onPress={() => alert(123)} activeOpacity={0.6}>
            <ImageBackground
              style={styles.listItemContainer}
              resizeMode={'cover'}
              imageStyle={{ borderRadius: 5 }}
              source={{
                uri: item.image_url,
              }}>
              <OnlineStatus isOnline={item.is_online} />
            </ImageBackground>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const OnlineStatus = (props) => {
  const { isOnline } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 2,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        position: 'absolute',
        left: 5,
        top: 5,
      }}>
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          marginEnd: 5,
          backgroundColor: isOnline ? 'green' : 'red',
        }}></View>

      <Text style={{ color: 'black', fontSize: 12 }}>
        {isOnline ? 'Online' : 'Offline'}
      </Text>
    </View>
  )
}