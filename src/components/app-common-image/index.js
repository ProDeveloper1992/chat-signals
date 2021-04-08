import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, DEFAULT_AVATAR_URL, Images } from '../../constants';


export default function CommonImage({ size, borderColor, source }) {
    return (
        <TouchableOpacity style={styles.container(size, borderColor)}>
            <Image style={styles.imageStyle(size)} source={source} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: function (size, borderColor) {
        return {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 3,
            borderColor: borderColor,
        }
    },
    imageStyle: function (size) {
        return {
            width: size,
            height: size,
            borderRadius: size / 2,
        }
    }
});

CommonImage.propTypes = {
    size: PropTypes.number,
    borderColor: PropTypes.string,
    source: PropTypes.any
};

CommonImage.defaultProps = {
    size: 70,
    borderColor: Colors.transparent,
    source: { uri: DEFAULT_AVATAR_URL }
};
