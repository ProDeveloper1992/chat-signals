import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants';

export default function AppIndicatorLoader() {
    return <View style={styles.container}>
        <ActivityIndicator size={'large'} color={Colors.ui_primary} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
