import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { FriendRequestItem, NoListData } from '../../../components';
import styles from './style';

export default function FriendRequests(props) {

  const { appLabels } = useSelector((state) => state.appState);

  const friendRequests = [
    { username: "Jenifer", image_url: 'https://i.pinimg.com/originals/25/a6/41/25a641e2075eca74e84a6f1dc720a518.jpg' },
    { username: "Cristine", image_url: 'https://papers.co/wallpaper/papers.co-hq89-miranda-kerr-girl-model-face-34-iphone6-plus-wallpaper.jpg' },
    { username: "Dolores", image_url: 'https://www.face-agency.co.uk/images/uploads/models/large/1548678753-21.jpg' },
    { username: "Jenifer", image_url: 'https://i.pinimg.com/originals/25/a6/41/25a641e2075eca74e84a6f1dc720a518.jpg' },
  ]

  return (
    <View style={styles.container}>
      <FlatList
        data={friendRequests}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <FriendRequestItem
            key={String(index)}
            userName={item.username}
            profileImage={{ uri: item.image_url }}
          />
        )}
        ListEmptyComponent={<NoListData title={appLabels.no_bookmarks} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
