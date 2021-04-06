import React, { useState } from 'react';

import { View, Text, TouchableOpacity, Platform } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { AppDropDown, AppText } from '../..';
import { Colors } from '../../../constants';
import { DotsCircleTransparentIcon, CloseWhiteTransparentIcon } from '../../../constants/svg-icons';

function UserPhotoItemMenu({ onSelectOption }) {
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
            title: "Set as profile photo",
        },
        {
            id: 2,
            title: "Delete photo",
        }
    ];

    const [selectedOption, setSelectedOption] = useState(Options[1]);
    const [isVisible, setIsVisible] = useState(false);

    const onSelectMenu = (option) => {
        onSelectOption(option);
        setSelectedOption(option);
        hideMenu();
    }

    return (
        <Menu
            ref={setMenuRef}
            onHidden={() => setIsVisible(false)}
            style={{ marginTop: 30 }}
            button={
                <View>
                    {isVisible ? (
                        <CloseWhiteTransparentIcon width={24} height={24} />
                    ) : (
                        <TouchableOpacity
                            // style={{ padding: 10 }}
                            onPress={async () => {
                                await showMenu();
                                setIsVisible(true);
                            }}>
                            <DotsCircleTransparentIcon width={24} height={24} />
                        </TouchableOpacity>
                    )}
                </View>
            }
        >
            {Options.map((option, optionIndex) => {
                return <View key={String(optionIndex)}>
                    <MenuItem
                        onPress={() => onSelectMenu(option)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingStart: Platform.OS == 'ios' ? 10 : 0 }}>
                            <AppText type={'medium'} style={{ marginStart: 5 }}>{option.title}</AppText>
                        </View>
                    </MenuItem>
                    <MenuDivider color={Colors.grey} />
                </View>
            })}
        </Menu>
    );
}

export default UserPhotoItemMenu;