import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppIndicatorLoader, ModeratorListItem } from '../../components';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import { getFlirtsList } from '../../redux/actions/flirts-actions';
import { userProfileDetail } from '../../redux/actions/user-actions';
import { Colors, Icons } from '../../constants';

export default function FlirtTab(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const { flirtsList, flirtsLoading } = useSelector((state) => state.flirtsState);
  const { userData } = useSelector((state) => state.userState);

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    let requestData = {
      page: pageNumber,
      customer_id: userData.id,
      gender: ''
    };
    dispatch(getFlirtsList(requestData));
    dispatch(userProfileDetail());
  }, []);

  const onReachedToEnd = () => {
    let requestData = {
      page: pageNumber + 1,
      customer_id: userData.id,
      gender: ''
    };
    dispatch(getFlirtsList(requestData));
    setPageNumber(pageNumber + 1);
  }

  return (
    <View style={styles.container}>
      {flirtsLoading ? (
        <AppIndicatorLoader />
      ) : (
        <FlatList
          data={flirtsList}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          // ListHeaderComponent={render_FlatList_header}
          renderItem={({ item, index }) => (
            <ModeratorListItem
              item={item}
              key={String(index)}
              onPress={() =>
                navigation.navigate('ModeratorProfile', { item: item })
              }
            />
          )}
          // onEndReached={() => onReachedToEnd()}
          // onEndReachedThreshold={1}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}
