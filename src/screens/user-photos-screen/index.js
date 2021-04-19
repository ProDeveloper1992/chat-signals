import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText, BackHeader, NoListData, UserPhotoItem } from '../../components';
import { Colors } from '../../constants';
import styles from './style';

export default function UserPhotos(props) {

    const navigation = useNavigation();

    const { userData, friendsList } = useSelector((state) => state.userState);
    const { appLabels } = useSelector((state) => state.appState);

    const onBackPress = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <BackHeader
                title={"Photos"}
                onBackPress={onBackPress}
                color={Colors.ui_primary}
            />
            <FlatList
                contentContainerStyle={{ flexGrow: 1, padding: 10 }}
                data={userData && userData.profilepictures && userData.profilepictures.length > 0 ? userData.profilepictures : []}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View key={String(index)} style={{ flex: index == userData.profilepictures.length - 1 && index % 2 == 0 ? 0.5 : 1 }}>
                        <UserPhotoItem item={item} />
                    </View>
                )}
                keyExtractor={(item, index) => String(index)}
                ListEmptyComponent={<NoListData title={"No photos found!"} />}
            />
        </View>
    )
}