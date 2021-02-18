import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppText } from '..';
import { Colors } from '../../constants';
import { DropDownIcon, DropUpIcon } from '../../constants/svg-icons';

export default function AppDropDown({ title, value }) {

    const [isOpened, setIsOpened] = useState(false);

    return (
        <View style={{ marginVertical: 5 }}>
            {title && (
                <AppText color={Colors.black} style={{ paddingBottom: 5, paddingTop: 5 }}>{title}</AppText>
            )}
            <TouchableOpacity
                style={styles.container}
            >
                <AppText type={'bold'} size={16} style={styles.value}>{value}</AppText>
                {isOpened ? (
                    <DropUpIcon width={15} height={15} />
                ) : (
                        <DropDownIcon width={15} height={15} />
                    )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.grey,
    },
    value: {
        flex: 1,
    }
})