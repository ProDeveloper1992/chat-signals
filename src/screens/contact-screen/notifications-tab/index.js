import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { NoListData, NotificationItem } from '../../../components';
import styles from './style';

export default function NotificationsTab(props) {

    const { appLabels } = useSelector((state) => state.appState);

    const notifications = [
        { username: "Jenifer", image_url: 'https://i.pinimg.com/originals/25/a6/41/25a641e2075eca74e84a6f1dc720a518.jpg', type: 'like' },
        { username: "Cristine", image_url: 'https://papers.co/wallpaper/papers.co-hq89-miranda-kerr-girl-model-face-34-iphone6-plus-wallpaper.jpg', type: 'kiss' },
        { username: "Dolores", image_url: 'https://www.face-agency.co.uk/images/uploads/models/large/1548678753-21.jpg', type: 'heart' },
        { username: "Jenifer", image_url: 'https://i.pinimg.com/originals/25/a6/41/25a641e2075eca74e84a6f1dc720a518.jpg', type: 'sticker' },
    ]

    return (
        <View style={styles.container}>
            {/* <NoListData title={'No notifications found!'} /> */}
            <FlatList
                data={notifications}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <NotificationItem
                        key={String(index)}
                        userName={item.username}
                        profileImage={{ uri: item.image_url }}
                        type={item.type}
                    />
                )}
                ListEmptyComponent={<NoListData title={'No notifications found!'} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}
