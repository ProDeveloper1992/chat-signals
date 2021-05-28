import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';

import { AppIndicatorLoader, UserPhotoItemMenu } from '../..';
import { Colors } from '../../../constants';
import { toggleGallerySwiperModal } from '../../../redux/actions/app-modals-actions';
import { customerPhotoUpdate } from '../../../redux/actions/user-actions';
import styles from './style'

export default function UserPhotoItem({ item }) {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const onSelectOption = async (option) => {
        switch (option.type) {
            case 'set_profile':
                setLoading(true);
                await dispatch(customerPhotoUpdate(item.id, '1'));
                setLoading(false);
                navigation.goBack();
                break;

            case 'erotic':
                setLoading(true);
                await dispatch(customerPhotoUpdate(item.id, '2'));
                setLoading(false);
                break;

            case 'private':
                setLoading(true);
                await dispatch(customerPhotoUpdate(item.id, '3'));
                setLoading(false);
                break;

            case 'delete':
                setLoading(true);
                await dispatch(customerPhotoUpdate(item.id, '4'));
                setLoading(false);
                break;

            default:
                break;
        }
    }

    return (
        <View style={styles.container} pointerEvents={loading ? 'none' : 'auto'}>
            <TouchableOpacity onPress={() => dispatch(toggleGallerySwiperModal(true, [{ uri: item.picture }]))}>
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
            </TouchableOpacity>
        </View>
    )
}