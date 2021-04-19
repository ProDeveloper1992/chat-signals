import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import { Colors } from '../../../constants';
import { AppButton, AppText } from '../../index';
import styles from './style';

export default function AppAlertModal({
    visible,
    onHideModal,
    title,
    message,
    button1Title,
    button2Title,
    isButton1Loading,
    onButton1Press }) {

    return (
        <Modal
            isVisible={visible}
            backdropOpacity={0.4}
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            onBackdropPress={onHideModal}
            onBackButtonPress={onHideModal}
            style={styles.modalContainer}>
            <View style={styles.modalSubContainer}>
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 32 }}>
                    <AppText type={'bold'} size={18}>{title}</AppText>
                    <AppText type={'regular'} size={14} style={{ marginTop: 10 }}>{message}</AppText>
                    <View style={{ marginTop: '15%' }}>
                        <AppButton
                            title={button1Title}
                            onPress={onButton1Press}
                            loading={isButton1Loading} />
                        <AppButton
                            type={'light'}
                            title={button2Title}
                            style={{ marginTop: 15 }}
                            onPress={onHideModal} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}