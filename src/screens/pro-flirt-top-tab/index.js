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
import { getFlirtsList, getProFlirtsList } from '../../redux/actions/flirts-actions';

export default function ProFlirtTab(props) {
  const dispatch = useDispatch();

  const { spotLightsList, proFlirtsLoading } = useSelector((state) => state.flirtsState);
  const { userData } = useSelector((state) => state.userState);

  useEffect(() => {
    let requestData = {
      page: 1,
      customer_id: userData.id,
      gender: ''
    };
    dispatch(getProFlirtsList(requestData));
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {proFlirtsLoading ? (
        <AppIndicatorLoader />
      ) : (
        <FlatList
          data={spotLightsList}
          numColumns={2}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ModeratorListItem
              isBoosted
              item={item}
              key={String(index)}
              onPress={() =>
                navigation.navigate('ModeratorProfile', { item: item })
              }
            />
          )}
          ListEmptyComponent={<NoListData title={"No Spotlights Found!"} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}
