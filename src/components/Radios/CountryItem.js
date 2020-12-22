import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../constants';
import { AppText } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { setUserCountry } from '../../redux/actions/user-actions';

export function CountryItem({
    country,
    imageUrl,
    countryName,
    size,
    style,
}) {
    const dispatch = useDispatch();

    const { userCountry } = useSelector((state) => state.userState);

    const onPress = async () => {
        dispatch(setUserCountry(country));
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.container,
                style,
                {
                    backgroundColor: country.country_id === userCountry.country_id ? Colors.ui_primary : Colors.white,
                    borderColor: country.country_id === userCountry.country_id ? Colors.white : Colors.greydark,
                },
            ]}
            onPress={onPress}>
            <Image
                source={{ uri: imageUrl }}
                style={{
                    width: size,
                    height: size,
                    resizeMode: 'cover',
                    borderRadius: size / 2,
                }}
            />

            <AppText
                type={'bold'}
                size={16}
                color={country.country_id === userCountry.country_id ? Colors.white : Colors.black}
                style={styles.title}>
                {countryName}
            </AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 5,
        borderRadius: 4,
        borderWidth: 0.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },
    title: {
        marginTop: 5,
        textTransform: 'uppercase',
    },
});

CountryItem.propTypes = {
    imageUrl: PropTypes.string,
    countryName: PropTypes.string,
    size: PropTypes.any,
    onChangeCountry: PropTypes.func,
};

CountryItem.defaultProps = {
    imageUrl: 'https://cdn.countryflags.com/thumbs/india/flag-400.png',
    countryName: 'IN',
    size: 24,
    onChangeCountry: () => { },
};
