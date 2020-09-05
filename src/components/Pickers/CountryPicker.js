import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {CountryItem} from '../Radios';

export default class CountryPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryData: [
        {
          country_id: 1,
          country_name: 'Germany',
          country_code: 'DE',
          country_flag:
            'https://cdn.countryflags.com/thumbs/germany/flag-round-250.png',
          selected: false,
        },

        {
          country_id: 1,
          country_name: 'Austria',
          country_code: 'AT',
          country_flag:
            'https://cdn.countryflags.com/thumbs/austria/flag-round-250.png',
          selected: false,
        },

        {
          country_id: 3,
          country_name: 'Switzerland',
          country_code: 'CH',
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
