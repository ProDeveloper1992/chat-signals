import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';

import styles from './style';
import { AppButton, AppText } from '../..';
import { CloseIcon } from '../../../constants/svg-icons';
import { MoreGenderItem } from '../../../components';
import { setSexualOrientation } from '../../../redux/actions/user-actions';

export default function SexualOrientationModal({ visible, onHideModal }) {
    const dispatch = useDispatch();

    const { sexualOrientations } = useSelector((state) => state.userState);

    const [selectedSexualOrientation, setSelectedSexualOrientation] = useState(sexualOrientations[0]);

    const onGenderItemPress = (item) => {
        setSelectedSexualOrientation(item);
    }

    const onSavePress = () => {
        dispatch(setSexualOrientation(selectedSexualOrientation));
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
                <AppText type={'bold'} size={24} style={{ alignSelf: 'center', marginBottom: 20 }}>{"Sexual orientation"}</AppText>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {sexualOrientations.map((item, index) => {
                        return <MoreGenderItem
                            key={String(index)}
                            gender={item.title}
                            onPress={() => onGenderItemPress(item)}
                            isSelected={selectedSexualOrientation == item} />
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
