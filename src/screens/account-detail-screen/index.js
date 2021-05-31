import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
} from 'accordion-collapse-react-native';

import { AppButton, AppText, BackHeader, TagItem } from '../../components';
import { Colors, SCREEN_WIDTH } from '../../constants';
import { ArrowDownIcon, ArrowRightIcon, EditPenCircleIcon } from '../../constants/svg-icons';
import styles from './style';
import moment from 'moment';
import { getFontFamily } from '../../utils/common';
import { editAccountInfo } from '../../redux/actions/user-actions';

export default function AccountDetail(props) {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { userData } = useSelector((state) => state.userState);
    const { appLabels, genderList, passionList, sexualOrientations } = useSelector((state) => state.appState);

    console.log("userData", userData)

    const getGenderById = (genderId) => {
        for (let gender of genderList) {
            if (gender.id == genderId) {
                return gender;
            }
        }
        return null;
    }

    const getSexualOrientationById = (orientationId) => {
        for (let orientation of sexualOrientations) {
            if (orientation.id == orientationId) {
                return orientation;
            }
        }
        return null;
    }

    let first_name = userData && userData.first_name ? userData.first_name : '';
    let last_name = userData && userData.last_name ? userData.last_name : '';
    let dob = userData && userData.dob ? userData.dob : null;
    let user_gender = userData && userData.Gender ? getGenderById(userData.Gender) : '';
    let sexual_orientation = userData && userData.sexual_orientation ? getSexualOrientationById(userData.sexual_orientation) : '';

    const [firstName, setFirstName] = useState(first_name);
    const [lastName, setLastName] = useState(last_name);
    const [birthDate, setBirthDate] = useState(dob);
    const [gender, setGender] = useState(user_gender);
    const [isEdited, setIsEdited] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedPassions, setSelectedPassions] = useState([]);
    const [selectedOrientation, setSelectedOrientation] = useState(sexual_orientation);
    const [isSaving, setIsSaving] = useState(false);

    var USER_PASSIONS = selectedPassions;

    //Callapse Items
    const [isGenderCollapsed, setGenderCollapsed] = useState(false);
    const [isPassionCollapsed, setPassionCollapsed] = useState(false);
    const [isOrientationCollapsed, setOrientationCollapsed] = useState(false);


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let formatedDate = moment(date).format('YYYY-MM-DD');
        setBirthDate(formatedDate);
        hideDatePicker();
        setIsEdited(true);
    };

    const onBackPress = () => {
        navigation.goBack();
    }

    //Passion Tags
    const isTagSelected = (item) => {
        for (let tag of selectedPassions) {
            if (tag.id == item.id) {
                return true;
            }
        }
        return false;
    }

    const onTagItemPress = (isSelected, passion) => {
        if (isSelected) {
            USER_PASSIONS.push(passion);
        } else {
            const updatedPassions = USER_PASSIONS.filter(item => item.id != passion.id);
            USER_PASSIONS = updatedPassions;
        }
        console.log("USER_PASSIONS", USER_PASSIONS)
        setSelectedPassions(USER_PASSIONS);
        setIsEdited(true);
    }

    //Sexual Orientations
    const onSelectOrientation = (orientation) => {
        setSelectedOrientation(orientation);
        setIsEdited(true);
    }

    //Genders
    const onSelectGender = (genderItem) => {
        setGender(genderItem);
        setIsEdited(true);
    }

    //First Name
    const onChangeFirstName = (text) => {
        setFirstName(text);
        setIsEdited(true);
    }

    //Last Name
    const onChangeLastName = (text) => {
        setLastName(text);
        setIsEdited(true);
    }

    //Save Account Information
    const onSaveInformation = async () => {
        let requestData = {
            first_name: firstName,
            last_name: lastName,
            dob: userData.dob,
            Gender: userData.Gender,
            description: '',
            sexual_orientation: userData.sexual_orientation,
            'passions[]': userData.passions,
            profile_id: userData.id
        }
        setIsSaving(true);
        await dispatch(editAccountInfo(requestData));
        setIsSaving(false);
    }

    return (
        <View style={styles.container}>
            <BackHeader
                title={appLabels.account_info}
                onBackPress={onBackPress}
                color={Colors.ui_primary}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {userData && (
                    <View>
                        {/* Username */}
                        {userData.username && (
                            <AccountDetailItem
                                label={appLabels.user_name}
                                title={userData.username}
                                rightContent={<View />}
                                onPress={() => { }}
                            />
                        )}

                        {/* First Name */}
                        {/* {userData.first_name && ( */}
                        <AccountDetailInputItem
                            label={appLabels.firstname}
                            value={firstName}
                            onChangeText={onChangeFirstName}
                        />
                        {/* )} */}

                        {/* Last Name */}
                        {/* {userData.last_name && ( */}
                        <AccountDetailInputItem
                            label={appLabels.lastname}
                            value={lastName}
                            onChangeText={onChangeLastName}
                        />
                        {/* )} */}

                        {/* Email */}
                        {userData.email && (
                            <AccountDetailItem
                                label={appLabels.email}
                                title={userData.email}
                                rightContent={<AppText type={'bold'} color={Colors.greydark}>{"Verified"}</AppText>}
                                onPress={() => { }}
                            />
                        )}

                        {/* Birth Date */}
                        {/* {birthDate && ( */}
                        <AccountDetailItem
                            label={appLabels.birthday}
                            title={birthDate}
                            rightContent={<View />}
                            onPress={showDatePicker}
                        />
                        {/* )} */}

                        {/* Gender */}
                        {/* {userData.Gender && getGenderById(userData.Gender) != null && ( */}
                        <Collapse
                            onToggle={(isColl) => {
                                console.log("isColl", isColl)
                                setGenderCollapsed(isColl)
                            }}
                            isCollapsed={isGenderCollapsed}>
                            <CollapseHeader>
                                <CollapseHeaderComponent
                                    label={appLabels.gender}
                                    title={gender ? gender.name : ""}
                                    isCollapsed={isGenderCollapsed}
                                />
                            </CollapseHeader>
                            <CollapseBody>
                                <View style={styles.collapseBodyContainer(isGenderCollapsed)}>
                                    {genderList.map((genderItem, genderIndex) => {
                                        return <TouchableOpacity
                                            key={String(genderIndex)}
                                            onPress={() => onSelectGender(genderItem)}
                                            style={{ borderBottomWidth: 0.5, borderColor: Colors.grey, marginBottom: 5, padding: 10 }}>
                                            <AppText
                                                type={'medium'}
                                                size={16}
                                                color={genderItem.id == gender.id ? Colors.ui_primary : Colors.black}
                                            >{genderItem.name}</AppText>
                                        </TouchableOpacity>
                                    })}
                                </View>
                            </CollapseBody>
                        </Collapse>
                        {/* )} */}

                        {/* Passions */}
                        {userData.passions && (
                            <Collapse
                                onToggle={(isColl) => {
                                    console.log("isColl", isColl)
                                    setPassionCollapsed(isColl)
                                }}
                                isCollapsed={isPassionCollapsed}>
                                <CollapseHeader>
                                    <CollapseHeaderComponent
                                        label={appLabels.passions}
                                        title={userData.passions}
                                        isCollapsed={isPassionCollapsed}
                                    />
                                </CollapseHeader>
                                <CollapseBody>
                                    <View style={styles.collapseBodyContainer(isPassionCollapsed)}>
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
                                    </View>
                                </CollapseBody>
                            </Collapse>
                        )}

                        {/* Sexual Orientations */}
                        {/* {userData.sexual_orientation && ( */}
                        <Collapse
                            onToggle={(isColl) => {
                                setOrientationCollapsed(isColl)
                            }}
                            isCollapsed={isOrientationCollapsed}>
                            <CollapseHeader>
                                <CollapseHeaderComponent
                                    label={appLabels.sexual_orientation}
                                    title={selectedOrientation ? selectedOrientation.name : ""}
                                    isCollapsed={isOrientationCollapsed}
                                />
                            </CollapseHeader>
                            <CollapseBody>
                                <View style={styles.collapseBodyContainer(isPassionCollapsed)}>
                                    {sexualOrientations.map((orientation, orientationIndex) => {
                                        return <TouchableOpacity
                                            key={String(orientationIndex)}
                                            onPress={() => onSelectOrientation(orientation)}
                                            style={{ borderBottomWidth: 0.5, borderColor: Colors.grey, marginBottom: 5, padding: 10 }}>
                                            <AppText
                                                type={'medium'}
                                                size={16}
                                                color={selectedOrientation && orientation.id == selectedOrientation.id ? Colors.ui_primary : Colors.black}
                                            >{orientation.name}</AppText>
                                        </TouchableOpacity>
                                    })}
                                </View>
                            </CollapseBody>
                        </Collapse>
                        {/* )} */}
                    </View>
                )}
            </ScrollView>
            {isEdited && (
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <AppButton
                        type={'light'}
                        style={{ flex: 1 }}
                        title={appLabels.cancel}
                        onPress={() => navigation.goBack()} />
                    <AppButton
                        style={{ flex: 1, marginStart: 10 }}
                        title={appLabels.save}
                        onPress={onSaveInformation}
                        loading={isSaving} />
                </View>
            )}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date()}
            />
        </View>
    )
}

