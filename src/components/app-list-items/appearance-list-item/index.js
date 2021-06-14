import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
} from 'accordion-collapse-react-native';
import styles from './style'
import { AppText } from '../..';
import { Colors, SCREEN_WIDTH } from '../../../constants';
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

    if (item.fieldtype_id == '1' || item.fieldtype_id == '7') {

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
    } else if (item.fieldtype_id == '3') {
        const onChangeInputValue = (text) => {
            setInputAttributeValue(text);
            onChangeTextBoxValue(text, item);
        }

        return <AppearanceInputItem label={item.display_name} value={inputAttributeValue} onChangeText={onChangeInputValue} />
    } else if (item.fieldtype_id == '8') {
        return <AppearanceCollapsibleItem label={item.display_name} title={inputAttributeValue} isCollapsed={false} />;
    }
    return <View />;
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

const AppearanceCollapsibleItem = ({ label, title, isCollapsed }) => {
    return (
        <View style={[styles.accountDetailItemContainer, { borderBottomWidth: isCollapsed ? 0 : 1 }]}>
            <View style={{ flex: 1 }}>
                <AppText type={'regular'} size={14} color={Colors.black}>{label}</AppText>
                <AppText type={'bold'} size={16} color={Colors.black}>{title}</AppText>
            </View>
            {isCollapsed ? <ArrowDownIcon width={18} height={18} /> : <ArrowRightIcon width={18} height={18} />}
        </View>
    )
}

const AppearanceInputItem = ({ label, value, onChangeText }) => {
    return (
        <View style={[styles.accountDetailItemContainer, { borderBottomWidth: 1 }]}>
            <View style={{ flex: 1 }}>
                <AppText type={'regular'} size={14} color={Colors.black}>{label}</AppText>
                <TextInput
                    placeholder={label}
                    value={value}
                    onChangeText={onChangeText}
                    style={{
                        width: '100%',
                        fontSize: 18,
                        fontFamily: getFontFamily('bold'),
                        color: Colors.black
                    }} />
            </View>
            <ArrowRightIcon width={18} height={18} />
        </View>
    )
}