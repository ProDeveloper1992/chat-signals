import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, mailformat } from '../../../constants';
import { AppButton, AppText, AuthInput } from '../../index';
import styles from './style';

import GoogleIcon from '../../../assets/icons/google.svg';
import FacebookIcon from '../../../assets/icons/facebook.svg';
import CloseIcon from '../../../assets/icons/close.svg';
import { loginWithFacebook, loginWithGoogle } from '../../../services/social-login-service';
import { forgotPassword } from '../../../redux/actions/user-actions';

export default function ForgotPasswordModal({ visible, onHideModal }) {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { appLabels } = useSelector((state) => state.appState);


    const [email, SetEmail] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [loading, setLoading] = useState(false);


    const onForgotPasswordClick = async () => {
        let isValid = true;
        if (email.trim() == 0) {
            isValid = false;
            setEmailError(appLabels.email_error_1);
        } else if (!email.match(mailformat)) {
            isValid = false;
            setEmailError(appLabels.email_error_2);
        } else {
            setEmailError(null);
        }

        if (isValid) {
            try {
                //   setLoading(true);
                //   await register(email, password);
                let requestData = {
                    language: 'en',
                    email: email,
                };
                setLoading(true);
                const response = await dispatch(forgotPassword(requestData));
                setLoading(false);
                if (response.meta.status) {
                    onHideModal();
                }
            } catch (e) {
                setLoading(false);
            }
        }
    };

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
                    style={{ textAlign: 'center', marginBottom: '10%' }}>{"Enter your email"}</AppText>
                <AuthInput
                    placeholder={'Email'}
                    keyboardType={'email-address'}
                    value={email}
                    onChangeText={SetEmail}
                    label={appLabels.email}
                    placeholder={appLabels.email}
                    error={emailError}
                />
                <AppButton
                    type={'primary'}
                    title={'Request New Password'}
                    style={{ marginTop: 20 }}
                    onPress={() => onForgotPasswordClick()}
                    loading={loading}
                />
            </View>
        </Modal>
    );
}
