import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { UserPhotoItemMenu } from '../..';
import styles from './style'

export default function UserPhotoItem({ item }) {

    const onSelectOption = (option) => {

    }

    return (
        <View
            style={styles.container}>
            <FastImage
                style={{ height: '100%', width: '100%', borderRadius: 5 }}
                source={{
                    uri: item.picture,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
            >
                <View style={{ alignSelf: 'flex-end', padding: 14 }}>
                    <UserPhotoItemMenu onSelectOption={onSelectOption} />
                </View>
            </FastImage>
        </View>
    )
}