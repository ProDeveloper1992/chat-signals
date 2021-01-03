import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppIndicatorLoader, ModeratorListItem, NoListData } from '../../../components';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { getFavorites } from '../../../redux/actions/user-actions';

export default function BookmarkTopTab(props) {

  const dispatch = useDispatch();

  const { bookmarksList, bookmarksLoading } = useSelector((state) => state.bookmarkState);
  const { appLabels } = useSelector((state) => state.appState);

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getFavorites());
  }, []);


  return (
    <View style={styles.container}>
      {bookmarksLoading ? (
        <AppIndicatorLoader />
      ) : (
          <FlatList
            data={bookmarksList}
            numColumns={2}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
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
            ListEmptyComponent={<NoListData title={appLabels.no_bookmarks} />}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
    </View>
  );
}
