import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppText, BackHeader, KissesListItem, NoListData } from '../../components';
import { ChatListItemLoader } from '../../components/app-list-items/chat-list-item';
import { Colors } from '../../constants';
import { KissGradientIcon } from '../../constants/svg-icons';
import { getKissesList } from '../../redux/actions/user-actions';

import styles from './style';

export default function KissesScreen(props) {

    const dispatch = useDispatch();
    const { userData, friendsList, customerKissesList } = useSelector((state) => state.userState);
    const { appLabels } = useSelector((state) => state.appState);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCustomersKisses();
    }, [])

    const getCustomersKisses = async () => {
        setLoading(true);
        await dispatch(getKissesList());
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <BackHeader title={appLabels.kisses} color={Colors.ui_primary} />
            {loading && customerKissesList && customerKissesList.length == 0 ? (
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
                    data={customerKissesList}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <KissesListItem
                            key={String(index)}
                            item={item}
                            userName={item.username}
                            profileImage={{ uri: item.picture }} />
                    )}
                    keyExtractor={(item, index) => String(index)}
                    ListEmptyComponent={
                        <NoListData
                            icon={<KissGradientIcon />}
                            title={"No Kisses Found!"} />
                    }
                />
            )}
        </View>
    )
}