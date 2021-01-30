import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '..';
import { Colors } from '../../constants';
import { CalenderIcon } from '../../constants/svg-icons';

export default function DatePicker({ title, value, error }) {

    const [birthDate, setBirthDate] = useState(value);

    return (
        <View style={{ marginVertical: 5 }}>
            {title && (
                <AppText color={error ? Colors.ui_error : Colors.black}>{title}</AppText>
            )}
            <TouchableOpacity
                style={[styles.container, { borderColor: error ? Colors.ui_error : Colors.grey }]}
            >
                <CalenderIcon width={24} height={24} />
                <AppText style={{ marginStart: 15 }} color={Colors.greydark}>{birthDate || "MM/DD/YYYY"}</AppText>
            </TouchableOpacity>
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
        padding: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.grey,
    },
    errorText: {
        textAlign: 'right',
    },
})