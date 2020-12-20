import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ModeratorListItem} from '../../components';
import {useNavigation} from '@react-navigation/native';

import styles from './style';
import {getFlirtsList} from '../../redux/actions/flirts-actions';
import {userProfileDetail} from '../../redux/actions/user-actions';
import {Colors, Icons} from '../../constants';

export default function FlirtTab(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const [search, setSearch] = useState('');
  const {flirtsList, flirtsLoading} = useSelector((state) => state.flirtsState);
  const {userData} = useSelector((state) => state.userState);

  useEffect(() => {
    let requestData = {
      page: 1,
    };
    let userId = {
      id: userData.id,
    };
    dispatch(getFlirtsList(requestData));
    dispatch(userProfileDetail(userId));
  }, []);

  if(flirtsLoading){
    return  (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'} color={Colors.ui_primary}/>
      </View>
    )
  }

  const render_FlatList_header = () => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 15,
          marginBottom: 5,
          marginHorizontal:10,
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
            elevation:4
          }}>
          <TextInput
            style={{paddingStart: 10}}
            placeholder="Search..."
            value={search}
            onChangeText={()=>{}}
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
            elevation:4
          }}
          onPress={() => {}}
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
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={render_FlatList_header}
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
