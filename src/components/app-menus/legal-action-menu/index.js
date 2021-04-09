import React, { useState } from 'react';

import { View, TouchableOpacity, Platform } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import PropTypes from 'prop-types';

import { AppText } from '../..';
import { DotsCircleIcon, UnfriendIcon, BlockIcon } from '../../../constants/svg-icons';

function LegalActionMenu({ onSelectAction, actions }) {
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

    const onSelectMenu = (option) => {
        onSelectAction(option);
        hideMenu();
    }

    return (
        <Menu
            ref={setMenuRef}
            style={{ marginTop: 30 }}
            button={
                <TouchableOpacity onPress={showMenu}>
                    <DotsCircleIcon />
                </TouchableOpacity>
            }
        >
            {actions && actions.map((option, optionIndex) => {
                return <View key={String(optionIndex)}>
                    <MenuItem
                        onPress={() => onSelectMenu(option)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingStart: Platform.OS == 'ios' ? 10 : 0 }}>
                            {option.icon}
                            <AppText type={'medium'} style={{ marginStart: 5 }}>{option.title}</AppText>
                        </View>
                    </MenuItem>
                    <MenuDivider />
                </View>
            })}
        </Menu>
    );
}

export default LegalActionMenu;

LegalActionMenu.propTypes = {
    onSelectAction: PropTypes.func,
    actions: PropTypes.array,
};

LegalActionMenu.defaultProps = {
    actions: [
        {
            id: 1,
            title: "Report",
            icon: <UnfriendIcon />
        },
        {
            id: 2,
            title: "Block",
            icon: <BlockIcon />
        }
    ],
    onSelectAction: () => { },
};