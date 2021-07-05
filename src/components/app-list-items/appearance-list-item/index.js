import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
} from 'accordion-collapse-react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './style'
import { AppText } from '../..';
import { Colors, SCREEN_WIDTH } from '../../../constants';
import { TagItem } from '../../../components';
import { ArrowDownIcon, ArrowRightIcon } from '../../../constants/svg-icons';
import { useSelector } from 'react-redux';
import { getFontFamily } from '../../../utils/common';

export default function AppearanceListItem({ item, onSelectAttribute, onChangeTextBoxValue }) {

    // console.log("AppearanceListItem", item)

    const { customerAppearanceInterests } = useSelector((state) => state.userState);

    const [inputAttributeValue, setInputAttributeValue] = useState(item.attr_value ? item.attr_value : "");

    const getAttributeValue = () => {
        let value = '';
        for (let appearance of customerAppearanceInterests) {
            if (appearance.internal_name == item.internal_name) {
                for (let attribute_value of item.attributes_value) {
                    if (attribute_value.id * 1 == item.attr_value * 1) {
                        value = attribute_value.value;
                    }
                }
            }
        }
        return value;
    }

    if (item.fieldtype.type == 'select') {

        const [isCollapsed, setIsCollapsed] = useState(false);
        const [selectedAttributeValue, setSelectedAttributeValue] = useState(item.attr_value ? getAttributeValue(item) : "Select Option");

        const onSelectAttributeValue = (attributeItem) => {
            setSelectedAttributeValue(attributeItem.value);
            onSelectAttribute(attributeItem, item);
        }

        return (
            <Collapse
                onToggle={(isColl) => setIsCollapsed(isColl)}
                isCollapsed={isCollapsed}>
                <CollapseHeader>
                    <AppearanceCollapsibleItem
                        label={item.display_name}
                        title={selectedAttributeValue}
                        isCollapsed={isCollapsed}
                    />
                </CollapseHeader>
                <CollapseBody>
                    <View style={styles.collapseBodyContainer(isCollapsed)}>
                        {item.attributes_value.map((attributeItem, attributeIndex) => {
                            return <CollapsibleListItem
                                key={String(attributeIndex)}
                                isSelected={attributeItem.value == selectedAttributeValue}
                                title={attributeItem.value}
                                onPress={() => onSelectAttributeValue(attributeItem)} />
                        })}
                    </View>
                </CollapseBody>
            </Collapse>
        )
    } else if (item.fieldtype.type == 'textbox') {
        const onChangeInputValue = (text) => {
            setInputAttributeValue(text);
            onChangeTextBoxValue(text, item);
        }

        return <AppearanceInputItem label={item.display_name} value={inputAttributeValue} onChangeText={onChangeInputValue} />
    } else if (item.fieldtype.type == 'multiselect') {

        const [isCollapsed, setIsCollapsed] = useState(false);
        const [selectedAttributeValue, setSelectedAttributeValue] = useState(item.attr_value ? getAttributeValue(item) : "Select Option");

        const onSelectAttributeValue = (attributeItem, isTrue) => {
            setSelectedAttributeValue(attributeItem.value);
            console.log("isTrue", isTrue)
        }
        return (
            <Collapse
                onToggle={(isColl) => setIsCollapsed(isColl)}
                isCollapsed={isCollapsed}>
                <CollapseHeader>
                    <AppearanceCollapsibleItem
                        label={item.display_name}
                        title={inputAttributeValue}
                        isCollapsed={false} />
                </CollapseHeader>
                <CollapseBody>
                    <View style={[styles.collapseBodyContainer(isCollapsed), { flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10 }]}>
                        {item.attributes_value.map((attributeItem, attributeIndex) => {
                            return <TagItem
                                key={String(attributeIndex)}
                                disabled={false}
                                selected={attributeItem.value == selectedAttributeValue}
                                title={attributeItem.value}
                                onPress={(isTrue) => onSelectAttributeValue(attributeItem, isTrue)}
                            />
                        })}
                    </View>
                </CollapseBody>
            </Collapse>
        )
    }
    return <View />;
}

const CollapsibleListItem = ({ title, onPress, isSelected }) => {
    return <TouchableOpacity
        onPress={onPress}
        style={{ borderBottomWidth: 0.5, borderColor: Colors.grey, marginBottom: wp(2), padding: wp(3) }}>
        <AppText
            type={'medium'}
            size={wp(4)}
            color={isSelected ? Colors.ui_primary : Colors.black}
        >{title}</AppText>
    </TouchableOpacity>
}

const AppearanceCollapsibleItem = ({ label, title, isCollapsed }) => {
    return (
        <View style={[styles.accountDetailItemContainer, { borderBottomWidth: isCollapsed ? 0 : 1 }]}>
            <View style={{ flex: 1 }}>
                <AppText type={'regular'} size={wp(4)} color={Colors.black}>{label}</AppText>
                <AppText type={'bold'} size={wp(4.5)} color={Colors.black}>{title}</AppText>
            </View>
            {isCollapsed ? <ArrowDownIcon width={wp(5)} height={wp(5)} /> : <ArrowRightIcon width={wp(5)} height={wp(5)} />}
        </View>
    )
}

const AppearanceInputItem = ({ label, value, onChangeText }) => {
    return (
        <View style={[styles.accountDetailItemContainer, { borderBottomWidth: 1 }]}>
            <View style={{ flex: 1 }}>
                <AppText type={'regular'} size={wp(4)} color={Colors.black}>{label}</AppText>
                <TextInput
                    placeholder={label}
                    value={value}
                    onChangeText={onChangeText}
                    style={{
                        width: '100%',
                        fontSize: wp(5),
                        fontFamily: getFontFamily('bold'),
                        color: Colors.black,
                        paddingVertical: 0
                    }} />
            </View>
            <ArrowRightIcon width={wp(5)} height={wp(5)} />
        </View>
    )
}