import React, { useState } from 'react';
import { View } from 'react-native';
import { LaguageItem } from '../Radios';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function LanguagePicker({ onChangeLanguage }) {

  const { selectedLanguage, languages } = useSelector((state) => state.appState);

  return (
    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
      {languages.map((item, index) => (
        <View style={{ flex: 1 }} key={String(index)}>
          <LaguageItem
            key={index}
            country={item}
            isSelected={selectedLanguage == item.key ? true : false}
            countryName={item.key}
            imageUrl={item.image}
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
