import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants';
import { AppButton, AppText } from '../../index';
import styles from './style';

import CloseIcon from '../../../assets/icons/close.svg';
import { deleteUserAccount } from '../../../redux/actions/user-actions';

export default function DeleteAccountModal({ visible, onHideModal }) {

    const dispatch = useDispatch();
    const { appLabels } = useSelector((state) => state.appState);

    const [loading, setLoading] = useState(false);

    const onDeletePress = async () => {
        setLoading(true);
        await dispatch(deleteUserAccount());
        setLoading(false);
        onHideModal();
    }

    return (
        <Modal
            isVisible={visible}
            backdropOpacity={0.5}
            animationInTiming={500}
            animationOutTiming={500}
            onBackdropPress={onHideModal}
            onBackButtonPress={onHideModal}
            style={styles.modalContainer}>
            <View style={styles.modalSubContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={onHideModal}>
                        <CloseIcon width={28} height={28} />
                    </TouchableOpacity>
                </View>
                <AppText
                    size={24}
                    type={'bold'}>{"Delete Account"}</AppText>

                <AppText
                    type={'regular'}
                    color={Colors.greydark}
                    style={{ marginVertical: 10 }}>
                    {"Are you sure you want to delete your account?"}
                </AppText>

                <AppButton
                    type={'primary'}
                    title={'Delete'}
                    style={{ marginTop: "20%", marginBottom: 10 }}
                    onPress={onDeletePress}
                    loading={loading}
                />

                <AppButton
                    type={'light'}
                    title={'Cancel'}
                    onPress={onHideModal}
                />
            </View>
        </Modal>
    );
}
