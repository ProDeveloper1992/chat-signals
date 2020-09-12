import React from 'react'
import { View, Text, Button } from 'react-native';
import Modal from 'react-native-modal';
import { CountryPicker, GradientButton } from '../../index'
import styles from './style'

export default function LanguageSelectionModal({ visible, onHideModal }) {
    return (
        <Modal isVisible={visible}
            backdropOpacity={0.4}
            animationInTiming={500}
            animationOutTiming={500}
            onBackdropPress={onHideModal}
            onBackButtonPress={onHideModal}
            style={styles.modalContainer}>
            <View style={styles.modalSubContainer}>
                <Text style={styles.modalTitle}>{'Select your language'}</Text>
                <CountryPicker />
                <GradientButton title={'Set Language'} style={{ marginTop: 10, }} />
            </View>
        </Modal>
    )
}