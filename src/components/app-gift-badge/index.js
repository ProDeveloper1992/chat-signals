import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import * as Animatable from 'react-native-animatable';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { AppText } from '..';
import { Colors } from '../../constants';
import { GiftBoxIcon } from '../../constants/svg-icons';
import { openGiftBox, getCustomerProfileDetail } from '../../redux/actions/user-actions';
import { getRemainingTime } from '../../utils/common';

export default function AppGiftBadge() {

    const dispatch = useDispatch();

    const { userData } = useSelector((state) => state.userState);
    const { appLabels } = useSelector((state) => state.appState);

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
        dispatch(getCustomerProfileDetail());
    }

    if (userData && userData.last_date_bonus_card) {

        if (getRemainingTime(userData.last_date_bonus_card, new Date()) <= 0) {
            return (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onBadgePress}
                    style={styles.container(isOpened)}>
                    <Animatable.View
                        iterationCount={'infinite'}
                        animation={'swing'}
                        direction={'alternate'}
                        useNativeDriver={true}
                        style={{ paddingHorizontal: wp(3), paddingVertical: wp(3) }}>
                        <GiftBoxIcon width={wp(9)} height={wp(9)} />
                    </Animatable.View>
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
                                            size={wp(4)}
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
                <Animatable.View
                    iterationCount={'infinite'}
                    animation={'swing'}
                    direction={'alternate'}
                    useNativeDriver={true}
                    style={{ paddingHorizontal: wp(3), paddingVertical: wp(3) }}>
                    <GiftBoxIcon width={wp(9)} height={wp(9)} />
                </Animatable.View>
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
                                        size={wp(4)}
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
            borderTopRightRadius: wp(3),
            borderBottomRightRadius: wp(3),
            backgroundColor: Colors.white,
            shadowColor: Colors.black,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 8,
            borderColor: Colors.ui_primary
        }
    },
    baseTop: {
        marginStart: wp(2.5),
        borderRightWidth: wp(3.5),
        borderRightColor: Colors.ui_primary,
        borderBottomWidth: wp(7),
        borderBottomColor: "transparent",
        borderTopWidth: wp(7),
        borderTopColor: "transparent",
        height: '100%',
        width: 0,
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