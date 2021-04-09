import React from 'react';
import { View, ImageBackground } from 'react-native';
import { UserPhotoItemMenu } from '../..';
import styles from './style'

export default function UserPhotoItem({ item }) {

    const onSelectOption = (option) => {

    }

    return (
        <View
            style={styles.container}>
            <ImageBackground
                source={{ uri: item.picture }}
                style={{ height: '100%', width: '100%', borderRadius: 5 }}
                imageStyle={{ borderRadius: 4 }}
            >
                <View style={{ alignSelf: 'flex-end', padding: 14 }}>
                    <UserPhotoItemMenu onSelectOption={onSelectOption} />
                </View>
            </ImageBackground>
        </View>
    )
}