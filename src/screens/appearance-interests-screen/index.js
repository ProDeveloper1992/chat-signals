import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
} from 'accordion-collapse-react-native';

import { AppButton, AppText, BackHeader } from '../../components';
import { Colors } from '../../constants';
import { ArrowDownIcon, ArrowRightIcon } from '../../constants/svg-icons';
import styles from './style';
import { updateCustomerAttributes } from '../../redux/actions/user-actions';
import AppearanceListItem from '../../components/app-list-items/appearance-list-item';

export default function AccountDetail(props) {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { userData, customerAppearanceInterests } = useSelector((state) => state.userState);
    const { appLabels } = useSelector((state) => state.appState);

    const getAttributeValue = (attribute) => {
        let height = '';
        for (let appearance of customerAppearanceInterests) {
            if (appearance.internal_name == attribute) {
                height = appearance.attr_value;
            }
        }
        return height;
    }

    const [isSaving, setIsSaving] = useState(false);
    //Selectable attributes
    const [height, setHeight] = useState(getAttributeValue('height'));
    const [hairColor, setHairColor] = useState(getAttributeValue('hair_color'));
    const [eyeColor, setEyeColor] = useState(getAttributeValue('eye_color'));
    const [skinType, setSkinType] = useState(getAttributeValue('skin_type'));
    const [figure, setFigure] = useState(getAttributeValue('skin_type'));
    //Textbox attributes
    const [size, setSize] = useState(getAttributeValue('size'));
    const [hairLength, setHairLength] = useState(getAttributeValue('Hair_Length'));
    const [smoker, setSmoker] = useState(getAttributeValue('Smoker'));
    const [children, setChildren] = useState(getAttributeValue('Children'));
    const [relationshipStatus, setRelationshipStatus] = useState(getAttributeValue('Relationship_Status'));
    const [job, setJob] = useState(getAttributeValue('Job'));
    const [hobbies, setHobbies] = useState(getAttributeValue('Hobbies'));

    useEffect(() => {
        console.log("userData", userData)
    }, [])

    const onBackPress = () => {
        navigation.goBack();
    }

    const onSaveAttributes = async () => {
        let requestData = {
            profile_id: userData.id,
            language: userData.language,
            height: height,
            hair_color: hairColor,
            eye_color: eyeColor,
            skin_type: skinType,
            size: size,
            figure: figure,
            Hair_Length: hairLength,
            Smoker: smoker,
            Children: children,
            Relationship_Status: relationshipStatus,
            Job: job,
            Hobbies: hobbies
        };
        setIsSaving(true);
        await dispatch(updateCustomerAttributes(requestData));
        setIsSaving(false);
        navigation.goBack();
    }

    const onSelectAttribute = (selectedAttribute, attributeitem) => {
        console.log("selectedAttribute", selectedAttribute)
        console.log("attributeitem", attributeitem)
        switch (attributeitem.internal_name) {
            case 'height':
                setHeight(selectedAttribute.id);
                break;

            case 'hair_color':
                setHairColor(selectedAttribute.id);
                break;

            case 'eye_color':
                setEyeColor(selectedAttribute.id);
                break;

            case 'skin_type':
                setSkinType(selectedAttribute.id);
                break;

            case 'figure':
                setFigure(selectedAttribute.id);
                break;
            default:
                break;
        }
    }

    const onChangeTextBoxValue = (value, attributeitem) => {
        switch (attributeitem.internal_name) {
            case 'size':
                setSize(value);
                break;

            case 'Hair_Length':
                setHairLength(value);
                break;

            case 'Smoker':
                setSmoker(value);
                break;

            case 'Children':
                setChildren(value);
                break;

            case 'Relationship_Status':
                setRelationshipStatus(value);
                break;

            case 'Job':
                setJob(value);
                break;

            case 'Hobbies':
                setHobbies(value);
                break;
            default:
                break;
        }
    }

    return (
        <View style={styles.container}>
            <BackHeader
                title={`${appLabels.appearance} & ${appLabels.interests}`}
                onBackPress={onBackPress}
                color={Colors.ui_primary}
            />

            <FlatList
                data={customerAppearanceInterests}
                renderItem={({ item, index }) => {
                    return <AppearanceListItem
                        key={String(index)}
                        item={item}
                        onSelectAttribute={onSelectAttribute}
                        onChangeTextBoxValue={onChangeTextBoxValue} />
                }}
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(item, index) => String(index)}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <AppButton
                    type={'light'}
                    style={{ flex: 1 }}
                    title={appLabels.cancel}
                    onPress={() => navigation.goBack()} />
                <AppButton
                    style={{ flex: 1, marginStart: 10 }}
                    title={appLabels.save}
                    onPress={onSaveAttributes}
                    loading={isSaving} />
            </View>
        </View>
    )
}