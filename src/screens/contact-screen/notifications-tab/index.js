import React, { useEffect, useState } from 'react';
import { View, FlatList, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import { NoListData, NotificationItem } from '../../../components';
import { getNotificationsList } from '../../../redux/actions/user-actions';
import { ChatListItemLoader } from '../../../components/app-list-items/chat-list-item';
import styles from './style';
import { Colors, Icons } from '../../../constants';


export default function NotificationsTab(props) {

    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    const { appLabels } = useSelector((state) => state.appState);
    const { customerNotifications } = useSelector((state) => state.userState);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (isFocused) {
            getNotifications();
        }
    }, [isFocused]);

    const getNotifications = async () => {
        setLoading(true);
        await dispatch(getNotificationsList());
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            {loading && customerNotifications && customerNotifications.length == 0 ? (
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
                    data={customerNotifications}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <NotificationItem
                            key={String(index)}
                            item={item}
                        />
                    )}
                    ListEmptyComponent={
                        <NoListData
                            title={appLabels.no_notifications_found}
                            icon={<LinearGradient
                                colors={[Colors.ui_counter_badge_gradient_1, Colors.ui_counter_badge_gradient_2]}
                                style={styles.iconContainer}>
                                <Image source={Icons.notification} style={styles.icon} />
                            </LinearGradient>} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </View>
    );
}
