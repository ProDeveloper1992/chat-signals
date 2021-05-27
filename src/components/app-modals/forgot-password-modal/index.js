import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, mailformat } from '../../../constants';
import { AppButton, AppText, AuthInput } from '../../index';
import styles from './style';

import { forgotPassword } from '../../../redux/actions/user-actions';
import { EmailIcon, CloseIcon } from '../../../constants/svg-icons';

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
                    size={24}
                    type={'bold'}>{appLabels.forgot_password_title}</AppText>
                <AppText
                    type={'regular'}
                    color={Colors.greydark}
                    style={{ marginVertical: 10 }}>
                    {appLabels.forgot_password_description}
                </AppText>
                <AuthInput
                    placeholder={appLabels.email}
                    keyboardType={'email-address'}
                    value={email}
                    onChangeText={SetEmail}
                    label={appLabels.email}
                    placeholder={appLabels.email}
                    error={emailError}
                    icon={<EmailIcon width={24} height={24} />}
                />
                <AppButton
                    type={'primary'}
                    title={appLabels.request_new_password}
                    style={{ marginTop: "20%" }}
                    onPress={() => onForgotPasswordClick()}
                    loading={loading}
                />
                <AppText
                    style={{ textAlign: 'center', marginTop: 25 }}
                    size={16}
                    onPress={onHideModal}
                    type={'bold'}>{appLabels.back_to_login}</AppText>
            </View>
        </Modal>
    );
}
