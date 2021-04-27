import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants';
import { AppButton, AppDropDown, AppRangeSlider, AppText, AuthInput, GenderMenu, LanguageSelectionMenu, SexualOrientationMenu, TagItem } from '../../index';
import styles from './style';

import CloseIcon from '../../../assets/icons/close.svg';
import { toggleLanguageModal, toggleSexualOrientationModal } from '../../../redux/actions/app-modals-actions';
import { getFlirtsList } from '../../../redux/actions/flirts-actions';

export default function FlirtFilterModal({ visible, onHideModal }) {

    const dispatch = useDispatch();
    const { appLabels, passionList, selectedLanguage } = useSelector((state) => state.appState);
    const { userData, userSexualOrientation, selectedUserGender } = useSelector((state) => state.userState);

    const [loading, setLoading] = useState(false);
    const [isResetLoading, setResetLoading] = useState(false);

    const [lookingFor, setLookingFor] = useState(null);
    const [lowAge, setLowAge] = useState(0);
    const [highAge, setHighAge] = useState(100);
    const [city, setCity] = useState('');
    const [language, setLanguage] = useState(selectedLanguage);
    const [maxDistance, setMaxDistance] = useState(0);
    const [selectedPassions, setSelectedPassions] = useState([]);
    const [sexualOrientation, setSexualOrientation] = useState(null);

    var USER_PASSIONS = selectedPassions;

    const onChangeAgeRange = (low, high) => {
        setLowAge(low);
        setHighAge(high);
    }

    const onChangeMaxDistance = (value) => {
        setMaxDistance(value);
    }

    const onTagItemPress = (isSelected, passion) => {
        if (isSelected) {
            USER_PASSIONS.push(passion);
        } else {
            const updatedPassions = USER_PASSIONS.filter(item => item.id != passion.id);
            USER_PASSIONS = updatedPassions;
        }
        console.log("USER_PASSIONS", USER_PASSIONS)
        setSelectedPassions(USER_PASSIONS)
    }

    const isTagSelected = (item) => {
        for (let tag of selectedPassions) {
            if (tag.id == item.id) {
                return true;
            }
        }
        return false;
    }

    const onSavePress = async () => {
        let requestData = {
            page: 1,
            customer_id: userData.id,
            gender: lookingFor ? lookingFor.id : '',
            age_from: lowAge,
            age_to: highAge,
            city: city,
            language: language,
            passions: '',
            sexual_orientation: sexualOrientation ? sexualOrientation.id : ''
        }
        console.log("requestData", requestData);
        setLoading(true);
        await dispatch(getFlirtsList(requestData));
        setLoading(false);
        onHideModal();
    }

    const onResetFilterPress = async () => {
        setLookingFor(selectedUserGender);
        setLowAge(0);
        setHighAge(100);
        setCity('');
        setLanguage(selectedLanguage);
        setMaxDistance(0);
        setSelectedPassions([]);
        setSexualOrientation(userSexualOrientation);

        let requestData = {
            page: 1,
            customer_id: userData.id,
            gender: '',
        }
        setResetLoading(true);
        await dispatch(getFlirtsList(requestData));
        setResetLoading(false);
        onHideModal();
    }

    return (
        <Modal
            isVisible={visible}
            backdropOpacity={0.5}
            animationInTiming={600}
            animationOutTiming={600}
            onBackdropPress={onHideModal}
            onBackButtonPress={onHideModal}
            style={styles.modalContainer}>
            <View style={styles.modalSubContainer}>
                <View style={styles.closeIconContainer}>
                    <TouchableOpacity onPress={onHideModal}>
                        <CloseIcon width={28} height={28} />
                    </TouchableOpacity>
                </View>
                <AppText
                    size={24}
                    type={'bold'}
                    style={{ marginBottom: 20, paddingHorizontal: 20 }}>{"Filter Flirt suggestions"}</AppText>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: "50%" }}>
                    <GenderMenu
                        label={appLabels.i_am_looking_for}
                        onSelectGender={(genderItem) => setLookingFor(genderItem)} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <AppText style={{ flex: 1 }}>{"Age Range"}</AppText>
                        <AppText>{`${lowAge}-${highAge}`}</AppText>
                    </View>
                    <AppRangeSlider
                        onChangeValue={onChangeAgeRange} />
                    <AuthInput
                        label={"City"}
                        placeholder={"City"}
                        onChangeText={(text) => setCity(text)}
                        style={{ paddingHorizontal: 5, fontWeight: 'bold', fontSize: 16 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                        <AppText style={{ flex: 1 }}>{"Max. distance"}</AppText>
                        <AppText>{`${maxDistance}km`}</AppText>
                    </View>
                    <AppRangeSlider
                        disableRange
                        onChangeValue={onChangeMaxDistance} />
                    <LanguageSelectionMenu
                        onSelectOption={(language) => setLanguage(language.language_code)} />
                    <AppText style={{ marginTop: 10, marginBottom: 5 }}>{"Passions"}</AppText>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {passionList.map((passion, passionIndex) => {
                            return <TagItem
                                key={String(passionIndex)}
                                title={passion.name}
                                selected={isTagSelected(passion)}
                                onPress={(isSelected) => onTagItemPress(isSelected, passion)}
                            />
                        })}
                    </View>
                    <SexualOrientationMenu
                        onSelectOrientation={(orientation) => setSexualOrientation(orientation)} />
                </ScrollView>
                <View style={{ backgroundColor: Colors.white, paddingHorizontal: 20, paddingBottom: 10 }}>
                    <AppButton
                        type={'primary'}
                        title={'Save'}
                        style={{ marginVertical: 10 }}
                        onPress={onSavePress}
                        loading={loading}
                    />

                    <AppButton
                        type={'light'}
                        title={'Reset Filters'}
                        onPress={onResetFilterPress}
                        loading={isResetLoading}
                    />
                </View>
            </View>
        </Modal >
    );
}