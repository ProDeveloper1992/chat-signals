import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants';
import { AppButton, AppText, TextButton } from '../../index';
import styles from './style';

import CloseIcon from '../../../assets/icons/close.svg';
import { BoostIcon } from '../../../constants/svg-icons';

export default function SpotlightModal({ visible, onHideModal, onContinue }) {

    const dispatch = useDispatch();
    const { appLabels } = useSelector((state) => state.appState);

    const [loading, setLoading] = useState(false);

    const onContinuePress = () => {
        onContinue();
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
                    size={24}
                    type={'bold'}
                    style={{ textAlign: 'center' }}>{"Spotlight!"}</AppText>
                <View style={{ alignItems: 'center', marginTop: 10, marginBottom: -30 }}>
                    <BoostIcon width={100} height={100} />
                </View>
                <AppText
                    type={'regular'}
                    size={18}
                    color={Colors.black}
                    style={{ marginVertical: 10, marginHorizontal: '10%', textAlign: 'center' }}>
                    {`${appLabels.boost_your_profile_and_get_into_spotlight_list_for}`}<AppText type={'bold'} size={18}>{`500 ${appLabels.Coins}`}</AppText>
                </AppText>

                <AppButton
                    type={'primary'}
                    title={'Continue'}
                    style={{ width: '70%', alignSelf: 'center', marginTop: "5%" }}
                    onPress={onContinuePress}
                    loading={loading}
                />

                <TextButton
                    title={appLabels.no_thanks}
                    fontType={'bold'}
                    fontSize={16}
                    titleColor={Colors.black}
                    onPress={onHideModal}
                    style={{ alignSelf: 'center' }} />
            </View>
        </Modal>
    );
}
