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

  useEffect(() => {
    let requestData = {
      page: 1,
    };
    let userId = {
      id: userData.id,
    };
    dispatch(getFlirtsList(requestData));
    // dispatch(userProfileDetail(userId));
  }, []);

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
            keyExtractor={(item, index) => index.toString()}
          />
        )}
    </View>
  );
}
