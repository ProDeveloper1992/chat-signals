import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppIndicatorLoader, FriendRequestItem, NoListData } from '../../../components';
import { ChatListItemLoader } from '../../../components/app-list-items/chat-list-item';
import { FriendGradientIcon } from '../../../constants/svg-icons';
import { getFriendsList } from '../../../redux/actions/user-actions';
import styles from './style';

export default function FriendRequests(props) {

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const { appLabels } = useSelector((state) => state.appState);
  const { userData, friendsList } = useSelector((state) => state.userState);

  const [loading, setLoading] = useState(true);

  let friends = friendsList.filter((friend, index) => (friend.is_status * 1) == 4 || (friend.is_status * 1) == 1);

  useEffect(() => {
    if (isFocused) {
      getFriendRequestsList();
    }
  }, [isFocused]);

  const getFriendRequestsList = async () => {
    setLoading(true);
    await dispatch(getFriendsList());
    setLoading(false);
  }


  return (
    <View style={styles.container}>
      {loading && friends.length == 0 ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ChatListItemLoader key={String(index)} />
          )}
          keyExtractor={(item, index) => String(index)}
        />
      ) : (
        <FlatList
          data={friends}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <FriendRequestItem
              key={String(index)}
              item={item}
              userName={item.username}
              profileImage={{ uri: item.picture }}
            />
          )}
          ListEmptyComponent={
            <NoListData
              icon={<FriendGradientIcon />}
              title={"No friend requests found!"} />
          }
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}
