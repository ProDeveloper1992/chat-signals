import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppIndicatorLoader, AppText, BackHeader, LikesListItem, NoListData } from '../../components';
import { ChatListItemLoader } from '../../components/app-list-items/chat-list-item';
import { Colors } from '../../constants';
import { LikeGradientIcon } from '../../constants/svg-icons';
import { getLikesList } from '../../redux/actions/user-actions';

import styles from './style';

export default function LikesScreen(props) {

    const dispatch = useDispatch();
    const { userData, friendsList, customerLikesList } = useSelector((state) => state.userState);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCustomersLikes();
    }, [])

    const getCustomersLikes = async () => {
        setLoading(true);
        await dispatch(getLikesList());
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <BackHeader title={'Likes'} color={Colors.ui_primary} />
            {loading && customerLikesList && customerLikesList.length == 0 ? (
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
                    data={customerLikesList}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <LikesListItem
                            key={String(index)}
                            item={item}
                            userName={item.username}
                            profileImage={{ uri: item.picture }} />
                    )}
                    keyExtractor={(item, index) => String(index)}
                    ListEmptyComponent={
                        <NoListData
                            icon={<LikeGradientIcon />}
                            title={"No Likes Found!"} />
                    }
                />
            )}

        </View>
    )
}