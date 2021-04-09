import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { AppText } from '..';
import { Colors } from '../../constants';
import { CalenderIcon } from '../../constants/svg-icons';

export default function DatePicker({ title, value, error, onChangeDate }) {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let formatedDate = moment(date).format('DD/MM/YYYY')
        onChangeDate(formatedDate);
        hideDatePicker();
    };

    return (
        <View style={{ marginVertical: 5 }}>
            {title && (
                <AppText color={error ? Colors.ui_error : Colors.black} style={{ paddingBottom: 5, paddingTop: 5 }}>{title}</AppText>
            )}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={showDatePicker}
                style={[styles.container, { borderColor: error ? Colors.ui_error : Colors.grey }]}
            >
                <CalenderIcon width={24} height={24} />
                <View style={{ padding: 15 }}>
                    <AppText>{value != null ? value : "Select date"}</AppText>
                </View>
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
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date()}
            />
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