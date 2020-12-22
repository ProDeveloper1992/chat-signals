import React, { useState } from 'react';
import { View } from 'react-native';
import { CountryItem } from '../Radios';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function CountryPicker({ onChangeLanguage }) {

    const countryData = [
        {
            country_id: 1,
            country_code: 'DE',
            country_flag:
                'https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png',
        },

        {
            country_id: 2,
            country_code: 'CH',
            country_flag:
                'https://www.countryflags.com/wp-content/uploads/switzerland-flag-png-large.png',
        },

        {
            country_id: 3,
            country_code: 'AT',
            country_flag:
                'https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-10-1536x1024.jpg',
        },
    ];

    return (
        <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
            {countryData.map((item, index) => (
                <View style={{ flex: 1 }} key={String(index)}>
                    <CountryItem
                        key={index}
                        country={item}
                        isSelected={false}
                        countryName={item.country_code}
                        imageUrl={item.country_flag}
                        onChangeCountry={onChangeLanguage}
                    />
                </View>
            ))}
        </View>
    );
}

CountryPicker.propTypes = {
    onChangeLanguage: PropTypes.func,
};

CountryPicker.defaultProps = {
    onChangeLanguage: (language) => {
        // alert(JSON.stringify(language));
    },
};
