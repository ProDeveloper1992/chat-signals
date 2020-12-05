import React, {useState} from 'react';
import {View} from 'react-native';
import {CountryItem} from '../Radios';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {changeAppLanguage} from '../../redux/actions/app-actions';

export default function CountryPicker({onChangeLanguage}) {
  const dispatch = useDispatch();

  const {selectedLanguage} = useSelector((state) => state.appState);

  const countryData = [
    {
      country_id: 1,
      country_name: 'USA',
      country_code: 'en',
      country_flag:
        'https://cdn.countryflags.com/thumbs/united-states-of-america/flag-800.png',
      selected: selectedLanguage === 'en' ? true : false,
    },

    {
      country_id: 2,
      country_name: 'Germany',
      country_code: 'de',
      country_flag:
        'https://cdn.countryflags.com/thumbs/germany/flag-round-250.png',
      selected: selectedLanguage === 'de' ? true : false,
    },

    {
      country_id: 3,
      country_name: 'Switzerland',
      country_code: 'ch',
      country_flag:
        'https://cdn.countryflags.com/thumbs/switzerland/flag-round-250.png',
      selected: selectedLanguage === 'ch' ? true : false,
    },
  ];

  return (
    <View style={{flexDirection: 'row', paddingVertical: 5}}>
      {countryData.map((item, index) => (
        <View style={{flex: 1}} key={String(index)}>
          <CountryItem
            key={index}
            country={item}
            isSelected={item.selected}
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
