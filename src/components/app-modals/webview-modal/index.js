import React from 'react';
import { View, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';

import { Colors } from '../../../constants';
import { CloseWhiteTransparentIcon } from '../../../constants/svg-icons';
import { showToast } from '../../../redux/actions/app-actions';
import { wait } from '../../../utils/common';
import { AppText } from '../../index';
import styles from './style';

export default function WebViewModal({ visible, paymentUrl, onHideModal }) {

    const dispatch = useDispatch();

    const LoadingIndicatorView = () => {
        return <ActivityIndicator color={Colors.black} size='large' />
    }

    const onWebViewStateChange = (navEvent) => {
        if (navEvent.url) {
            if (navEvent.url.includes('error')) {
                wait(1000).then(() => {
                    onHideModal();
                    wait(800).then(() => {
                        dispatch(showToast('negative', "Payment failed!! Please try again."))
                    })
                });
            }
        }
    }

    return (
        <Modal
            isVisible={visible}
            backdropOpacity={0.4}
            animationInTiming={600}
            animationOutTiming={600}
            onBackdropPress={onHideModal}
            onBackButtonPress={onHideModal}
            style={styles.modalContainer}>
            <SafeAreaView style={styles.modalSubContainer}>
                <View style={styles.header}>
                    <AppText type={"bold"}>{"Make a payment"}</AppText>
                    <TouchableOpacity
                        onPress={onHideModal}
                        style={styles.closeIcon}>
                        <CloseWhiteTransparentIcon width={30} height={30} fill={Colors.black} />
                    </TouchableOpacity>
                </View>
                <WebView
                    style={{ height: "100%" }}
                    source={{ uri: paymentUrl }}
                    renderLoading={LoadingIndicatorView}
                    onNavigationStateChange={onWebViewStateChange}
                    startInLoadingState={true} />
            </SafeAreaView>
        </Modal>
    );
}
