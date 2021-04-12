import React, { useState } from 'react';
import { StyleSheet, TextInput, Platform, View, TouchableOpacity, SafeAreaView, Keyboard, Image, ImageBackground } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { useSelector } from 'react-redux';

import { Colors, Icons } from '../../constants';
import { AppText } from '../../components';
import {
    SendMessageIcon,
    AttachIcon,
    EmailIcon,
    StickerGradientIcon32,
    KissGradientIcon32,
    HeartGradientIcon32,
    LikeGradientIcon32,
    CoinGradientIcon,
    CloseIcon,
    CloseWhiteTransparentIcon,
    VideoIcon
} from '../../constants/svg-icons';

export function ChatInput({ style, value, onChangeMessage, onSendPress, onSendItem, ...props }) {

    const { userData } = useSelector((state) => state.userState);
    const { appLabels, generalSettings } = useSelector((state) => state.appState);

    const [attachedDocument, setAttachedDocument] = useState(null);

    const getMessagePrice = () => {
        if (generalSettings.length > 0) {
            let message_price = 0;
            for (let setting of generalSettings) {
                if (setting.name === 'prices_message') {
                    message_price = setting.value * 1;
                }
            }
            return message_price;
        } else {
            return 0;
        }
    }

    const onSendItemPress = async (type) => {
        await Keyboard.dismiss();
        setTimeout(() => {
            onSendItem(type);
        }, 500);
    }

    const onAttachIconPress = async () => {
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res.uri);
            console.log('Type : ' + res.type);
            console.log('File Name : ' + res.name);
            console.log('File Size : ' + res.size);
            //Setting the state to show single file attributes
            setAttachedDocument(res);
        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
            } else {
                //For Unknown Error
            }
        }
    };

    const onCloseIconPress = () => {
        setAttachedDocument(null);
    }

    const onSendIconPress = () => {
        onSendPress(attachedDocument);
        setAttachedDocument(null);
    }

    const renderAttachedDocument = () => {
        switch (attachedDocument.type) {
            case "image/jpeg":
                return (<Image style={{ width: '100%', height: '100%', borderRadius: 5 }} source={{ uri: attachedDocument.uri }} />)
            case "video/mp4":
                return (
                    <ImageBackground style={{ width: '100%', height: '100%', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }} source={{ uri: attachedDocument.uri }}>
                        <VideoIcon width={30} height={30} fill={Colors.white} />
                    </ImageBackground>
                )
            case "application/vnd.android.package-archive":
                return (
                    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.ui_primary_10, borderRadius: 5 }}>
                        <AppText>{".apk"}</AppText>
                    </View>
                )
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ margin: 14 }}>
                <View style={styles.topHorizontal}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <IconWithValue
                            icon={<EmailIcon width={18} height={18} />}
                            minimumValue={0}
                            maximumValue={6}
                        />
                        <IconWithValue
                            icon={<AppText type={'bold'} size={16}>{"Aa"}</AppText>}
                            minimumValue={value.length}
                            maximumValue={250}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        {userData && (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ marginBottom: -5, marginStart: -15 }}>
                                    <CoinGradientIcon width={40} height={40} />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <AppText type={'bold'} size={14}>{userData.credit}</AppText>
                                    <AppText type={'regular'} size={14}>{` ${appLabels.Coins}`}</AppText>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
                {attachedDocument && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ height: 80, width: 80, backgroundColor: Colors.grey, borderRadius: 5, marginBottom: 10 }}>
                            <TouchableOpacity onPress={onCloseIconPress} style={{ position: 'absolute', top: -5, right: -5, overflow: 'hidden', zIndex: 1000 }}>
                                <CloseWhiteTransparentIcon width={20} height={20} fill={Colors.black} />
                            </TouchableOpacity>
                            {renderAttachedDocument()}
                        </View>
                        <AppText style={{ flex: 1, marginHorizontal: 20 }}>{attachedDocument.name}</AppText>
                    </View>
                )}
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={onAttachIconPress}>
                        <AttachIcon width={24} height={24} />
                    </TouchableOpacity>
                    <TextInput
                        {...props}
                        style={[
                            styles.input,
                            style
                        ]}
                        value={value}
                        placeholderTextColor={'darkgray'}
                        autoCapitalize={'none'}
                        maxLength={250}
                        onChangeText={onChangeMessage}
                        returnKeyType={'send'}
                    />
                    <TouchableOpacity activeOpacity={0.8} style={styles.sendIconContainer} onPress={onSendIconPress}>
                        <SendMessageIcon width={24} height={24} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <TouchableIcon
                        icon={<StickerGradientIcon32 />}
                        onPress={() => onSendItemPress('sticker')} />
                    <TouchableIcon
                        icon={<KissGradientIcon32 />}
                        onPress={() => onSendItemPress('kiss')} />
                    <TouchableIcon
                        icon={<LikeGradientIcon32 />}
                        onPress={() => onSendItemPress('like')} />
                    <TouchableIcon
                        icon={<HeartGradientIcon32 />}
                        onPress={() => onSendItemPress('heart')} />
                    {getMessagePrice() > 0 && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 15 }}>
                            <AppText size={12}>{`Send message for `}</AppText>
                            <AppText size={12} type={'bold'}>{`${getMessagePrice()} ${appLabels.Coins}`}</AppText>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const IconWithValue = ({ icon, minimumValue, maximumValue }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 20 }}>
            {icon}
            <AppText color={Colors.greydark} style={{ marginStart: 5 }}>{`${minimumValue}/${maximumValue}`}</AppText>
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
        // borderWidth: 1,
        // borderColor: Colors.grey
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 200,
    },
    input: {
        flex: 1,
        paddingStart: 10,
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
