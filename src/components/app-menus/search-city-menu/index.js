import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { useSelector } from 'react-redux';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { AppDropDown, AppText, AuthInput } from '../..';
import { GOOGLE_MAP_API_KEY } from '../../../constants';

function SearchCityMenu({ onSelectCity }) {
    let _menu = null;

    const setMenuRef = ref => {
        _menu = ref;
    };

    const hideMenu = () => {
        _menu.hide();
    };

    const showMenu = () => {
        _menu.show();
    };

    const { appLabels, passionList, selectedLanguage } = useSelector((state) => state.appState);

    const [city, setCity] = useState('');
    const [searchedCities, setSearchedCities] = useState([]);

    const onSelectMenu = (cityItem) => {
        console.log("cityItem", cityItem)
        setCity(cityItem.name);
        onSelectCity(cityItem.name);
        hideMenu();
    }

    const searchCityList = async (searchText) => {
        fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchText}&key=${GOOGLE_MAP_API_KEY}`
        ).then(async (response) => {
            let json = await response.json();
            if (json.status == 'OK') {
                showMenu();
                setSearchedCities(json.results)
                console.log("Results", json.results)
            }
        }).catch((error) => {
            console.log("error", error);
        })
    };

    return (
        <Menu
            ref={setMenuRef}
            style={{ width: '88%', borderRadius: hp(2) }}
            button={<AuthInput
                value={city}
                label={appLabels.city}
                placeholder={appLabels.city}
                onChangeText={(text) => {
                    setCity(text)
                }}
                style={{ paddingHorizontal: 5, fontWeight: 'bold', fontSize: hp(2.5) }}
                onSubmitEditing={() => searchCityList(city)} />}
        >
            <ScrollView style={{ paddingBottom: '5%', paddingTop: '5%' }}>
                {searchedCities.map((cityItem, genderIndex) => {
                    return <MenuItem
                        key={String(genderIndex)}
                        onPress={() => onSelectMenu(cityItem)}>
                        <AppText size={hp(2.2)}>{cityItem.name}</AppText>
                    </MenuItem>
                })}
            </ScrollView>
        </Menu>
    );
}

export default SearchCityMenu;