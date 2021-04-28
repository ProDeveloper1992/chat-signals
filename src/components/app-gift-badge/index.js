import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CountDown from 'react-native-countdown-component';

import { AppText } from '..';
import { Colors } from '../../constants';
import { GiftBoxIcon } from '../../constants/svg-icons';
import { openGiftBox, userProfileDetail } from '../../redux/actions/user-actions';
import { getRemainingTime } from '../../utils/common';

export default function AppGiftBadge() {

    const dispatch = useDispatch();

    const { userData } = useSelector((state) => state.userState);

    const [isOpened, setIsOpened] = useState(false);
    const [loading, setLoading] = useState(false);

    const onBadgePress = () => {
        setIsOpened(!isOpened);
    }

    const onOpenGiftBox = async () => {
        setLoading(true);
        await dispatch(openGiftBox());
        setLoading(false);
        setIsOpened(false);
    }

    const onFinishTimer = () => {
        dispatch(userProfileDetail());
    }

    if (userData && userData.last_date_bonus_card) {

        if (getRemainingTime(userData.last_date_bonus_card, new Date()) <= 0) {
            return (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onBadgePress}
                    style={styles.container(isOpened)}>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
                        <GiftBoxIcon width={35} height={35} />
                    </View>
                    {isOpened && (
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                {/* {getRemainingTime(userData.last_date_bonus_card, new Date()) <= 0 ? ( */}
                                <View>
                                    {loading ? (
                                        <ActivityIndicator
                                            size={'small'}
                                            color={Colors.ui_primary} />) : (
                                        <AppText
                                            type={'bold'}
                                            size={14}
                                            onPress={onOpenGiftBox}
                                            style={{ marginStart: 5 }}
                                            color={Colors.ui_primary}>{"Open Now!"}</AppText>
                                    )}
                                </View>
                                {/* ) : (
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
                            )} */}
                            </View>
                        </View>
                    )}
                    {isOpened && (
                        <>
                            <View style={styles.baseTop} />
                            <View style={styles.baseRight} />
                        </>
                    )}
                </TouchableOpacity>
            );
        }
        return <View />;
    }

    if (userData && userData.last_date_bonus_card == null) {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={onBadgePress}
                style={styles.container(isOpened)}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
                    <GiftBoxIcon width={35} height={35} />
                </View>
                {isOpened && (
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <View>
                                {loading ? (
                                    <ActivityIndicator
                                        size={'small'}
                                        color={Colors.ui_primary} />) : (
                                    <AppText
                                        type={'bold'}
                                        size={14}
                                        onPress={onOpenGiftBox}
                                        style={{ marginStart: 5 }}
                                        color={Colors.ui_primary}>{"Open Now!"}</AppText>
                                )}
                            </View>
                        </View>
                    </View>
                )}
                {isOpened && (
                    <>
                        <View style={styles.baseTop} />
                        <View style={styles.baseRight} />
                    </>
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
            // paddingVertical: 5,
            // paddingStart: 10,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            backgroundColor: Colors.white,
            shadowColor: Colors.black,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 8,
            // borderEndWidth: isOpened ? 10 : 0,
            borderColor: Colors.ui_primary
        }
    },
    baseTop: {
        marginStart: 10,
        borderRightWidth: 15,
        borderRightColor: Colors.ui_primary,
        borderBottomWidth: 25,
        borderBottomColor: "transparent",
        borderTopWidth: 25,
        borderTopColor: "transparent",
        height: '100%',
        width: 0,
        // left: 0,
        // top: -35,
        // position: "absolute",
    },
    baseRight: {
        width: 10,
        height: '100%',
        backgroundColor: Colors.ui_primary,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    value: {
        flex: 1,
    }
})