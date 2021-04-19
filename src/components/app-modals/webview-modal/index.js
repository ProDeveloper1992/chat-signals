import React from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';

import { Colors } from '../../../constants';
import { CloseWhiteTransparentIcon } from '../../../constants/svg-icons';
import { AppText } from '../../index';
import styles from './style';

export default function WebViewModal({ visible, paymentUrl, onHideModal }) {

    const LoadingIndicatorView = () => {
        return <ActivityIndicator color={Colors.black} size='large' />
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
            <View style={styles.modalSubContainer}>
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
                    startInLoadingState={true} />
            </View>
        </Modal>
    );
}
