import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Pusher from 'pusher-js/react-native';

import { GeneralHeader } from '../../components/Headers';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { toggleLanguageModal } from '../../redux/actions/app-modals-actions';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, DEFAULT_AVATAR_URL, Icons, Images } from '../../constants';
import { AppText } from '../../components/app-text';
import styles from './style';
import { ChatListItem } from '../../components/app-list-items';
import { getUserChatList } from '../../redux/actions/chat-actions';
import { NoListData } from '../../components';
import pusherConfig from '../../../pusher.json';
import { ChatListItemLoader } from '../../components/app-list-items/chat-list-item';
import { ChatGradientIcon } from '../../constants/svg-icons';

const Chat = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { authToken } = useSelector((state) => state.userState);
  const { appLabels } = useSelector((state) => state.appState);
  const { userChatList, loadingChatList } = useSelector((state) => state.chatState);

  useEffect(() => {

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

      // Pusher.logToConsole = true;

      // var pusher = new Pusher('2550b11480f5cba62c1e', {
      //   auth: '2550b11480f5cba62c1e:c0dc8839313f5ec5a8ddade35c5ce5b77e046b288c548aa391c1a192f9afced7',
      //   cluster: 'ap2',
      //   encrypted: true
      // });

      // var pusher = new Pusher(pusherConfig.key, pusherConfig);

      // pusher.connection.bind('connected', function (data) {
      //   console.log('pusher connected');
      //   console.log('pusher data', data);
      //   // pusher.allChannels().forEach(channel => console.log("channel.name", channel.name));
      //   // const channel = pusher.subscribe('private-chatify');
      //   // console.log("channel", channel)
      // });

    }
  }, [isFocused]);

  const onChatListItemPress = (customer) => {
    navigation.navigate('ChatDetail', { item: customer });
  }

  const getProfileImage = (imageUrl) => {
    if (imageUrl) {
      return imageUrl;
    } else {
      return DEFAULT_AVATAR_URL;
    }
  }

  return (
    <View style={styles.container}>
      <GeneralHeader
        label={appLabels.messages}
      />
      {loadingChatList && userChatList && userChatList.length == 0 ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7]}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ChatListItemLoader
              key={String(index)}
            />
          )}
          keyExtractor={(item, index) => String(index)}
        />
      ) : (
        <FlatList
          data={userChatList}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ChatListItem
              key={String(index)}
              item={item}
              onChatPress={() => onChatListItemPress(item)}
              profileImage={{ uri: getProfileImage(item.profile_picture) }}
              userName={item.user.username}
              lastMessageTime={item.lastMessage ? item.lastMessage.created_at : Date.now()}
              isActive={item.user.is_active * 1 == 1}
            />
          )}
          keyExtractor={(item, index) => String(index)}
          ListEmptyComponent={<NoListData
            icon={<ChatGradientIcon />}
            title={appLabels.no_chats_found} />}
        />
      )}
    </View>
  );
};

export default Chat;
