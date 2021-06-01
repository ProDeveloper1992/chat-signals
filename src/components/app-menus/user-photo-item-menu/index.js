import React, { useState } from 'react';

import { View, TouchableOpacity, Platform } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import { useSelector } from 'react-redux';
import { AppText } from '../..';
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

    const { appLabels } = useSelector((state) => state.appState);

    const Options = [
        {
            type: 'set_profile',
            title: "Set as profile photo",
        },
        {
            type: 'erotic',
            title: appLabels.erotic_image,
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

    const [isVisible, setIsVisible] = useState(false);

    const onSelectMenu = (option) => {
        onSelectOption(option);
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
                        <View style={{ height: 1, backgroundColor: Colors.grey }} />
                    )}
                </View>
            })}
        </Menu>
    );
}

export default UserPhotoItemMenu;