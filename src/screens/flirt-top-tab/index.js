import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ModeratorListItem} from '../../components';
import {useNavigation} from '@react-navigation/native';

import styles from './style';
import {getFlirtsList} from '../../redux/actions/flirts-actions';
import {userProfileDetail} from '../../redux/actions/user-actions';

export default function FlirtTab(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {flirtsList} = useSelector((state) => state.flirtsState);
  const {userData} = useSelector((state) => state.userState);

  useEffect(() => {
    let requestData = {
      page: 1,
    };
    let userId = {
      id : userData.id
    }
    dispatch(getFlirtsList(requestData));
    dispatch(userProfileDetail(userId));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={flirtsList}
        numColumns={2}
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ModeratorListItem
            item={item}
            key={String(index)}
            onPress={() =>
              navigation.navigate('ModeratorProfile', {item: item})
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
