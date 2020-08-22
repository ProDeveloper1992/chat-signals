import React, {Component} from 'react';
import {View} from 'react-native';
import {GenderItem} from '../Radios';

export default class GenderPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderData: [
        {
          gender_id: 1,
          gender_icon:
            'https://img2.pngio.com/download-free-png-male-icon-png-102234-free-icons-library-male-logo-png-512_512.png',
          selected: false,
        },

        {
          gender_id: 1,
          gender_icon:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Female_symbol.svg/512px-Female_symbol.svg.png',
          selected: false,
        },

        // {
        //   gender_id: 3,
        //   gender_icon:
        //     'https://img.pngio.com/gender-symbol-gender-wiki-fandom-powered-by-wikia-gender-symbol-png-300_300.png',
        //   selected: false,
        // },
      ],
    };
  }

  changeCountry = (index) => {
    let genders = this.state.genderData;

    genders.map((item) => {
      item.selected = false;
    });
    genders[index].selected = true;
    this.setState({genderData: genders});
  };

  render() {
    const {genderData} = this.state;
    return (
      <View style={{flexDirection: 'row', paddingVertical: 5}}>
        {genderData.map((item, index) => (
          <View style={{flex: 1}}>
            <GenderItem
              key={index}
              isSelected={item.selected}
              imageUrl={item.gender_icon}
              onPress={this.changeCountry.bind(this, index)}
            />
          </View>
        ))}
      </View>
    );
  }
}
