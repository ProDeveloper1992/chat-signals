import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../constants';
import { AppText } from '..';

export function MoreGenderItem({ isSelected, gender, style, onPress }) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.container,
                style,
            ]}
            onPress={onPress}>
            <View style={styles.circleContainer}>
                <View style={styles.circle(isSelected)} />
            </View>
            <AppText type={'regular'} size={14} color={Colors.black}>{gender}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        // shadowColor: '#000',
        // shadowOffset: {width: 0, height: 5},
        // shadowOpacity: 0.1,
        // shadowRadius: 10,
        // elevation: 8,
    },
    circleContainer: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        borderWidth: 0.5,
        borderColor: Colors.ui_primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 10
    },
    circle: function (isSelected) {
        return {
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: isSelected ? Colors.ui_primary : Colors.transparent
        }
    }
});

MoreGenderItem.propTypes = {
    size: PropTypes.any,
    isSelected: PropTypes.bool,
    onPress: PropTypes.func,
};

MoreGenderItem.defaultProps = {
    size: 24,
    isSelected: false,
    onPress: () => { },
};
