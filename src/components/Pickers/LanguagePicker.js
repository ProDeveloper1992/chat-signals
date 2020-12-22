import React, { useState } from 'react';
import { View } from 'react-native';
import { LaguageItem } from '../Radios';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function LanguagePicker({ onChangeLanguage }) {

  const { selectedLanguage } = useSelector((state) => state.appState);

  const Languages = [
    {
      language_id: 1,
      language_code: 'en',
      country_flag:
        'https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png',
      selected: selectedLanguage === 'en' ? true : false,
    },

    {
      language_id: 2,
      language_code: 'de',
      country_flag:
        'https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png',
      selected: selectedLanguage === 'de' ? true : false,
    },

    {
      language_id: 3,
      language_code: 'es',
      country_flag:
        'https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png',
      selected: selectedLanguage === 'es' ? true : false,
    },

    {
      language_id: 4,
      language_code: 'fr',
      country_flag:
        'https://www.countryflags.com/wp-content/uploads/france-flag-png-large.png',
      selected: selectedLanguage === 'fr' ? true : false,
    },
  ];

  return (
    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
      {Languages.map((item, index) => (
        <View style={{ flex: 1 }} key={String(index)}>
          <LaguageItem
            key={index}
            country={item}
            isSelected={item.selected}
            countryName={item.language_code}
            imageUrl={item.country_flag}
            onChangeCountry={onChangeLanguage}
          />
        </View>
      ))}
    </View>
  );
}

LanguagePicker.propTypes = {
  onChangeLanguage: PropTypes.func,
};

LanguagePicker.defaultProps = {
  onChangeLanguage: (language) => {
    // alert(JSON.stringify(language));
  },
};
