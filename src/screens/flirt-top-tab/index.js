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
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './style';
import { AppIndicatorLoader, AppText, ModeratorListItem, NoListData } from '../../components';
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
  const { userData, authToken } = useSelector((state) => state.userState);
  const { appLabels } = useSelector((state) => state.appState);

  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (authToken != null) {
      setPageNumber(1);
      let requestData = {
        page: 1,
        customer_id: userData.id,
        gender: ''
      };
      dispatch(getFlirtsList(requestData));
    }
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

  const onLoadMore = () => {
    if (!isLoadMoreFlirts)
      return;
    handleLoadMore();
  };


  return (
    <View style={styles.container}>
      {flirtsLoading && flirtsList.length == 0 ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
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
          contentContainerStyle={{ flexGrow: 1, padding: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View key={String(index)} style={{ flex: index == flirtsList.length - 1 && index % 2 == 0 ? 0.5 : 1 }}>
              <ModeratorListItem
                item={item}
                onPress={() =>
                  navigation.navigate('ModeratorProfile', { item: item, isFromChat: false })
                }
              />
            </View>
          )}
          keyExtractor={(item, index) => String(index)}
          onEndReachedThreshold={1}
          onEndReached={onLoadMore}
          ListFooterComponent={
            isLoadMoreFlirts && flirtsList.length > 0 ?
              <View
                style={{ alignSelf: 'center', paddingVertical: wp(1.5), paddingHorizontal: wp(3.5), backgroundColor: Colors.ui_primary, borderRadius: wp(10), marginTop: wp(2) }}>
                <ActivityIndicator size={'small'} color={Colors.white} style={{ width: wp(4), height: wp(4), marginVertical: wp(2) }} />
              </View> : null
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
