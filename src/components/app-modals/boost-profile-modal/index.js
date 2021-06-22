import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants';
import { AppButton, AppText, TextButton } from '../../index';
import styles from './style';

import CloseIcon from '../../../assets/icons/close.svg';
import { BoostIcon } from '../../../constants/svg-icons';
import { getGeneralSettingValueByName } from '../../../utils/common';
import { boostCustomerProfile } from '../../../redux/actions/user-actions';

export default function BoostProfileModal({ visible, onHideModal }) {

    const dispatch = useDispatch();

    const { appLabels } = useSelector((state) => state.appState);

    const [loading, setLoading] = useState(false);

    const onBoostProfile = async () => {
        setLoading(true);
        await dispatch(boostCustomerProfile());
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
                <AppText
                    size={24}
                    type={'bold'}
                    style={{ textAlign: 'center' }}>{"Boost Profile"}</AppText>
                <View style={{ alignItems: 'center', marginTop: 10, marginBottom: -30 }}>
                    <BoostIcon width={100} height={100} />
                </View>
                <AppText
                    type={'regular'}
                    size={18}
                    color={Colors.black}
                    style={{ marginVertical: 20, marginHorizontal: '10%', textAlign: 'center' }}>
                    {"Boost your profile for\n"}<AppText type={'bold'} size={18}>{`${getGeneralSettingValueByName('prices_boost')} Coins!`}</AppText>
                </AppText>

                <AppButton
                    type={'primary'}
                    title={'Boost'}
                    style={{ width: '90%', alignSelf: 'center', marginTop: "5%" }}
                    onPress={onBoostProfile}
                    loading={loading}
                />
            </View>
        </Modal>
    );
}
