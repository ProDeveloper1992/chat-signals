import React, { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import { AppText } from '..';
import { Colors } from '../../constants';
import { CalenderIcon } from '../../constants/svg-icons';

export default function DatePicker({ title, value, error, onChangeDate }) {

    const [birthDate, setBirthDate] = useState(value);

    const onChangeText = (text) => {
        setBirthDate(text);
        onChangeDate(text);
    }

    return (
        <View style={{ marginVertical: 5 }}>
            {title && (
                <AppText color={error ? Colors.ui_error : Colors.black} style={{ paddingBottom: 5, paddingTop: 5 }}>{title}</AppText>
            )}
            <View
                style={[styles.container, { borderColor: error ? Colors.ui_error : Colors.grey }]}
            >
                <CalenderIcon width={24} height={24} />
                {/* <AppText style={{ marginStart: 15 }} color={Colors.greydark}>{birthDate || "MM/DD/YYYY"}</AppText> */}
                <TextInputMask
                    style={{ width: '100%', marginStart: 10, paddingVertical: Platform.OS === 'ios' ? 15 : 0 }}
                    type={'datetime'}
                    options={{
                        format: 'MM/DD/YYYY'
                    }}
                    value={birthDate}
                    onChangeText={onChangeText}
                    placeholder={'MM/DD/YYYY'}
                />
            </View>
            {error && (
                <AppText
                    type={'regular'}
                    size={12}
                    color={Colors.ui_error}
                    style={styles.errorText}>
                    {error}
                </AppText>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.grey,
    },
    errorText: {
        textAlign: 'right',
    },
})