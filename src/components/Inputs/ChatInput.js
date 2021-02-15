import React, { useState } from 'react';
import { StyleSheet, TextInput, Platform, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, Icons } from '../../constants';
import { AppText } from '../../components';
import {
    SendMessageIcon,
    AttachIcon,
    EmailIcon,
    StickerGradientIcon32,
    KissGradientIcon32,
    HeartGradientIcon32,
    LikeGradientIcon32
} from '../../constants/svg-icons';
import { useSelector } from 'react-redux';

export function ChatInput({ style, onSendPress, ...props }) {

    const [messageText, setMessageText] = useState('');

    const { userData } = useSelector((state) => state.userState);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ margin: 14 }}>
                <View style={styles.topHorizontal}>
                    <IconWithValue
                        icon={<EmailIcon width={18} height={18} />}
                        minimumValue={0}
                        maximumValue={6}
                    />
                    <IconWithValue
                        icon={<AppText type={'bold'} size={17}>{"Aa"}</AppText>}
                        minimumValue={messageText.length}
                        maximumValue={250}
                    />
                    {userData && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ marginBottom: -10, marginStart: -15 }}>
                                <StickerGradientIcon32 />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <AppText type={'bold'} size={15}>{userData.credit}</AppText>
                                <AppText type={'regular'} size={15}>{' Coins'}</AppText>
                            </View>
                        </View>
                    )}
                </View>
                <View style={styles.inputContainer}>
                    <AttachIcon width={24} height={24} />
                    <TextInput
                        {...props}
                        style={[
                            styles.input,
                            style
                        ]}
                        placeholderTextColor={'darkgray'}
                        autoCapitalize={'none'}
                        maxLength={250}
                        onChangeText={(text) => setMessageText(text)}
                    />
                    <TouchableOpacity activeOpacity={0.8} style={styles.sendIconContainer} onPress={onSendPress}>
                        <SendMessageIcon width={24} height={24} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <TouchableIcon
                        icon={<StickerGradientIcon32 />}
                        onPress={() => { }} />
                    <TouchableIcon
                        icon={<KissGradientIcon32 />}
                        onPress={() => { }} />
                    <TouchableIcon
                        icon={<LikeGradientIcon32 />}
                        onPress={() => { }} />
                    <TouchableIcon
                        icon={<HeartGradientIcon32 />}
                        onPress={() => { }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 15 }}>
                        <AppText size={12}>{`Send message for `}</AppText>
                        <AppText size={12} type={'bold'}>{`${8} coins`}</AppText>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const IconWithValue = ({ icon, minimumValue, maximumValue }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 20 }}>
            {icon}
            <AppText style={{ marginStart: 5 }}>{`${minimumValue}/${maximumValue}`}</AppText>
        </View>
    )
}

const TouchableIcon = ({ icon, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ marginBottom: -10, marginEnd: -15 }}>
            {icon}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        // paddingBottom: 30,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.1,
        shadowRadius: 14,
        elevation: 14,
    },
    topHorizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 5,
        marginTop: -25,
        marginBottom: -10
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 48,
        paddingEnd: 11,
        paddingStart: 18,
        borderWidth: 1,
        borderColor: Colors.grey
        // shadowColor: Colors.black,
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        // elevation: 2,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        color: Colors.black,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        textDecorationLine: 'none',
    },
    errorText: {
        textAlign: 'right',
    },
    sendIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.ui_primary,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 5 },
        // shadowOpacity: 0.3,
        // shadowRadius: 10,
        // elevation: 4,
    }
});
