import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';

import styles from './style';
import { AppButton, AppText } from '../..';
import { CloseIcon } from '../../../constants/svg-icons';
import { MoreGenderItem } from '../../../components';

export default function GallerySwiperModal({ visible, onHideModal }) {
    const dispatch = useDispatch();

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
                <AppText type={'bold'} size={24} style={{ alignSelf: 'center' }}>{"Select Gender"}</AppText>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <MoreGenderItem
                        gender={'Agender'}
                        isSelected={true} />
                    <MoreGenderItem
                        gender={'Androgyne'}
                        isSelected={false} />
                    <MoreGenderItem
                        gender={'Androgynous'}
                        isSelected={false} />
                    <MoreGenderItem
                        gender={'Bigender'}
                        isSelected={false} />
                    <MoreGenderItem
                        gender={'Femalt to Male'}
                        isSelected={false} />
                    <MoreGenderItem
                        gender={'FTM'}
                        isSelected={false} />
                    <MoreGenderItem
                        gender={'Gender Fluid'}
                        isSelected={false} />
                    <MoreGenderItem
                        gender={'Gender Nonconforming'}
                        isSelected={false} />
                </ScrollView>
                <View style={styles.bottomButton}>
                    <AppButton title={'Save'} />
                </View>
            </View>
        </Modal>
    );
}
