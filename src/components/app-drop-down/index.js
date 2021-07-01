import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { AppText } from '..';
import { Colors } from '../../constants';
import { DropDownIcon, DropUpIcon } from '../../constants/svg-icons';

export default function AppDropDown({ title, value, onPress }) {

    const [isOpened, setIsOpened] = useState(false);

    return (
        <View style={{ marginVertical: 5 }}>
            {title && (
                <AppText size={hp(2.2)} color={Colors.black} style={{ paddingBottom: 5, paddingTop: 5 }}>{title}</AppText>
            )}
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.container}
                onPress={onPress}
            >
                <AppText type={'bold'} size={hp(2.2)} style={styles.value}>{value}</AppText>
                {isOpened ? (
                    <DropUpIcon width={hp(2)} height={hp(2)} />
                ) : (
                    <DropDownIcon width={hp(2)} height={hp(2)} />
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(2.3),
        paddingHorizontal: hp(3),
        borderWidth: 1,
        borderRadius: hp(2),
        borderColor: Colors.grey,
    },
    value: {
        flex: 1,
    }
})