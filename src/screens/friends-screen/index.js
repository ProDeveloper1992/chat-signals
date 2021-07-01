import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppText, AuthInput, BackHeader, FriendListItem, NoListData } from '../../components';
import { ChatListItemLoader } from '../../components/app-list-items/chat-list-item';
import { Colors } from '../../constants';
import { FriendGradientIcon, SearchIcon } from '../../constants/svg-icons';
import { getFriendsList } from '../../redux/actions/user-actions';
import { getFontFamily } from '../../utils/common';

import styles from './style';

export default function FriendsScreen(props) {

    const dispatch = useDispatch();

    const { userData, friendsList } = useSelector((state) => state.userState);
    const { appLabels } = useSelector((state) => state.appState);

    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    let friends = friendsList.filter((friend, index) => (friend.is_status * 1) == 2 || (friend.is_status * 1) == 5);

    const [customerFriends, setCustomerFriends] = useState(friends);
    let arrayholder = friends;

    useEffect(() => {
        getCutomerFriendsList();
    }, []);

    const getCutomerFriendsList = async () => {
        setLoading(true);
        await dispatch(getFriendsList());
        setLoading(false);
    }

    const searchFilterFunction = text => {
        setSearchText(text);
        const newData = arrayholder.filter(item => {
            const itemData = item.username.toLowerCase();

            const textData = text.toLowerCase();

            return itemData.indexOf(textData) > -1;
        });

        setCustomerFriends(newData);
    };

    return (
        <View style={styles.container}>
            <BackHeader title={appLabels.friends} color={Colors.ui_primary} />
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
                <View style={{ flex: 1 }}>
                    {friends.length > 0 && (
                        <View style={{ padding: 15 }}>
                            <AuthInput
                                value={searchText}
                                label={"Search for freinds"}
                                placeholder={"Search"}
                                style={{ color: Colors.black, fontFamily: getFontFamily('bold'), fontSize: 16 }}
                                icon={<SearchIcon />}
                                onChangeText={(text) => searchFilterFunction(text)} />
                        </View>
                    )}
                    <FlatList
                        data={customerFriends}
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
                </View>
            )}
        </View>
    )
}