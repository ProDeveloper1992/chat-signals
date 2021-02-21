import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants';
import { AppButton, AppText, AuthInput, TagItem } from '../../index';
import styles from './style';

import CloseIcon from '../../../assets/icons/close.svg';
import { SearchIcon } from '../../../constants/svg-icons';
import { setUserPassions } from '../../../redux/actions/user-actions';
import { toggleAddPassionsModal } from '../../../redux/actions/app-modals-actions';

export default function AddPassionsModal({ visible, onHideModal }) {

    const dispatch = useDispatch();
    const { appLabels } = useSelector((state) => state.appState);
    const { userPassions, passions } = useSelector((state) => state.userState);

    const [loading, setLoading] = useState(false);

    var USER_PASSIONS = userPassions;

    const onTagItemPress = (isSelected, tag) => {
        if (isSelected) {
            USER_PASSIONS.push(tag);
        } else {
            const updatedPassions = USER_PASSIONS.filter(item => item.title != tag.title);
            USER_PASSIONS = updatedPassions;
        }
    };

    const onSavePassions = () => {
        dispatch(setUserPassions(USER_PASSIONS));
        dispatch(toggleAddPassionsModal(false));
    }

    const isTagSelected = (item) => {
        for (let tag of userPassions) {
            if (tag.title == item.title) {
                return true;
            }
        }
        return false;
    }

    const onCloseModal = () => {
        onHideModal();
    }

    return (
        <Modal
            isVisible={visible}
            backdropOpacity={0.5}
            animationInTiming={500}
            animationOutTiming={500}
            onBackdropPress={onCloseModal}
            onBackButtonPress={onCloseModal}
            style={styles.modalContainer}>
            <View style={styles.modalSubContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={onCloseModal}>
                        <CloseIcon width={28} height={28} />
                    </TouchableOpacity>
                </View>
                <AppText
                    size={24}
                    type={'bold'}
                    style={{ marginBottom: "1%" }}>{"Add Passions"}</AppText>

                <AuthInput
                    label={'Search for passions'}
                    icon={<SearchIcon width={24} height={24} />}
                    placeholder={"Search"}
                />
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
                    {passions.map((item, index) => {
                        return <TagItem
                            key={String(index)}
                            title={item.title}
                            selected={isTagSelected(item)}
                            onPress={(isSelected) => onTagItemPress(isSelected, item)}
                        />
                    })}
                </View>
                <AppButton
                    type={'primary'}
                    title={'Save'}
                    onPress={onSavePassions}
                    loading={loading}
                />
            </View>
        </Modal>
    );
}