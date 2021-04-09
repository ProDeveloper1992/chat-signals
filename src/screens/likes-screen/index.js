import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText, BackHeader, LikesListItem, NoListData } from '../../components';
import { Colors } from '../../constants';

import styles from './style';

export default function LikesScreen(props) {

    const { userData, friendsList } = useSelector((state) => state.userState);

    return (
        <View style={styles.container}>
            <BackHeader title={'Likes'} color={Colors.ui_primary} />
            <FlatList
                data={[]}
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
                ListEmptyComponent={<NoListData title={"No Likes Found!"} />}
            />
        </View>
    )
}