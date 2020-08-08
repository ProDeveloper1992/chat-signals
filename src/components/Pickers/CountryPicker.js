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
          country_name: 'India',
          country_code: 'IN',
          country_flag:
            'https://cdn.countryflags.com/thumbs/india/flag-400.png',
          selected: true,
        },

        {
          country_id: 2,
          country_name: 'Germany',
          country_code: 'GM',
          country_flag:
            'https://cdn.webshopapp.com/shops/94414/files/54006608/germany-flag-icon-free-download.jpg',
          selected: false,
        },

        {
          country_id: 3,
          country_name: 'USA',
          country_code: 'US',
          country_flag:
            'https://www.nicepng.com/png/detail/6-63506_usa-png-clipart-american-flag-icon-png.png',
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
      <View style={{flexDirection: 'row', paddingVertical: 10}}>
        {countryData.map((item, index) => (
          <View style={{flex: 1}}>
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
