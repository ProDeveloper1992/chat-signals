import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText, BackHeader, FriendListItem, NoListData } from '../../components';
import { Colors } from '../../constants';

import styles from './style';

export default function FriendsScreen(props) {

    const { userData, friendsList } = useSelector((state) => state.userState);


    let friends = friendsList.filter((friend, index) => (friend.is_status * 1) == 2 || (friend.is_status * 1) == 5)

    return (
        <View style={styles.container}>
            <BackHeader title={'Friends'} color={Colors.ui_primary} />
            <FlatList
                data={friends}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <FriendListItem
                        key={String(index)}
                        item={item}
                        userName={item.username}
                        profileImage={{ uri: item.picture }} />
                )}
                keyExtractor={(item, index) => String(index)}
                ListEmptyComponent={<NoListData title={"No Friends Found!"} />}
            />
        </View>
    )
}