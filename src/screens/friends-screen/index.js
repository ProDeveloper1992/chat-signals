import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppText, BackHeader, FriendListItem, NoListData } from '../../components';
import { ChatListItemLoader } from '../../components/app-list-items/chat-list-item';
import { Colors } from '../../constants';
import { FriendGradientIcon } from '../../constants/svg-icons';
import { getFriendsList } from '../../redux/actions/user-actions';

import styles from './style';

export default function FriendsScreen(props) {

    const dispatch = useDispatch();

    const { userData, friendsList } = useSelector((state) => state.userState);
    const { appLabels } = useSelector((state) => state.appState);

    const [loading, setLoading] = useState(true);

    let friends = friendsList.filter((friend, index) => (friend.is_status * 1) == 2 || (friend.is_status * 1) == 5);

    useEffect(() => {
        getCutomerFriendsList();
    }, []);

    const getCutomerFriendsList = async () => {
        setLoading(true);
        await dispatch(getFriendsList());
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <BackHeader title={'Friends'} color={Colors.ui_primary} />
            {loading && friends && friends.length == 0 ? (
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
                        <FriendListItem
                            key={String(index)}
                            item={item}
                            userName={item.username}
                            profileImage={{ uri: item.picture }} />
                    )}
                    keyExtractor={(item, index) => String(index)}
                    ListEmptyComponent={
                        <NoListData
                            icon={<FriendGradientIcon />}
                            title={appLabels.no_friends} />
                    }
                />
            )}
        </View>
    )
}