import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';

import { AppIndicatorLoader, UserPhotoItemMenu } from '../..';
import { Colors } from '../../../constants';
import { customerPhotoUpdate, deleteCustomerPhoto } from '../../../redux/actions/user-actions';
import styles from './style'

export default function UserPhotoItem({ item }) {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const onSelectOption = async (option) => {
        switch (option.type) {
            case 'delete':
                setLoading(true);
                await dispatch(deleteCustomerPhoto(item.id));
                setLoading(false);
                break;
            case 'set_profile':
                setLoading(true);
                await dispatch(customerPhotoUpdate(item.id, '1'));
                setLoading(false);
                navigation.goBack();
                break;

            default:
                break;
        }
    }

    return (
        <View style={styles.container} pointerEvents={loading ? 'none' : 'auto'}>
            <FastImage
                style={{ height: '100%', width: '100%', borderRadius: 5 }}
                source={{
                    uri: item.picture,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
            >
                {loading ? (
                    <AppIndicatorLoader />
                ) : (
                    <View style={{ alignSelf: 'flex-end', padding: 14 }}>
                        <View style={{ backgroundColor: Colors.black_30, borderRadius: 12 }}>
                            <UserPhotoItemMenu onSelectOption={onSelectOption} />
                        </View>
                    </View>
                )}
            </FastImage>
        </View>
    )
}