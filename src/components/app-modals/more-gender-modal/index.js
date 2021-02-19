import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';

import styles from './style';
import { AppButton, AppText } from '../..';
import { CloseIcon } from '../../../constants/svg-icons';
import { MoreGenderItem } from '../../../components';
import { setSelectedGender } from '../../../redux/actions/user-actions';

export default function MoreGenderModal({ visible, onHideModal }) {
    const dispatch = useDispatch();

    const { otherGenders } = useSelector((state) => state.userState);

    const [selectedGender, setGenderItem] = useState(otherGenders[0]);

    const onGenderItemPress = (item) => {
        setGenderItem(item);
    }

    const onSavePress = () => {
        dispatch(setSelectedGender(selectedGender));
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
                <AppText type={'bold'} size={24} style={{ alignSelf: 'center' }}>{"Select Gender"}</AppText>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}>
                    {otherGenders.map((item, index) => {
                        return <MoreGenderItem
                            key={String(index)}
                            gender={item.gender}
                            onPress={() => onGenderItemPress(item)}
                            isSelected={selectedGender == item} />
                    })}
                </ScrollView>
                <View style={styles.bottomButton}>
                    <AppButton
                        title={'Save'}
                        onPress={onSavePress} />
                </View>
            </View>
        </Modal>
    );
}
