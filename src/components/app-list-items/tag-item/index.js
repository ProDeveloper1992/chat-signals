import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Colors } from '../../../constants';
import { AppText } from '../../index';

export default function TagItem({ title, disabled, onPress, selected }) {

    const [isSelected, setIsSelected] = useState(selected);

    const onTagPress = () => {
        if (isSelected) {
            setIsSelected(false);
            onPress(false);
        } else {
            setIsSelected(true);
            onPress(true);
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={disabled}
            onPress={onTagPress}
            style={styles.container(isSelected)}>
            <AppText type={'medium'} size={wp(4)} color={isSelected ? Colors.white : Colors.ui_primary}>{title}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: function (isSelected) {
        return {
            backgroundColor: isSelected ? Colors.ui_primary : Colors.ui_primary_10,
            paddingHorizontal: wp(5),
            paddingVertical: wp(2.5),
            borderRadius: hp(5),
            marginEnd: wp(3),
            marginBottom: hp(2.2)
        }
    }
})

TagItem.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    onPress: PropTypes.func
};

TagItem.defaultProps = {
    title: "Tag title",
    disabled: false,
    selected: false,
    onPress: () => { }
};
