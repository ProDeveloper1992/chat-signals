import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { ModeratorListItem, NoListData } from '../../../components';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { Colors, Icons } from '../../../constants';

export default function BookmarkTopTab(props) {
  const { bookmarksList } = useSelector((state) => state.bookmarkState);

  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const render_FlatList_header = () => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 15,
          marginBottom: 5,
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flex: 0.85,
            backgroundColor: Colors.white,
            marginEnd: 10,
            borderRadius: 4,
            elevation: 4,
          }}>
          <TextInput
            style={{ paddingStart: 10 }}
            placeholder="Search..."
            value={search}
            onChangeText={() => { }}
          />
        </View>
        <TouchableOpacity
          style={{
            flex: 0.15,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.ui_primary,
            borderRadius: 4,
            elevation: 4,
          }}
          onPress={() => { }}
          activeOpacity={0.5}>
          <Image
            source={Icons.search}
            style={{
              height: 24,
              width: 24,
              tintColor: Colors.white,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <NoListData title={'No bookmars found!'} /> */}
      <FlatList
        data={bookmarksList}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        // ListHeaderComponent={render_FlatList_header}
        renderItem={({ item, index }) => (
          <ModeratorListItem
            key={String(index)}
            item={item}
            bookmarked
            onPress={() =>
              navigation.navigate('ModeratorProfile', { item: item })
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
