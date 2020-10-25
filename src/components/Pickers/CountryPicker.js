import React, {Component} from 'react';
import {View} from 'react-native';
import {CountryItem} from '../Radios';
import PropTypes from 'prop-types';

export default class CountryPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryData: [
        {
          country_id: 1,
          country_name: 'USA',
          country_code: 'en',
          country_flag:
            'https://cdn.countryflags.com/thumbs/united-states-of-america/flag-800.png',
          selected: true,
        },

        {
          country_id: 2,
          country_name: 'Germany',
          country_code: 'de',
          country_flag:
            'https://cdn.countryflags.com/thumbs/germany/flag-round-250.png',
          selected: false,
        },

        {
          country_id: 3,
          country_name: 'Switzerland',
          country_code: 'ch',
          country_flag:
            'https://cdn.countryflags.com/thumbs/switzerland/flag-round-250.png',
          selected: false,
        },
      ],
    };
  }

  changeCountry = (index) => {
    let countries = this.state.countryData;

    countries.map((item) => {
      item.selected = false;
    });
    countries[index].selected = true;
    this.setState({countryData: countries});
    this.props.onChangeLanguage(countries[index]);
  };

  render() {
    const {countryData} = this.state;
    return (
      <View style={{flexDirection: 'row', paddingVertical: 5}}>
        {countryData.map((item, index) => (
          <View style={{flex: 1}} key={String(index)}>
            <CountryItem
              key={index}
              isSelected={item.selected}
              countryName={item.country_code}
              imageUrl={item.country_flag}
              onPress={this.changeCountry.bind(this, index)}
            />
          </View>
        ))}
      </View>
    );
  }
}

CountryPicker.propTypes = {
  onChangeLanguage: PropTypes.func,
};

CountryPicker.defaultProps = {
  onChangeLanguage: (language) => {
    // alert(JSON.stringify(language));
  },
};
