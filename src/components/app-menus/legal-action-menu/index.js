import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity, Platform } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import PropTypes from 'prop-types';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


import { AppText } from '../..';
import { UnfriendIcon, BlockIcon, ThreeDotsIcon, CloseBlackIcon } from '../../../constants/svg-icons';
import { Colors } from '../../../constants';

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

    const [isVisible, setIsVisible] = useState(false);

    const { appLabels } = useSelector(state => state.appState);

    const onSelectMenu = (option) => {
        onSelectAction(option);
        hideMenu();
    }

    return (
        <Menu
            ref={setMenuRef}
            onHidden={() => setIsVisible(false)}
            style={{ marginTop: hp(5), borderRadius: hp(2) }}
            button={
                <View>
                    {isVisible ? (
                        <TouchableOpacity
                            onPress={async () => {
                                await hideMenu();
                                setIsVisible(false);
                            }} style={{ padding: hp(2), paddingHorizontal: hp(2.2) }}>
                            <CloseBlackIcon />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={async () => {
                                await showMenu();
                                setIsVisible(true);
                            }}
                            style={{ padding: hp(2) }}>
                            <ThreeDotsIcon />
                        </TouchableOpacity>
                    )}
                </View>
            }
        >
            {actions && actions.map((option, optionIndex) => {
                return <View key={String(optionIndex)}>
                    <MenuItem
                        onPress={() => onSelectMenu(option)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingStart: Platform.OS == 'ios' ? hp(2) : 0 }}>
                            {option.icon}
                            <AppText type={'medium'} size={hp(2.3)} style={{ marginStart: hp(1.5) }}>{option.title}</AppText>
                        </View>
                    </MenuItem>
                    {optionIndex != actions.length - 1 && (
                        <View style={{ height: 1, backgroundColor: Colors.grey }} />
                    )}
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