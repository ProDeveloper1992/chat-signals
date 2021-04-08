import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { AppDropDown, AppText } from '../..';

function LanguageSelectionMenu({ onSelectOption }) {
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


    const { selectedLanguage, languages } = useSelector((state) => state.appState);

    let selectedLanguageItem = languages.filter((item, index) => item.language_code == selectedLanguage);
    let updatedSelectedLanguage = { name: "Select Language" };

    if (selectedLanguageItem && selectedLanguageItem.length > 0) {
        updatedSelectedLanguage = selectedLanguageItem[0];
    }

    const [selectedOption, setSelectedOption] = useState(updatedSelectedLanguage);

    const onSelectMenu = (option) => {
        onSelectOption(option);
        setSelectedOption(option);
        hideMenu();
    }

    return (
        <Menu
            ref={setMenuRef}
            style={{ width: '88%', marginTop: 100, marginStart: 2 }}
            button={
                <AppDropDown title={"Select language"} value={selectedOption.name} onPress={showMenu} />
            }
        >
            {languages.map((option, optionIndex) => {
                return <View key={String(optionIndex)}>
                    <MenuItem
                        onPress={() => onSelectMenu(option)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingStart: Platform.OS == 'ios' ? 10 : 0 }}>
                            <AppText type={'medium'} style={{ marginStart: 5 }}>{option.name}</AppText>
                        </View>
                    </MenuItem>
                    <MenuDivider />
                </View>
            })}
        </Menu>
    );
}

export default LanguageSelectionMenu;

LanguageSelectionMenu.propTypes = {
    onSelectOption: PropTypes.func,
};

LanguageSelectionMenu.defaultProps = {
    onSelectOption: () => { },
};