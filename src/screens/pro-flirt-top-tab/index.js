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
import { ModeratorListItem } from '../../components';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import { Colors, Icons } from '../../constants';
import { getFlirtsList } from '../../redux/actions/flirts-actions';

export default function ProFlirtTab(props) {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const { flirtsList, flirtsLoading } = useSelector((state) => state.flirtsState);

  useEffect(() => {
    let requestData = {
      page: 1,
    };
    dispatch(getFlirtsList(requestData));
  }, []);

  const navigation = useNavigation();

  if (flirtsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={Colors.ui_primary} />
      </View>
    );
  }

  const render_FlatList_header = () => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 15,
          marginBottom: 5,
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flex: 0.85,
            backgroundColor: Colors.white,
            marginEnd: 10,
            borderRadius: 4,
            shadowColor: Colors.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
          }}>
          <TextInput
            style={{ paddingStart: 10, paddingVertical: Platform.OS === 'ios' ? 12 : 10 }}
            placeholder="Search..."
            value={search}
            onChangeText={() => { }}
          />
        </View>
        <TouchableOpacity
          style={{
            flex: 0.15,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.ui_primary,
            borderRadius: 4,
            shadowColor: Colors.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
          }}
          onPress={() => { }}
          activeOpacity={0.5}>
          <Image
            source={Icons.search}
            style={{
              height: 24,
              width: 24,
              tintColor: Colors.white,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={flirtsList}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={render_FlatList_header}
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
    </View>
  );
}