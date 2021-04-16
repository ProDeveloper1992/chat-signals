import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
} from 'accordion-collapse-react-native';

import { AppButton, AppText, BackHeader, TagItem } from '../../components';
import { Colors } from '../../constants';
import { ArrowDownIcon, ArrowRightIcon, EditPenCircleIcon } from '../../constants/svg-icons';
import styles from './style';
import moment from 'moment';

export default function AccountDetail(props) {

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

    let dob = userData && userData.dob ? userData.dob : null;
    let user_gender = userData && userData.Gender ? getGenderById(userData.Gender) : null;
    let sexual_orientation = userData && userData.sexual_orientation ? getSexualOrientationById(userData.sexual_orientation) : null;

    const [birhDate, setBirthDate] = useState(dob);
    const [gender, setGender] = useState(user_gender);
    const [isEdited, setIsEdited] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedPassions, setSelectedPassions] = useState([]);
    const [selectedOrientation, setSelectedOrientation] = useState(sexual_orientation);

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

    return (
        <View style={styles.container}>
            <BackHeader
                title={"Account Information"}
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

                        {/* Email */}
                        {userData.email && (
                            <AccountDetailItem
                                label={"Email"}
                                title={userData.email}
                                rightContent={<AppText type={'bold'} color={Colors.greydark}>{"Verified"}</AppText>}
                                onPress={() => { }}
                            />
                        )}

                        {/* Birth Date */}
                        {birhDate && (
                            <AccountDetailItem
                                label={"Birthday"}
                                title={birhDate}
                                rightContent={<View />}
                                onPress={showDatePicker}
                            />
                        )}

                        {/* Gender */}
                        {userData.Gender && getGenderById(userData.Gender) != null && (
                            <Collapse
                                onToggle={(isColl) => {
                                    console.log("isColl", isColl)
                                    setGenderCollapsed(isColl)
                                }}
                                isCollapsed={isGenderCollapsed}>
                                <CollapseHeader>
                                    <CollapseHeaderComponent
                                        label={"Gender"}
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
                        )}

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
                                        label={"Passions"}
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
                        {userData.sexual_orientation && (
                            <Collapse
                                onToggle={(isColl) => {
                                    console.log("isColl", isColl)
                                    setOrientationCollapsed(isColl)
                                }}
                                isCollapsed={isOrientationCollapsed}>
                                <CollapseHeader>
                                    <CollapseHeaderComponent
                                        label={"Sexual Orientation"}
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
                                                    color={orientation.id == selectedOrientation.id ? Colors.ui_primary : Colors.black}
                                                >{orientation.name}</AppText>
                                            </TouchableOpacity>
                                        })}
                                    </View>
                                </CollapseBody>
                            </Collapse>
                        )}
                    </View>
                )}
            </ScrollView>
            {isEdited && (
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <AppButton
                        type={'light'}
                        style={{ flex: 1 }}
                        title={"Cancel"}
                        onPress={() => navigation.goBack()} />
                    <AppButton
                        style={{ flex: 1, marginStart: 10 }}
                        title={"Save"} />
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