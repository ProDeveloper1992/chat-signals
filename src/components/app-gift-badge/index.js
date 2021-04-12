import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CountDown from 'react-native-countdown-component';

import { AppText } from '..';
import { Colors } from '../../constants';
import { GiftBoxIcon } from '../../constants/svg-icons';
import { toggleCoinsEarningModal } from '../../redux/actions/app-modals-actions';
import { userProfileDetail } from '../../redux/actions/user-actions';
import { getRemainingTime } from '../../utils/common';

export default function AppGiftBadge() {

    const dispatch = useDispatch();

    const { userData } = useSelector((state) => state.userState);

    const [isOpened, setIsOpened] = useState(false);

    const onBadgePress = () => {
        setIsOpened(!isOpened);
    }

    const onOpenCoinsEarningModal = () => {
        dispatch(toggleCoinsEarningModal(true));
        setIsOpened(false)
    }

    const onFinishTimer = () => {
        dispatch(userProfileDetail());
    }

    if (userData && userData.last_date_bonus_card) {

        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={onBadgePress}
                style={styles.container(isOpened)}>
                <GiftBoxIcon width={35} height={35} />
                {isOpened && (
                    <View>
                        {getRemainingTime(userData.last_date_bonus_card, new Date()) <= 0 ? (
                            <AppText
                                type={'bold'}
                                size={14}
                                onPress={onOpenCoinsEarningModal}
                                style={{ marginStart: 5 }}
                                color={Colors.ui_primary}>{"Open Now!"}</AppText>
                        ) : (
                            <CountDown
                                until={getRemainingTime(userData.last_date_bonus_card, new Date())}
                                onFinish={onFinishTimer}
                                onPress={() => { }}
                                size={13}
                                digitStyle={{ backgroundColor: Colors.white }}
                                timeToShow={["H", "M", "S"]}
                                timeLabels={{ m: null, s: null }}
                                separatorStyle={{ color: Colors.black }}
                                showSeparator
                            />
                        )}
                    </View>
                )}
            </TouchableOpacity>
        );
    }
    return <View />;
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