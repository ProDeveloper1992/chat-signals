import React, { useState } from 'react';

import { View, Platform } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { useSelector } from 'react-redux';
import { AppDropDown, AppText } from '../..';

function HelpTicketMenu({ onSelectOption }) {
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

    const { helpTicketSubjects } = useSelector((state) => state.appState);

    const [selectedOption, setSelectedOption] = useState({ name: "-" });

    const onSelectMenu = (option) => {
        onSelectOption(option);
        setSelectedOption(option);
        hideMenu();
    }

    return (
        <Menu
            ref={setMenuRef}
            style={{ width: '88%', marginTop: 100, marginStart: 2, borderRadius: 11 }}
            button={
                <AppDropDown title={"Subject"} value={selectedOption.name} onPress={showMenu} />
            }
        >
            {helpTicketSubjects && helpTicketSubjects.map((option, optionIndex) => {
                return <View key={String(optionIndex)}>
                    <MenuItem
                        onPress={() => onSelectMenu(option)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingStart: Platform.OS == 'ios' ? 10 : 0 }}>
                            <AppText type={'medium'} style={{ marginStart: 5 }}>{option.name}</AppText>
                        </View>
                    </MenuItem>
                    {optionIndex != helpTicketSubjects.length - 1 && (
                        <MenuDivider />
                    )}
                </View>
            })}
        </Menu>
    );
}

export default HelpTicketMenu;