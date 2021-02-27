import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { AppText } from '..';
import { Colors } from '../../constants';
import { GiftBoxIcon } from '../../constants/svg-icons';
import { toggleCoinsEarningModal } from '../../redux/actions/app-modals-actions';

export default function AppGiftBadge() {

    const dispatch = useDispatch();

    const [isOpened, setIsOpened] = useState(false);

    const onBadgePress = () => {
        setIsOpened(!isOpened);
    }

    const onOpenCoinsEarningModal = () => {
        dispatch(toggleCoinsEarningModal(true));
        setIsOpened(false)
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onBadgePress}
            style={styles.container(isOpened)}>
            <GiftBoxIcon width={35} height={35} />
            {isOpened && (
                <AppText
                    type={'bold'}
                    size={16}
                    onPress={onOpenCoinsEarningModal}
                    style={{ marginStart: 5 }}
                    color={Colors.ui_primary}>{"Open Now!"}</AppText>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: function (isOpened) {
        return {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            backgroundColor: Colors.white,
            shadowColor: Colors.black,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 8,
            borderEndWidth: isOpened ? 10 : 0,
            borderColor: Colors.ui_primary
        }
    },
    value: {
        flex: 1,
    }
})