import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackHeader, LikesListItem, NoListData } from '../../components';
import { ChatListItemLoader } from '../../components/app-list-items/chat-list-item';
import { Colors } from '../../constants';
import { StickerGradientIcon } from '../../constants/svg-icons';
import { getCustomerStickersList } from '../../redux/actions/user-actions';

import styles from './style';

export default function StickersScreen(props) {

    const dispatch = useDispatch();
    const { customerStickersList } = useSelector((state) => state.userState);
    const { appLabels } = useSelector((state) => state.appState);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // getCustomersStickers();
    }, [])

    const getCustomersStickers = async () => {
        setLoading(true);
        await dispatch(getCustomerStickersList());
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <BackHeader title={appLabels.likes} color={Colors.ui_primary} />
            {loading && customerStickersList.length == 0 ? (
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
                    data={customerStickersList}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <LikesListItem
                            key={String(index)}
                            type={'sticker'}
                            item={item} />
                    )}
                    keyExtractor={(item, index) => String(index)}
                    ListEmptyComponent={
                        <NoListData
                            icon={<StickerGradientIcon />}
                            title={"No Stickers Found!"} />
                    }
                />
            )}

        </View>
    )
}