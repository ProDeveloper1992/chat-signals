import React, { useCallback } from 'react';
import { View } from 'react-native';
import RangeSlider from 'rn-range-slider';
import PropTypes from 'prop-types';

import { AppText } from '..';
import { Colors } from '../../constants';
import styles from './style';

export default function AppRangeSlider({ minimum, maximum, disableRange, onChangeValue }) {

    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <AppText size={8}>{""}</AppText>, []);
    const renderNotch = useCallback(() => <View />, []);
    const handleValueChange = useCallback((low, high) => {
        // console.log("low", low)
        onChangeValue(low, high);
        // setLowAge(low);
        // setHighAge(high);
    }, []);

    return (
        <RangeSlider
            style={styles.container}
            min={minimum}
            max={maximum}
            step={1}
            // floatingLabel
            disableRange={disableRange}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange} />
    )
}

const Thumb = () => {
    return (
        <View style={styles.thumb} />
    )
}

const Rail = () => {
    return (
        <View style={styles.rail} />
    )
}

const RailSelected = () => {
    return (
        <View style={styles.railselected} />
    )
}

AppRangeSlider.propTypes = {
    disableRange: PropTypes.bool,
    minimum: PropTypes.number,
    maximum: PropTypes.number,
    onChangeValue: PropTypes.func,
};

AppRangeSlider.defaultProps = {
    disableRange: false,
    minimum: 0,
    maximum: 100,
    onChangeValue: () => { },
};
