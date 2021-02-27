import React, { useState } from 'react';

import { View, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { AppDropDown, AppText } from '../..';

function GenderMenu({ onSelectGender }) {
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

    const Genders = [
        {
            id: 1,
            gender: "Men"
        },
        {
            id: 2,
            gender: "Women"
        }
    ];

    const [selectedGender, setSelectedGender] = useState(Genders[1]);

    const onSelectMenu = (genderItem) => {
        onSelectGender(genderItem);
        setSelectedGender(genderItem);
        hideMenu();
    }

    return (
        <Menu
            ref={setMenuRef}
            style={{ width: '89%', marginTop: 100 }}
            button={<AppDropDown
                title={"I'm looking for"}
                value={selectedGender.gender}
                onPress={showMenu} />}
        >
            {Genders.map((genderItem, genderIndex) => {
                return <MenuItem
                    key={String(genderIndex)}
                    onPress={() => onSelectMenu(genderItem)}>
                    <AppText type={selectedGender.id == genderItem.id ? 'bold' : 'medium'}>{genderItem.gender}</AppText>
                </MenuItem>
            })}
        </Menu>
    );
}

export default GenderMenu;