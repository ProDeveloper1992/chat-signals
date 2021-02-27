import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants';
import { AppButton, AppText, TextButton } from '../../index';
import styles from './style';

import CloseIcon from '../../../assets/icons/close.svg';
import { BoostIcon, CoinGradientIcon } from '../../../constants/svg-icons';

export default function CoinsEarningModal({ visible, onHideModal, onContinue }) {

    const { appLabels } = useSelector((state) => state.appState);

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
                    style={{ textAlign: 'center' }}>{"Congratulations!"}</AppText>
                <View style={{ alignItems: 'center', marginTop: 10, marginBottom: -30 }}>
                    <CoinGradientIcon width={100} height={100} />
                </View>
                <AppText
                    type={'regular'}
                    size={18}
                    color={Colors.black}
                    style={{ marginVertical: 20, marginHorizontal: '10%', textAlign: 'center' }}>
                    {"You earned "}<AppText type={'bold'} size={18}>{"75 Coins!"}</AppText>
                </AppText>

                <AppButton
                    type={'primary'}
                    title={'Close'}
                    style={{ width: '70%', alignSelf: 'center', marginTop: "5%" }}
                    onPress={onHideModal}
                />
            </View>
        </Modal>
    );
}
