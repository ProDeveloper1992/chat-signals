import React, { useState } from 'react';

import { View, Text, TouchableOpacity, Platform } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { useSelector } from 'react-redux';
import { AppDropDown, AppText } from '../..';
import { Colors } from '../../../constants';
import { ThreeDotsIcon, UnfriendIcon, BlockIcon, CloseBlackIcon } from '../../../constants/svg-icons';

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

    const { appLabels } = useSelector((state) => state.appState);

    const Options = [
        {
            id: 1,
            title: appLabels.unfriend,
            icon: <UnfriendIcon />
        },
        {
            id: 2,
            title: appLabels.block,
            icon: <BlockIcon />
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
                        <TouchableOpacity style={{ padding: 10 }}>
                            <CloseBlackIcon />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={{ padding: 10 }}
                            onPress={async () => {
                                await showMenu();
                                setIsVisible(true);
                            }}>
                            <ThreeDotsIcon />
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
                            {option.icon}
                            <AppText type={'medium'} style={{ marginStart: 5, marginEnd: 30 }}>{option.title}</AppText>
                        </View>
                    </MenuItem>
                    {optionIndex != Options.length - 1 && (
                        <View style={{ height: 1, backgroundColor: Colors.grey }} />
                    )}
                </View>
            })}
        </Menu>
    );
}

export default FriendItemMenu;