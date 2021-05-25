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
            type: 'set_profile',
            title: "Set as profile photo",
        },
        {
            type: 'erotic',
            title: "Erotic photo",
        },
        {
            type: 'private',
            title: "Private photo",
        },
        {
            type: 'delete',
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
            style={{ marginTop: 30, borderRadius: 11 }}
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
                    {optionIndex != Options.length - 1 && (
                        // <MenuDivider color={Colors.grey} />
                        <View style={{ height: 1, backgroundColor: Colors.grey }} />
                    )}
                </View>
            })}
        </Menu>
    );
}

export default UserPhotoItemMenu;