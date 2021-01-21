import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';

import { Colors } from '../../../constants';
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
                <WebView
                    style={{ height: "100%" }}
                    source={{ uri: paymentUrl }}
                    renderLoading={LoadingIndicatorView}
                    startInLoadingState={true} />
            </View>
        </Modal>
    );
}
