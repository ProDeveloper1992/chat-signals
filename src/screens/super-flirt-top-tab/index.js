import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ModeratorListItem} from '../../components';
import {useNavigation} from '@react-navigation/native';

import styles from './style';
import { Colors } from '../../constants';
import { getFlirtsList } from '../../redux/actions/flirts-actions';

export default function SuperFlirtTab(props) {
  const dispatch = useDispatch();

  const {flirtsList, flirtsLoading} = useSelector((state) => state.flirtsState);

  useEffect(() => {
    let requestData = {
      page: 1,
    };
    dispatch(getFlirtsList(requestData));
  }, []);

  const navigation = useNavigation();

  if(flirtsLoading){
    return  (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'} color={Colors.ui_primary}/>
      </View>
    )
  }

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
