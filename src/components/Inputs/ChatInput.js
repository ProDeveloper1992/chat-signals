import React, { useState } from 'react';
import { StyleSheet, TextInput, ScrollView, View, TouchableOpacity, SafeAreaView, Keyboard, ActivityIndicator, FlatList, Image, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { Colors, DEFAULT_AVATAR_URL, DEFAULT_IMAGE_URL, Icons } from '../../constants';
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

    const { userData } = useSelector((state) => state.userState);
    const { appLabels, generalSettings } = useSelector((state) => state.appState);

    const [stickersVisible, setStickersVisible] = useState(isStickerOpen ? isStickerOpen : false);

    const stickers = [
        { url: 'https://dotbadges.com/wp-content/uploads/2021/05/Stickerview1-106.webp' },
        { url: 'https://www.redwolf.in/image/cache/catalog/stickers/panda-dab-sticker-india-700x700.jpg' },
        { url: 'https://dejpknyizje2n.cloudfront.net/svgcustom/clipart/preview/cute-in-love-emoji-sticker-29759-300x300.png' },
        { url: 'https://cdn3.louis.de/dynamic/articles/o_resize,w_1800,h_1800,m_limit,c_fff/4f.71.a3.10011122580FR10.JPG' },
        { url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/wsb-sticker-pack/tray_large.png?8a7edbeb9fafbd3c484b5d6a75a32a2c' },
        { url: 'https://dotbadges.com/wp-content/uploads/2021/05/Stickerview1-152.webp' },
        { url: 'https://img.stickers.cloud/packs/de2ee9d5-6531-4f6b-9d29-91e49d5f30da/webp/95483d0d-6d5d-4e16-b64d-3f2bcb3a42ef.webp' },
        { url: 'https://n4.sdlcdn.com/imgs/j/p/z/Wallmatrix-Love-Sticker-50-x-SDL353097998-1-ff632.jpg' },
        { url: 'https://play-lh.googleusercontent.com/Bmr87CDbdYhXQmAf6fRRhWwilBErsR9oFv01rGWiop3WxV8N3FkOjB9aW9nrMAQNW44' },
        { url: 'https://images-eu.ssl-images-amazon.com/images/I/41Sb0GIl8JL.png' },
        { url: 'https://images-na.ssl-images-amazon.com/images/I/81zN7E4NA6L.png' },
        { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyz7Nj5uRq2Pko8XjFnIjhO_1_k-wGqbFIbQ&usqp=CAU' },
        { url: 'https://i0.wp.com/toppng.com/public/uploads/preview/heart-with-wings-vinyl-die-cut-sticker-love-sticker-heart-11563075313i5oqy943yt.png' },
        { url: 'https://img.stickers.cloud/packs/37ce9821-9a5f-437b-8d41-edcc8cf1fef3/webp/7bc50cd1-eaf7-4eb4-9c4d-a48c70b36d65.webp' },
    ]

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

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginHorizontal: 15, marginTop: 15 }}>
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
                        {isAttachingDocument ? (
                            <View style={{ flexDirection: 'row', alignItems: "center", marginStart: 20 }}>
                                <ActivityIndicator color={Colors.ui_primary} size={'small'} />
                                <AppText style={{ flex: 1, marginHorizontal: 20 }}>{"Uploading..."}</AppText>
                            </View>
                        ) : <AppText style={{ flex: 1, marginHorizontal: 20 }}>{attachedDocument.name}</AppText>}
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
                        maxLength={250}
                        onChangeText={onChangeMessage}
                        returnKeyType={'send'}
                    />
                    <TouchableOpacity activeOpacity={0.8} style={styles.sendIconContainer} onPress={onSendIconPress}>
                        <SendMessageIcon width={24} height={24} />
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
                        <AppText size={12}>{`${appLabels.send_message_for} `}</AppText>
                        <AppText size={12} type={'bold'}>{`${getGeneralSettingValueByName('prices_message')} ${appLabels.Coins}`}</AppText>
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
                                {stickers.length
                                    ? stickers.map((item, i) => {
                                        if (i % 2 == 0) {
                                            return null;
                                        }
                                        return (
                                            <TouchableOpacity key={String(i)} onPress={() => onStickerPress(item)}>
                                                <Image style={styles.stickerImage} source={{ uri: item.url }} />
                                            </TouchableOpacity>
                                        );
                                    })
                                    : null}
                            </View>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {stickers.length
                                    ? stickers.map((item, i) => {
                                        if (i % 2 != 0) {
                                            return null;
                                        }
                                        return (
                                            <TouchableOpacity key={String(i)} onPress={() => onStickerPress(item)}>
                                                <Image style={styles.stickerImage} source={{ uri: item.url }} />
                                            </TouchableOpacity>
                                        );
                                    })
                                    : null}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )}
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
    },
    stickerImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginEnd: 10,
        marginVertical: 10,
        borderRadius: 10
    }
});
