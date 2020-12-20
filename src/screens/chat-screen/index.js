import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Pusher from 'pusher-js/react-native';

import {GeneralHeader} from '../../components/Headers';
import {useNavigation} from '@react-navigation/native';
import {toggleLanguageModal} from '../../redux/actions/app-modals-actions';
import {useDispatch, useSelector} from 'react-redux';
import {Colors, Icons} from '../../constants';
import {AppText} from '../../components/app-text';
import styles from './style';
import {ChatListItem} from '../../components/app-list-items';
import { getUserChatList } from '../../redux/actions/user-actions';
import { NoListData } from '../../components';

const Chat = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {userChatList, loadingChatList}= useSelector((state)=>state.userState);

  useEffect(() => {
    Pusher.logToConsole = true;

    var pusher = new Pusher('2550b11480f5cba62c1e', {
      cluster: 'ap2',
    });

    pusher.connection.bind('connected', function () {
      // alert('pusher connected');
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('pusher:subscription_succeeded', () => {
      channel.bind('join', (data) => {
        alert(data);
        // this.handleJoin(data.name);
      });
      channel.bind('part', (data) => {
        alert(data);
        // this.handlePart(data.name);
      });
      channel.bind('message', (data) => {
        alert(data);
        // this.handleMessage(data.name, data.message);
      });
    });
    // channel.bind('my-event', function (data) {
    //   alert(JSON.stringify(data));
    // });

    //API call for get user's chat list
    dispatch(getUserChatList());
  }, []);

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          flexGrow: 1,
          height: 0.5,
          marginHorizontal: 12,
          backgroundColor: Colors.ui_primary_dark,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <GeneralHeader
        leftIcon={Icons.user_profile}
        onLeftPress={() => navigation.navigate('UserProfile')}
        LanguageIcon={Icons.icon_languages}
        onLanguagePress={() => dispatch(toggleLanguageModal(true))}
        label={'Chat'}
      />
      {loadingChatList?(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size={'large'} color={Colors.ui_primary}/>
        </View>
      ):(
        <FlatList
          data={userChatList}
          contentContainerStyle={{flexGrow:1,paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <ChatListItem
              onChatPress={() => navigation.navigate('ChatDetail', {item: item})}
              profileImage={Icons.user_profile}
              userName={item.user.username}
              lastMessage={item.lastMessage.body}
              lastMessageTime={item.lastMessage.created_at}
            />
          )}
          ItemSeparatorComponent={ItemSeparatorView}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<NoListData title={"No Chats Found!"}/>}
        />
      )}
      
    </View>
  );
};

export default Chat;
