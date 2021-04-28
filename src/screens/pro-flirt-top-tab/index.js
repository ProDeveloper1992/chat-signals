import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppIndicatorLoader, AppText, ModeratorListItem, NoListData } from '../../components';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import { Colors, Icons } from '../../constants';
import { getFlirtsList, getProFlirtsList } from '../../redux/actions/flirts-actions';

export default function ProFlirtTab(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { spotLightsList, spotLightsLoading, isLoadMoreSpotlights } = useSelector((state) => state.flirtsState);
  const { userData } = useSelector((state) => state.userState);

  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let requestData = {
      page: pageNumber,
      customer_id: userData.id,
      gender: ''
    };
    dispatch(getProFlirtsList(requestData));
  }, []);

  const handleLoadMore = () => {
    let requestData = {
      page: pageNumber + 1,
      customer_id: userData.id,
      gender: ''
    };
    dispatch(getProFlirtsList(requestData));
    setPageNumber(pageNumber + 1);
  }

  const onRefresh = async () => {
    setPageNumber(1);
    setRefreshing(true);
    let requestData = {
      page: 1,
      customer_id: userData.id,
      gender: ''
    };
    await dispatch(getProFlirtsList(requestData));
    setRefreshing(false);
  }

  return (
    <View style={styles.container}>
      {spotLightsLoading && spotLightsList.length == 0 ? (
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
          ListFooterComponent={
            isLoadMoreSpotlights && spotLightsList.length > 0 ?
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleLoadMore}
                style={{ alignSelf: 'center', paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Colors.ui_primary, borderRadius: 15, marginTop: 10 }}>
                {spotLightsLoading ? (
                  <ActivityIndicator size={'small'} color={Colors.white} style={{ width: 14, height: 14, marginVertical: 5 }} />
                ) : (
                  <AppText type={'medium'} color={Colors.white}>{"See more"}</AppText>
                )}
              </TouchableOpacity> : null
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </View>
  );
}
