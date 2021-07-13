import React, { useState } from 'react';
import { StyleSheet, TextInput, ScrollView, View, TouchableOpacity, SafeAreaView, Keyboard, ActivityIndicator, FlatList, Image, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Colors, DEFAULT_AVATAR_URL, DEFAULT_IMAGE_URL, Icons, IMAGE_BASE_URL } from '../../constants';
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
import { getGeneralSettingValueByName } from '../../utils/common';
import CommonImage from '../app-common-image';

export function ChatInput({
    style,
    value,
    onChangeMessage,
    onSendPress,
    onSendItem,
    isAttachingDocument,
    attachedDocument,
    onAttachDocument,
    isStickerOpen,
    ...props }) {

    const { userData, stickersList } = useSelector((state) => state.userState);
    const { appLabels, generalSettings } = useSelector((state) => state.appState);

    const [stickersVisible, setStickersVisible] = useState(isStickerOpen ? isStickerOpen : false);
    const [minimumMessageCount, setMinimumMessageCount] = useState(0);
    const [maximumMessageCount, setMaximumMessageCount] = useState(6);

    const onSendItemPress = async (type) => {
        if (Platform.OS == 'ios') {
            await Keyboard.dismiss();
            setTimeout(() => {
                onSendItem(type);
            }, 500);
        } else {
            onSendItem(type);
        }
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
            onAttachDocument(res);
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
        onAttachDocument(null);
    }

    const onSendIconPress = () => {
        onSendPress(attachedDocument);
        setMinimumMessageCount(0);
    }

    const onStickerIconPress = () => {
        setStickersVisible(!stickersVisible);
    }

    const onStickerPress = (stickerItem) => {
        onSendItem('sticker', stickerItem);
    }

    const renderAttachedDocument = () => {
        switch (attachedDocument.type) {
            case "image/jpeg":
                return (
                    <FastImage
                        style={{ width: '100%', height: '100%', borderRadius: 5 }}
                        source={{
                            uri: attachedDocument.uri,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                )
            case "video/mp4":
                return (
                    <FastImage
                        style={{ width: '100%', height: '100%', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                        source={{
                            uri: attachedDocument.uri,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    >
                        <VideoIcon width={30} height={30} fill={Colors.white} />
                    </FastImage>
                )
            case "application/vnd.android.package-archive":
                return (
                    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.ui_primary_10, borderRadius: 5 }}>
                        <AppText>{".apk"}</AppText>
                    </View>
                )
        }
    }

    const onChangeInputText = (text) => {
        onChangeMessage(text);
        if (text.length == 0) {
            setMinimumMessageCount(0);
        }
        if (text.length > 0 && text.length <= (getGeneralSettingValueByName('charecters_billed'))) {
            setMinimumMessageCount(1);
        }
        for (let i = 0; i < maximumMessageCount; i++) {
            if (text.length > 0 && text.length > (getGeneralSettingValueByName('charecters_billed') * i)) {
                setMinimumMessageCount(i + 1);
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: wp(3) }}>
                <View style={{ marginTop: wp(4) }}>
                    <View style={styles.topHorizontal}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <IconWithValue
                                icon={<EmailIcon width={wp(3)} height={wp(3)} />}
                                minimumValue={minimumMessageCount}
                                maximumValue={maximumMessageCount}
                            />
                            <IconWithValue
                                icon={<AppText type={'bold'} size={wp(2.5)}>{"Aa"}</AppText>}
                                minimumValue={value.length}
                                maximumValue={getGeneralSettingValueByName('charecters_billed') * maximumMessageCount}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            {userData && (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ marginBottom: -5, marginStart: -15 }}>
                                        <CoinGradientIcon width={wp(5)} height={wp(5)} />
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <AppText type={'bold'} size={wp(2)}>{userData.credit}</AppText>
                                        <AppText type={'regular'} size={wp(2)}>{` ${appLabels.Coins}`}</AppText>
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
                            {isAttachingDocument ? (
                                <View style={{ flexDirection: 'row', alignItems: "center", marginStart: 20 }}>
                                    <ActivityIndicator color={Colors.ui_primary} size={'small'} />
                                    <AppText style={{ flex: 1, marginHorizontal: 20 }}>{"Uploading..."}</AppText>
                                </View>
                            ) : <AppText style={{ flex: 1, marginHorizontal: 20 }} size={wp(2.5)}>{attachedDocument.name}</AppText>}
                        </View>
                    )}
                    <View style={styles.inputContainer}>
                        {/* <TouchableOpacity onPress={onAttachIconPress}>
                        <AttachIcon width={24} height={24} />
                    </TouchableOpacity> */}
                        <TextInput
                            {...props}
                            style={[
                                styles.input,
                                style
                            ]}
                            value={value}
                            placeholderTextColor={'darkgray'}
                            autoCapitalize={'none'}
                            maxLength={getGeneralSettingValueByName('charecters_billed') * maximumMessageCount}
                            onChangeText={onChangeInputText}
                            returnKeyType={'send'}
                            onSubmitEditing={onSendIconPress}
                        />
                        <TouchableOpacity activeOpacity={0.8} style={styles.sendIconContainer} onPress={onSendIconPress}>
                            <SendMessageIcon width={wp(3)} height={wp(3)} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <TouchableIcon
                        icon={<StickerGradientIcon32 />}
                        onPress={() => onStickerIconPress()}
                    // onPress={() => onSendItemPress('sticker')}
                    />
                    <TouchableIcon
                        icon={<KissGradientIcon32 />}
                        onPress={() => onSendItemPress('kiss')} />
                    <TouchableIcon
                        icon={<LikeGradientIcon32 />}
                        onPress={() => onSendItemPress('like')} />
                    <TouchableIcon
                        icon={<HeartGradientIcon32 />}
                        onPress={() => onSendItemPress('heart')} />
                    {getGeneralSettingValueByName('prices_message') > 0 && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 15 }}>
                            <AppText size={wp(2)}>{`${appLabels.send_message_for} `}</AppText>
                            <AppText size={wp(2)} type={'bold'}>{`${minimumMessageCount > 0 ? minimumMessageCount * getGeneralSettingValueByName('prices_message') : getGeneralSettingValueByName('prices_message')} ${appLabels.Coins}`}</AppText>
                        </View>
                    )}
                </View>

                {stickersVisible && (
                    <View>
                        <ScrollView
                            horizontal
                        // showsHorizontalScrollIndicator={false}
                        >
                            <View>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {stickersList.length
                                        ? stickersList.map((item, i) => {
                                            if (i % 2 == 0) {
                                                return null;
                                            }
                                            return (
                                                <TouchableOpacity
                                                    key={String(i)}
                                                    onPress={() => onStickerPress(item)}>
                                                    <Image
                                                        source={{ uri: IMAGE_BASE_URL + item.picture }}
                                                        style={styles.stickerImage}
                                                        borderRadius={10} />
                                                </TouchableOpacity>
                                            );
                                        })
                                        : null}
                                </View>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {stickersList.length
                                        ? stickersList.map((item, i) => {
                                            if (i % 2 != 0) {
                                                return null;
                                            }
                                            return (
                                                <TouchableOpacity
                                                    key={String(i)}
                                                    onPress={() => onStickerPress(item)}>
                                                    <Image
                                                        source={{ uri: IMAGE_BASE_URL + item.picture }}
                                                        style={styles.stickerImage}
                                                        borderRadius={10} />
                                                </TouchableOpacity>
                                            );
                                        })
                                        : null}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const IconWithValue = ({ icon, minimumValue, maximumValue }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 20 }}>
            {icon}
            <AppText color={Colors.greydark} size={wp(2)} style={{ marginStart: 5 }}>{`${minimumValue}/${maximumValue}`}</AppText>
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
        elevation: 4,
    },
    input: {
        flex: 1,
        paddingStart: wp(2),
        paddingVertical: wp(2),
        color: Colors.black,
        fontSize: wp(2.5),
        fontFamily: 'Poppins-Regular',
        textDecorationLine: 'none',
    },
    errorText: {
        textAlign: 'right',
    },
    sendIconContainer: {
        width: wp(5),
        height: wp(5),
        borderRadius: wp(5) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.ui_primary,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 5 },
        // shadowOpacity: 0.3,
        // shadowRadius: 10,
        // elevation: 4,
    },
    stickerImage: {
        width: hp(8),
        height: hp(8),
        resizeMode: 'contain',
        marginEnd: hp(1),
        marginVertical: hp(0.5),
        borderRadius: 10,
        backgroundColor: Colors.ui_primary_10,
    }
});
