import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText, BackHeader, HeartsListItem, NoListData } from '../../components';
import { Colors } from '../../constants';

import styles from './style';

export default function HeartsScreen(props) {

    const { userData, friendsList } = useSelector((state) => state.userState);

    return (
        <View style={styles.container}>
            <BackHeader title={'Hearts'} color={Colors.ui_primary} />
            <FlatList
                data={[]}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <HeartsListItem
                        key={String(index)}
                        item={item}
                        userName={item.username}
                        profileImage={{ uri: item.picture }} />
                )}
                keyExtractor={(item, index) => String(index)}
                ListEmptyComponent={<NoListData title={"No Hearts Found!"} />}
            />
        </View>
    )
}