import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { FriendRequestItem, NoListData } from '../../../components';
import styles from './style';

export default function FriendRequests(props) {

  const { appLabels } = useSelector((state) => state.appState);
  const { userData, friendsList } = useSelector((state) => state.userState);

  let friends = friendsList.filter((friend, index) => (friend.is_status * 1) == 4 || (friend.is_status * 1) == 1)

  return (
    <View style={styles.container}>
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
        ListEmptyComponent={<NoListData title={"No friend requests found!"} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
