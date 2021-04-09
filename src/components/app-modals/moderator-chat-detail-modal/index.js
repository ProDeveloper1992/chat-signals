import React, { useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';

import { Colors } from '../../../constants';
import { BlockIcon, DeleteBinIcon } from '../../../constants/svg-icons';
import { deleteConversation } from '../../../redux/actions/chat-actions';
import { blockModerator } from '../../../redux/actions/flirts-actions';
import { AppText, CommonImage } from '../../index';
import styles from './style';

export default function ModeratorChatDetailModal({ visible, onHideModal, moderator, onViewProfile }) {

    const dispatch = useDispatch();

    const [isDeletingConversation, setIsDeletingConversation] = useState(false);
    const [isBlockingUser, setIsBlockingUser] = useState(false);

    const onViewProfilePress = () => {
        onHideModal();
        setTimeout(() => {
            onViewProfile();
        }, 400);
    }

    const onDeleteConversation = async () => {
        setIsDeletingConversation(true);
        await dispatch(deleteConversation(moderator.user.id));
        setIsDeletingConversation(false);
        onHideModal();
    }

    const onBlockUser = async () => {
        setIsBlockingUser(true);
        await dispatch(blockModerator(moderator.user.id));
        setIsBlockingUser(false);
    }

    return (
        <Modal
            isVisible={visible}
            backdropOpacity={0.4}
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            // animationInTiming={600}
            // animationOutTiming={600}
            // backdropTransitionInTiming={800}
            // backdropTransitionOutTiming={800}
            onBackdropPress={onHideModal}
            onBackButtonPress={onHideModal}
            style={styles.modalContainer}>
            <View style={styles.modalSubContainer}>
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <CommonImage touchable={false} size={90} borderColor={Colors.white} source={{ uri: moderator.profile_picture }} />
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
                    icon={<DeleteBinIcon />}
                    onPress={onDeleteConversation}
                    loading={isDeletingConversation} />
                <TitleWithIcon
                    title={"Block User"}
                    icon={<BlockIcon />}
                    onPress={onBlockUser}
                    loading={isBlockingUser} />
            </View>
        </Modal>
    );
}

const TitleWithIcon = ({ title, icon, onPress, loading }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.6}
            style={styles.titleWithIconContainer}>
            <AppText
                numderOfLines={1}
                type={'medium'}
                size={16}
                style={{ flex: 1 }}>{title}</AppText>
            {icon && (
                <View>
                    {loading ? (
                        <ActivityIndicator size={'small'} color={Colors.ui_primary} style={{ width: 14, height: 14 }} />
                    ) : (
                        <View>
                            {icon}
                        </View>
                    )}

                </View>
            )}
        </TouchableOpacity>
    )
}