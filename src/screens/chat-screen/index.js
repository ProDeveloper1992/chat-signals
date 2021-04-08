import React, { useEffect } from 'react';
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

import { GeneralHeader } from '../../components/Headers';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { toggleLanguageModal } from '../../redux/actions/app-modals-actions';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, Icons, Images } from '../../constants';
import { AppText } from '../../components/app-text';
import styles from './style';
import { ChatListItem } from '../../components/app-list-items';
import { getChatConversation, getUserChatList } from '../../redux/actions/user-actions';
import { NoListData } from '../../components';
import pusherConfig from '../../../pusher.json';

const Chat = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { userChatList, loadingChatList, authToken } = useSelector((state) => state.userState);
  const { appLabels } = useSelector((state) => state.appState);

  useEffect(() => {
    // Pusher.logToConsole = true;

    // var pusher = new Pusher('2550b11480f5cba62c1e', {
    //   authEndpoint: 'http://url.com/api/authtest',
    //   auth: {
    //     headers: {
    //       'Accept': 'application/json',
    //       'Authorization': 'Bearer ' + authToken
    //     }
    //   },
    //   cluster: 'ap2',
    //   encrypted: true
    // });

    // var pusher = new Pusher(pusherConfig.key, pusherConfig);

    // pusher.connection.bind('connected', function () {
    // alert('pusher connected');
    // });

    // var channel = pusher.subscribe('private-chatify');
    // channel.bind('pusher:subscription_error', function (err) {
    //   console.log("subscription_error", err)
    // });
    // channel.bind('pusher:subscription_succeeded', () => {
    //   channel.bind('join', (data) => {
    //     alert(data);
    //     // this.handleJoin(data.name);
    //   });
    //   channel.bind('part', (data) => {
    //     alert(data);
    //     // this.handlePart(data.name);
    //   });
    //   channel.bind('message', (data) => {
    //     alert(data);
    //     // this.handleMessage(data.name, data.message);
    //   });
    // });

    // channel.bind('my-event', function (data) {
    //   alert(JSON.stringify(data));
    // });

    //API call for get user's chat list

    if (isFocused) {
      dispatch(getUserChatList());
    }
  }, [isFocused]);

  const onChatListItemPress = (customer) => {
    navigation.navigate('ChatDetail', { item: customer });
  }

  return (
    <View style={styles.container}>
      <GeneralHeader
        leftIcon={Icons.user_profile}
        onLeftPress={() => navigation.navigate('UserProfile')}
        LanguageIcon={Icons.icon_languages}
        onLanguagePress={() => dispatch(toggleLanguageModal(true))}
        label={'Messages'}
      />
      {loadingChatList && userChatList.length == 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={Colors.ui_primary} />
        </View>
      ) : (
        <FlatList
          data={userChatList}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ChatListItem
              key={String(index)}
              onChatPress={() => onChatListItemPress(item)}
              profileImage={{ uri: item.profile_picture }}
              userName={item.user.username}
              lastMessage={item.lastMessage.body}
              lastMessageTime={item.lastMessage.created_at}
              isActive={item.user.is_active * 1 == 1}
            />
          )}
          keyExtractor={(item, index) => String(index)}
          ListEmptyComponent={<NoListData title={"No chats found!"} />}
        />
      )}
    </View>
  );
};

export default Chat;
