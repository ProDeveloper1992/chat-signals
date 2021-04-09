import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText, BackHeader, KissesListItem, NoListData } from '../../components';
import { Colors } from '../../constants';

import styles from './style';

export default function KissesScreen(props) {

    const { userData, friendsList } = useSelector((state) => state.userState);

    return (
        <View style={styles.container}>
            <BackHeader title={'Kisses'} color={Colors.ui_primary} />
            <FlatList
                data={[]}
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
                ListEmptyComponent={<NoListData title={"No Kisses Found!"} />}
            />
        </View>
    )
}