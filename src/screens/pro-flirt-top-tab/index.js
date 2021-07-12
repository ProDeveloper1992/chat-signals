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
import { useIsFocused, useNavigation } from '@react-navigation/native';

import styles from './style';
import { Colors, Icons } from '../../constants';
import { getFlirtsList, getProFlirtsList } from '../../redux/actions/flirts-actions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export default function ProFlirtTab(props) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const { spotLightsList, spotLightsLoading, isLoadMoreSpotlights } = useSelector((state) => state.flirtsState);
  const { userData, authToken } = useSelector((state) => state.userState);
  const { appLabels } = useSelector((state) => state.appState);

  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (authToken != null) {
      setPageNumber(1)
      let requestData = {
        page: 1,
        customer_id: userData.id,
        gender: ''
      };
      dispatch(getProFlirtsList(requestData));
    }
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

  const onLoadMore = () => {
    if (!isLoadMoreSpotlights)
      return;
    handleLoadMore();
  };

  return (
    <View style={styles.container}>
      {spotLightsLoading && spotLightsList.length == 0 ? (
        <AppIndicatorLoader />
      ) : (
        <FlatList
          data={spotLightsList}
          numColumns={2}
          contentContainerStyle={{ flexGrow: 1, padding: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View key={String(index)} style={{ flex: 0.5 }}>
              <ModeratorListItem
                isBoosted
                item={item}
                onPress={() =>
                  navigation.navigate('ModeratorProfile', { item: item, isFromChat: false })
                }
              />
            </View>
          )}
          ListEmptyComponent={<NoListData title={"No Spotlights Found!"} />}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={1}
          onEndReached={onLoadMore}
          ListFooterComponent={
            isLoadMoreSpotlights && spotLightsList.length > 0 ?
              <View
                style={{ alignSelf: 'center', paddingVertical: widthPercentageToDP(1.5), paddingHorizontal: wp(3.5), backgroundColor: Colors.ui_primary, borderRadius: wp(10), marginTop: wp(2) }}>
                <ActivityIndicator size={'small'} color={Colors.white} style={{ width: wp(4), height: wp(4), marginVertical: wp(2) }} />
              </View> : null
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
