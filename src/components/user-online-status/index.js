import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../constants';

export function OnlineStatusCircle({ isOnline, size }) {

    return (
        <View style={styles.container(isOnline, size)} />
    );
}

const styles = StyleSheet.create({
    container: function (isOnline, size) {
        return {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            backgroundColor: isOnline ? Colors.ui_user_active : Colors.red,
            borderColor: Colors.white,
            shadowColor: Colors.black,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 2,
            shadowOpacity: 0.35,
            elevation: 2,
        }
    },
    title: {
        marginTop: 5,
        textTransform: 'uppercase',
    },

});

OnlineStatusCircle.propTypes = {
    isOnline: PropTypes.bool,
    size: PropTypes.number,
};

OnlineStatusCircle.defaultProps = {
    isOnline: false,
    size: 12,
};