const AccountDetailItem = ({ label, title, onPress, rightContent, disabled }) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.accountDetailItemContainer}>
            <View>
                <AppText type={'regular'} size={14} color={Colors.black}>{label}</AppText>
                <AppText type={'bold'} size={16} color={Colors.black}>{title}</AppText>
            </View>
            {rightContent}
        </TouchableOpacity>
    )
}

const AccountDetailInputItem = ({ label, value, onChangeText }) => {
    return (
        <View
            style={styles.accountDetailItemContainer}>
            <View>
                <AppText type={'regular'} size={14} color={Colors.black}>{label}</AppText>
                <TextInput
                    placeholder={label}
                    value={value}
                    onChangeText={onChangeText}
                    style={{ width: SCREEN_WIDTH - 30, fontFamily: getFontFamily('bold'), color: Colors.black, fontSize: 18 }} />
            </View>
        </View>
    )
}

const CollapseHeaderComponent = ({ label, title, isCollapsed }) => {
    return (
        <View
            style={[styles.accountDetailItemContainer, { borderBottomWidth: isCollapsed ? 0 : 1 }]}>
            <View>
                <AppText type={'regular'} size={14} color={Colors.black}>{label}</AppText>
                <AppText type={'bold'} size={16} color={Colors.black}>{title}</AppText>
            </View>
            {isCollapsed ? <ArrowDownIcon width={18} height={18} /> : <ArrowRightIcon width={18} height={18} />}
        </View>
    )
}