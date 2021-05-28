import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import { Colors, DEFAULT_AVATAR_URL } from '../../constants';


export default function CommonImage({ borderWidth, size, borderColor, source, touchable, isShadow, onPress }) {
    return (
        <TouchableOpacity disabled={!touchable} style={styles.container(size, borderColor, borderWidth, isShadow)} onPress={onPress}>
            <FastImage
                style={styles.imageStyle(size)}
                source={source}
                resizeMode={FastImage.resizeMode.cover}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: function (size, borderColor, borderWidth, isShadow) {
        return {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: borderWidth,
            borderColor: borderColor,
            shadowColor: Colors.black,
            shadowOffset: { width: 0, height: isShadow ? 5 : 0 },
            shadowOpacity: 0.1,
            shadowRadius: isShadow ? 10 : 0,
            elevation: isShadow ? 8 : 0,
        }
    },
    imageStyle: function (size) {
        return {
            width: "100%",
            height: "100%",
            borderRadius: size / 2,
        }
    }
});

CommonImage.propTypes = {
    size: PropTypes.number,
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    source: PropTypes.any,
    touchable: PropTypes.bool,
    isShadow: PropTypes.bool,
    onPress: PropTypes.func
};

CommonImage.defaultProps = {
    size: 70,
    borderColor: Colors.transparent,
    borderWidth: 0,
    source: { uri: DEFAULT_AVATAR_URL },
    touchable: true,
    isShadow: false,
    onPress: () => { }
};
