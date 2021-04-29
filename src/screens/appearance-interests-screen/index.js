import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
} from 'accordion-collapse-react-native';

import { AppButton, AppText, BackHeader } from '../../components';
import { Colors } from '../../constants';
import { ArrowDownIcon, ArrowRightIcon } from '../../constants/svg-icons';
import styles from './style';

export default function AccountDetail(props) {

    const navigation = useNavigation();

    const { userData, friendsList } = useSelector((state) => state.userState);
    const { appLabels } = useSelector((state) => state.appState);

    const [isHeightCollapsed, setHeightCollapsed] = useState(false);
    const [isHairColorCollapsed, setHairColorCollapsed] = useState(false);
    const [isEyeColorCollapsed, setEyeColorCollapsed] = useState(false);
    const [isSkinTyprCollapsed, setSkinTyprCollapsed] = useState(false);

    let available_heights = ["150cm", "pl 1cm", "pl 2cm", "pl 3cm"];
    let available_hair_colors = ["Brown", "Black", "Pink", "White"];
    let available_eye_colors = ["Brown", "Black", "Dark blue"];
    let available_skin_types = ["Medium"];


    useEffect(() => {
        console.log("userData", userData)
    }, [])

    const onBackPress = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <BackHeader
                title={"Appearance & Interests"}
                onBackPress={onBackPress}
                color={Colors.ui_primary}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {/* Height */}
                <Collapse
                    onToggle={(isColl) => {
                        setHeightCollapsed(isColl)
                    }}
                    isCollapsed={isHeightCollapsed}>
                    <CollapseHeader>
                        <AppearanceItem
                            label={"Height"}
                            title={"150cm"}
                            isCollapsed={isHeightCollapsed}
                        />
                    </CollapseHeader>
                    <CollapseBody>
                        <View style={styles.collapseBodyContainer(isHeightCollapsed)}>
                            {available_heights.map((heightItem, heightIndex) => {
                                return <CollapsibleListItem
                                    key={String(heightIndex)}
                                    title={heightItem}
                                    onPress={() => { }} />
                            })}
                        </View>
                    </CollapseBody>
                </Collapse>

                {/* Hair color */}
                <Collapse
                    onToggle={(isColl) => {
                        setHairColorCollapsed(isColl)
                    }}
                    isCollapsed={isHairColorCollapsed}>
                    <CollapseHeader>
                        <AppearanceItem
                            label={"Hair color"}
                            title={"Brown"}
                            isCollapsed={isHairColorCollapsed}
                        />
                    </CollapseHeader>
                    <CollapseBody>
                        <View style={styles.collapseBodyContainer(isHairColorCollapsed)}>
                            {available_hair_colors.map((hairColor, hairColorIndex) => {
                                return <CollapsibleListItem
                                    key={String(hairColorIndex)}
                                    title={hairColor}
                                    onPress={() => { }} />
                            })}
                        </View>
                    </CollapseBody>
                </Collapse>

                {/* Eye color */}
                <Collapse
                    onToggle={(isColl) => {
                        setEyeColorCollapsed(isColl)
                    }}
                    isCollapsed={isEyeColorCollapsed}>
                    <CollapseHeader>
                        <AppearanceItem
                            label={"Eye color"}
                            title={"Dark blue"}
                            isCollapsed={isEyeColorCollapsed}
                        />
                    </CollapseHeader>
                    <CollapseBody>
                        <View style={styles.collapseBodyContainer(isEyeColorCollapsed)}>
                            {available_eye_colors.map((eyeColor, eyeColorIndex) => {
                                return <CollapsibleListItem
                                    key={String(eyeColorIndex)}
                                    title={eyeColor}
                                    onPress={() => { }} />
                            })}
                        </View>
                    </CollapseBody>
                </Collapse>

                {/* Skin type */}
                <Collapse
                    onToggle={(isColl) => {
                        setSkinTyprCollapsed(isColl)
                    }}
                    isCollapsed={isSkinTyprCollapsed}>
                    <CollapseHeader>
                        <AppearanceItem
                            label={"Skin type"}
                            title={"Medium"}
                            isCollapsed={isSkinTyprCollapsed}
                        />
                    </CollapseHeader>
                    <CollapseBody>
                        <View style={styles.collapseBodyContainer(isSkinTyprCollapsed)}>
                            {available_skin_types.map((item, index) => {
                                return <CollapsibleListItem
                                    key={String(index)}
                                    title={item}
                                    onPress={() => { }} />
                            })}
                        </View>
                    </CollapseBody>
                </Collapse>


                <AppearanceItem
                    label={"Eye color"}
                    title={"Blue"}
                />
                <AppearanceItem
                    label={"Skin type"}
                    title={"Medium"}
                />
                <AppearanceItem
                    label={"Figure"}
                    title={"Athletic"}
                />
                <AppearanceItem
                    label={"Hair length"}
                    title={"20cm"}
                />
                <AppearanceItem
                    label={"Smoker"}
                    title={"No"}
                />
                <AppearanceItem
                    label={"Drinker"}
                    title={"Sometime"}
                />
            </ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <AppButton
                    type={'light'}
                    style={{ flex: 1 }}
                    title={"Cancel"} />
                <AppButton
                    style={{ flex: 1, marginStart: 10 }}
                    title={"Save"} />
            </View>
        </View>
    )
}

const AppearanceItem = ({ label, title, isCollapsed }) => {
    return (
        <View style={[styles.accountDetailItemContainer, { borderBottomWidth: isCollapsed ? 0 : 1 }]}>
            <View>
                <AppText type={'regular'} size={14} color={Colors.black}>{label}</AppText>
                <AppText type={'bold'} size={16} color={Colors.black}>{title}</AppText>
            </View>
            {isCollapsed ? <ArrowDownIcon width={18} height={18} /> : <ArrowRightIcon width={18} height={18} />}
        </View>
    )
}

const CollapsibleListItem = ({ title, onPress, isSelected }) => {
    return <TouchableOpacity
        onPress={onPress}
        style={{ borderBottomWidth: 0.5, borderColor: Colors.grey, marginBottom: 5, padding: 10 }}>
        <AppText
            type={'medium'}
            size={14}
            color={isSelected ? Colors.ui_primary : Colors.black}
        >{title}</AppText>
    </TouchableOpacity>
}