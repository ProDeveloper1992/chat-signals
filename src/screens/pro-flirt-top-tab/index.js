import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppIndicatorLoader, ModeratorListItem, NoListData } from '../../components';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import { Colors, Icons } from '../../constants';
import { getFlirtsList } from '../../redux/actions/flirts-actions';

export default function ProFlirtTab(props) {
  const dispatch = useDispatch();

  const { proFlirtsList, proFlirtsLoading } = useSelector((state) => state.flirtsState);

  useEffect(() => {
    let requestData = {
      page: 1,
    };
    dispatch(getFlirtsList(requestData));
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {proFlirtsLoading ? (
        <AppIndicatorLoader />
      ) : (
          <FlatList
            data={proFlirtsList}
            numColumns={2}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <ModeratorListItem
                item={item}
                key={String(index)}
                onPress={() =>
                  navigation.navigate('ModeratorProfile', { item: item })
                }
              />
            )}
            ListEmptyComponent={<NoListData title={"No Pro Flirts Found!"} />}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
    </View>
  );
}
