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
import { userProfileDetail } from '../../redux/actions/user-actions';
import { Colors, Icons } from '../../constants';

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
    dispatch(userProfileDetail());
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
        <AppIndicatorLoader />
      ) : (
        <FlatList
          data={flirtsList}
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
          keyExtractor={(item, index) => index.toString()}
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
