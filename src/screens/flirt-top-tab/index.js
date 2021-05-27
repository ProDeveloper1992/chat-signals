import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppIndicatorLoader, AppText, ModeratorListItem, NoListData } from '../../components';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import styles from './style';
import { getFlirtsList } from '../../redux/actions/flirts-actions';
import { getCustomerProfileDetail } from '../../redux/actions/user-actions';
import { Colors, Icons } from '../../constants';
import { ModeratorListItemLoader } from '../../components/app-list-items/moderator-list-item';

export default function FlirtTab(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [search, setSearch] = useState('');
  const { flirtsList, flirtsLoading, isLoadMoreFlirts } = useSelector((state) => state.flirtsState);
  const { userData } = useSelector((state) => state.userState);

  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let requestData = {
      page: pageNumber,
      customer_id: userData.id,
      gender: ''
    };
    dispatch(getFlirtsList(requestData));
    dispatch(getCustomerProfileDetail());
  }, []);

  const handleLoadMore = () => {
    let requestData = {
      page: pageNumber + 1,
      customer_id: userData.id,
      gender: ''
    };
    dispatch(getFlirtsList(requestData));
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
    await dispatch(getFlirtsList(requestData));
    setRefreshing(false);
  }

  return (
    <View style={styles.container}>
      {flirtsLoading && flirtsList.length == 0 ? (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          numColumns={2}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20, paddingHorizontal: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View key={String(index)} style={{ flex: 0.5 }}>
              <ModeratorListItemLoader />
            </View>
          )}
          keyExtractor={(item, index) => String(index)}
        />
      ) : (
        <FlatList
          data={flirtsList}
          numColumns={2}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20, paddingHorizontal: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View key={String(index)} style={{ flex: 0.5 }}>
              <ModeratorListItem
                item={item}
                onPress={() =>
                  navigation.navigate('ModeratorProfile', { item: item })
                }
              />
            </View>
          )}
          keyExtractor={(item, index) => String(index)}
          ListFooterComponent={
            isLoadMoreFlirts && flirtsList.length > 0 ?
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleLoadMore}
                style={{ alignSelf: 'center', paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Colors.ui_primary, borderRadius: 15, marginTop: 10 }}>
                {flirtsLoading ? (
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
          ListEmptyComponent={<NoListData title={"No flirts found!"} />}
        />
      )}
    </View>
  );
}
