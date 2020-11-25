import React, {useEffect} from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  View,
  Image,
  FlatList,
} from 'react-native';
import {Colors, Icons} from '../../../constants';
import {AppText} from '../../index';

export default function ChatListItem() {
  const [chatData, setChatData] = React.useState([
    {
      key: 1,
      userName: 'u1',
      profileImage: 'https://picsum.photos/200',
      lastMessage: 'i am good',
      lastMessageTime: '17.58',
    },
    {
      key: 2,
      userName: 'User2',
      profileImage: 'https://picsum.photos/300',
      lastMessage: 'hi',
      lastMessageTime: '07.58',
    },
    {
      key: 3,
      userName: 'u3',
      profileImage: 'https://picsum.photos/450',
      lastMessage: 'finding nemo',
      lastMessageTime: '22.21',
    },
  ]);

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          flexGrow:1,
          height: 0.5,
          marginHorizontal:12,
          backgroundColor: Colors.ui_primary_dark,
        }}
      />
    );
  };

  return (
    <FlatList
      data={chatData}
      contentContainerStyle={{paddingBottom: 20}}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#ffffff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            paddingVertical: 10,
          }}
          onPress={() => {}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 8,
                alignSelf: 'center',
                resizeMode: 'cover',
              }}
              source={{uri: item.profileImage}}
            />
            <View
              style={{
                alignSelf: 'center',
                marginLeft: 15,
              }}>
              <AppText
                type={'bold'}
                size={14}
                color={Colors.black}
                style={{textTransform: 'uppercase'}}>
                {item.userName}
              </AppText>
              <AppText
                type={'normal'}
                size={12}
                color={Colors.black}
                style={{
                  marginTop: 5,
                }}>
                {item.lastMessage}
              </AppText>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <AppText size={10}>{item.lastMessageTime}</AppText>
            <Image
              style={{
                height: 12,
                width: 13,
                resizeMode: 'cover',
                marginTop: 10,
                alignSelf: 'flex-end',
              }}
              source={Icons.right_arrow}
            />
          </View>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={ItemSeparatorView}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
