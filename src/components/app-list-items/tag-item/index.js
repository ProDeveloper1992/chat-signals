import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import { Colors, Icons, Images } from '../../../constants';
import { AppText } from '../../index';

export default function TagItem({ title, disabled }) {

    const [isSelected, setIsSelected] = useState(false);

    const onTagPress = () => {
        setIsSelected(!isSelected);
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={disabled}
            onPress={onTagPress}
            style={styles.container(isSelected)}>
            <AppText type={'medium'} color={isSelected ? Colors.white : Colors.ui_primary}>{title}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: function (isSelected) {
        return {
            backgroundColor: isSelected ? Colors.ui_primary : Colors.ui_primary_10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 30,
            marginEnd: 12,
            marginBottom: 12
        }
    }
})

TagItem.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool
};

TagItem.defaultProps = {
    title: "Tag title",
    disabled: false
};
