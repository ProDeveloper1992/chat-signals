import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { Colors } from '../../../constants';
import { AppButton, AppText } from '../../index';
import styles from './style';

import GoogleIcon from '../../../assets/icons/google.svg';
import FacebookIcon from '../../../assets/icons/facebook.svg';
import CloseIcon from '../../../assets/icons/close.svg';
import { loginWithFacebook, loginWithGoogle } from '../../../services/social-login-service';

export default function RegisterLandingModal({ visible, onHideModal }) {

    const navigation = useNavigation();
    const { appLabels } = useSelector((state) => state.appState);


    const onRegisterWithEmail = async () => {
        await onHideModal();
        setTimeout(() => {
            navigation.navigate('RegisterWithEmail');
        }, 800);
    }

    const onRegisterWithGoogle = async () => {
        await loginWithGoogle();
        onHideModal();
    }

    const onRegisterWithFacebook = async () => {
        await loginWithFacebook();
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
                    size={20}
                    type={'bold'}
                    style={{ textAlign: 'center', marginBottom: '10%' }}>{"Create an account"}</AppText>
                <AppButton
                    type={'primary'}
                    title={appLabels.register_with_email}
                    onPress={onRegisterWithEmail}
                />
                <AppText
                    color={Colors.greydark}
                    style={{ alignSelf: 'center', marginVertical: 15 }}>
                    {'Or'}
                </AppText>
                <AppButton
                    type={'facebook'}
                    title={appLabels.register_with_facebook}
                    icon={<FacebookIcon width={24} height={24} />}
                    onPress={onRegisterWithFacebook}
                />
                <AppButton
                    type={'google'}
                    title={appLabels.register_with_google}
                    icon={<GoogleIcon width={24} height={24} />}
                    style={{ marginVertical: 10 }}
                    onPress={onRegisterWithGoogle}
                />
            </View>
        </Modal>
    );
}
