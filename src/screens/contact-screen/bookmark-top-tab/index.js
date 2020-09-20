import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { ModeratorListItem, NoListData } from '../../../components';
import styles from './style'

export default function BookmarkTopTab(props) {
    const { bookmarksList } = useSelector((state) => state.bookmarkState)

    return (
        <View style={styles.container}>
            {/* <NoListData title={'No bookmars found!'} /> */}
            <FlatList
                data={bookmarksList}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <ModeratorListItem key={String(index)} item={item} bookmarked onPress={() => { }} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );

}
