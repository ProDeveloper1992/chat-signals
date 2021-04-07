import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';

import { Colors } from '../../../constants';
import { BlockIcon, DeleteBinIcon } from '../../../constants/svg-icons';
import { AppText, CommonImage } from '../../index';
import styles from './style';

export default function ModeratorChatDetailModal({ visible, onHideModal, moderator, onViewProfile }) {

    const onViewProfilePress = () => {
        onHideModal();
        setTimeout(() => {
            onViewProfile();
        }, 400);
    }

    return (
        <Modal
            isVisible={visible}
            backdropOpacity={0.4}
            // animationInTiming={600}
            // animationOutTiming={600}
            onBackdropPress={onHideModal}
            onBackButtonPress={onHideModal}
            style={styles.modalContainer}>
            <View style={styles.modalSubContainer}>
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <CommonImage size={90} borderColor={Colors.white} />
                    <AppText
                        type={'bold'}
                        size={20}
                        style={{ marginBottom: -5, marginTop: 10 }}>{moderator.user.username}</AppText>
                    <AppText
                        onPress={onViewProfilePress}
                        type={'bold'}
                        size={16}
                        color={Colors.ui_primary}
                        style={{ textDecorationLine: 'underline' }}>{"View profile"}</AppText>
                </View>
                <TitleWithIcon
                    title={"Delete Conversation"}
                    icon={<DeleteBinIcon />} />
                <TitleWithIcon
                    title={"Block User"}
                    icon={<BlockIcon />} />
            </View>
        </Modal>
    );
}

const TitleWithIcon = ({ title, icon }) => {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: Colors.grey }}>
            <AppText numderOfLines={1} type={'medium'} size={16} style={{ flex: 1 }}>{title}</AppText>
            {icon && (
                <View>
                    {icon}
                </View>
            )}
        </View>
    )
}