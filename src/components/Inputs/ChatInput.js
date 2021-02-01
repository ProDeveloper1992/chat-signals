import React from 'react';
import { StyleSheet, TextInput, Platform, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, Icons } from '../../constants';
import { AppText } from '../../components';

export function ChatInput({ style, onSendPress, ...props }) {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <TextInput
                    {...props}
                    style={[
                        styles.input,
                        style
                    ]}
                    placeholderTextColor={'darkgray'}
                    autoCapitalize={'none'}
                />
                <TouchableOpacity activeOpacity={0.8} style={styles.sendIconContainer} onPress={onSendPress}>
                    <Image style={styles.sendIcon} source={Icons.send_icon} />
                </TouchableOpacity>
            </SafeAreaView>
            {/* <SafeAreaView style={{ backgroundColor: Colors.white }} /> */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        margin: 10,
        borderRadius: 48,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.1,
        shadowRadius: 14,
        elevation: 14,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        color: Colors.black,
    },
    errorText: {
        textAlign: 'right',
    },
    sendIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        tintColor: Colors.white,
        marginStart: 5
    },
    sendIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginEnd: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.ui_primary,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 4,
    }
});
