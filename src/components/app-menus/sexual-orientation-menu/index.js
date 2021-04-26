import React, { useState } from 'react';

import { View, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { AppDropDown, AppText } from '../..';

function SexualOrientationMenu({ onSelectOrientation, label }) {
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

    const { sexualOrientations } = useSelector((state) => state.appState);
    const { userSexualOrientation } = useSelector((state) => state.userState);

    const [selectedOrientation, setSelectedOrientation] = useState({ id: -1, name: "Select Orientation" });

    const onSelectMenu = (orientation) => {
        onSelectOrientation(orientation);
        setSelectedOrientation(orientation);
        hideMenu();
    }

    return (
        <Menu
            ref={setMenuRef}
            style={{ width: '89%', marginTop: 100, borderRadius: 11 }}
            button={<AppDropDown
                title={label}
                value={selectedOrientation.name}
                onPress={showMenu} />}
        >
            {sexualOrientations.map((orientation, orientationIndex) => {
                return <View key={String(orientationIndex)}>
                    <MenuItem

                        onPress={() => onSelectMenu(orientation)}>
                        <AppText type={selectedOrientation.id == orientation.id ? 'bold' : 'medium'}>{orientation.name}</AppText>
                    </MenuItem>
                    {orientationIndex != sexualOrientations.length - 1 && (
                        <MenuDivider />
                    )}
                </View>
            })}
        </Menu>
    );
}

export default SexualOrientationMenu;

SexualOrientationMenu.propTypes = {
    label: PropTypes.string,
    onSelectOrientation: PropTypes.func,
};

SexualOrientationMenu.defaultProps = {
    label: "Sexual Orientation",
    onSelectOrientation: () => { },
};