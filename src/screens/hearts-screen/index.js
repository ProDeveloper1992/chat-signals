import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppText, BackHeader, LikesListItem, NoListData } from '../../components';
import { ChatListItemLoader } from '../../components/app-list-items/chat-list-item';
import { Colors } from '../../constants';
import { HeartGradientIcon32 } from '../../constants/svg-icons';
import { getHeartsList } from '../../redux/actions/user-actions';

import styles from './style';

export default function HeartsScreen(props) {

    const dispatch = useDispatch();

    const { userData, friendsList, customerHeartsList } = useSelector((state) => state.userState);
    const { appLabels } = useSelector((state) => state.appState);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCustomersHearts();
    }, [])

    const getCustomersHearts = async () => {
        setLoading(true);
        await dispatch(getHeartsList());
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <BackHeader title={appLabels.heart} color={Colors.ui_primary} />
            {loading && customerHeartsList && customerHeartsList.length == 0 ? (
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
                    data={customerHeartsList}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <LikesListItem
                            key={String(index)}
                            type={'heart'}
                            item={item} />
                    )}
                    keyExtractor={(item, index) => String(index)}
                    ListEmptyComponent={
                        <NoListData
                            icon={<HeartGradientIcon32 width={100} height={100} />}
                            title={"No Hearts Found!"} />
                    }
                />
            )}
        </View>
    )
}