import React, { useState } from 'react';

import { View, Text, TouchableOpacity, Platform } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { AppDropDown, AppText } from '../..';
import { DotsCircleIcon, UnfriendIcon, BlockIcon } from '../../../constants/svg-icons';

function FriendItemMenu({ onSelectOption }) {
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

    const Options = [
        {
            id: 1,
            title: "Unfriend",
            icon: <UnfriendIcon />
        },
        {
            id: 2,
            title: "Block",
            icon: <BlockIcon />
        }
    ];

    const [selectedOption, setSelectedOption] = useState(Options[1]);

    const onSelectMenu = (option) => {
        onSelectOption(option);
        setSelectedOption(option);
        hideMenu();
    }

    return (
        <Menu
            ref={setMenuRef}
            style={{ marginTop: 50 }}
            button={
                <TouchableOpacity onPress={showMenu} style={{ paddingTop: 20 }}>
                    <DotsCircleIcon />
                </TouchableOpacity>
            }
        >
            {Options.map((option, optionIndex) => {
                return <MenuItem
                    key={String(optionIndex)}
                    onPress={() => onSelectMenu(option)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingStart: Platform.OS == 'ios' ? 10 : 0 }}>
                        {option.icon}
                        <AppText type={'medium'} style={{ marginStart: 5 }}>{option.title}</AppText>
                    </View>
                </MenuItem>
            })}
        </Menu>
    );
}

export default FriendItemMenu;