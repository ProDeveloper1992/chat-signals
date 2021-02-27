import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants';
import { AppButton, AppDropDown, AppText, AuthInput, GenderMenu } from '../../index';
import styles from './style';

import CloseIcon from '../../../assets/icons/close.svg';
import { toggleLanguageModal, toggleSexualOrientationModal } from '../../../redux/actions/app-modals-actions';

export default function FlirtFilterModal({ visible, onHideModal }) {

    const dispatch = useDispatch();
    const { appLabels, selectedLanguage } = useSelector((state) => state.appState);
    const { userSexualOrientation } = useSelector((state) => state.userState);

    const [loading, setLoading] = useState(false);

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
                    style={{ marginBottom: 20 }}>{"Filter Flirt suggestions"}</AppText>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}>
                    <GenderMenu
                        onSelectGender={(genderItem) => { }} />
                    <AuthInput
                        label={"City"}
                        placeholder={"City"}
                        style={{ paddingHorizontal: 5, fontWeight: 'bold', fontSize: 16 }} />
                    <FilterItem
                        title={'Languages'}
                        value={selectedLanguage}
                        onPress={() => dispatch(toggleLanguageModal(true))} />
                    <FilterItem
                        title={'Passions'}
                        value={'Choose'} />
                    <AppDropDown
                        title={"Sexual orientation"}
                        value={userSexualOrientation.title}
                        onPress={() => dispatch(toggleSexualOrientationModal(true))} />
                </ScrollView>
                <View style={{ backgroundColor: Colors.white }}>
                    <AppButton
                        type={'primary'}
                        title={'Save'}
                        style={{ marginVertical: 10 }}
                        onPress={() => { }}
                        loading={loading}
                    />

                    <AppButton
                        type={'light'}
                        title={'Reset Filters'}
                        onPress={onHideModal}
                    />
                </View>
            </View>
        </Modal>
    );
}

const FilterItem = ({ title, value, onPress }) => {
    return (
        <View style={{ marginVertical: 5 }}>
            {title && (
                <AppText color={Colors.black} style={{ paddingBottom: 5, paddingTop: 5 }}>{title}</AppText>
            )}
            <TouchableOpacity
                onPress={onPress}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: Colors.grey
                }}
            >
                <AppText type={'bold'} size={16} >{value}</AppText>
            </TouchableOpacity>
        </View>
    )
}