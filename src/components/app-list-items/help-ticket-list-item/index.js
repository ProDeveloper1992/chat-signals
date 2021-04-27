import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, DEFAULT_AVATAR_URL, Images } from '../../../constants';
import { AppText, CommonImage } from '../../index';
import styles from './style';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTicketResponse, sendUserTicketMessage } from '../../../redux/actions/user-actions';
import { DropDownIcon, DropUpIcon, SendMessageIcon } from '../../../constants/svg-icons';
import { getUserProfilePicture } from '../../../utils/common';

export default function HelpTicketListItem({ item, index }) {

    const dispatch = useDispatch();

    const { userData } = useSelector((state) => state.userState);

    const [conversation, setConversation] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        // console.log("HelpTicketListItem", item.message)
        // getTicketResponses();
    }, []);

    const getTicketResponses = async () => {
        setLoading(true);
        const response = await dispatch(getUserTicketResponse(item.id));
        setLoading(false);
        if (response.meta.status) {
            setConversation(response.data.reverse());
        }
    }

    const getStatus = () => {
        switch (item.status) {
            case "1":
                return "Open";
            case "2":
                return "Answered";
            default:
                return "Open";
        }
    }

    const getStatusColor = () => {
        switch (item.status) {
            case "1":
                return Colors.greydark;
            case "2":
                return Colors.green;
            default:
                return Colors.greydark;
        }
    }

    const onItemPress = () => {
        if (!isExpanded) {
            getTicketResponses();
        }
        setIsExpanded(!isExpanded);
    }

    const onSendIconPress = async () => {
        if (messageText != '') {
            setMessageText('');
            setLoading(true);
            const send_response = await dispatch(sendUserTicketMessage(item.id, messageText));
            if (send_response.meta.status) {
                getTicketResponses();
            }
        }
    }

    return (
        <View style={styles.container}>
            {index == 0 && (
                <View style={[styles.header, { borderBottomWidth: 0.5, borderColor: Colors.grey }]}>
                    <View style={{ flex: 0.8 }}>
                        <AppText type={'bold'}>{"Subject"}</AppText>
                    </View>
                    <View style={{ flex: 1.4 }}>
                        <AppText type={'bold'}>{"Message"}</AppText>
                    </View>
                    <View style={{ flex: 0.8, alignItems: 'flex-end' }}>
                        <AppText type={'bold'}>{"Status"}</AppText>
                    </View>
                </View>
            )}
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={onItemPress}
                style={styles.header}>
                <View style={{ flex: 0.8, marginEnd: 10 }}>
                    <AppText size={13}>{item.ticket_categories.name}</AppText>
                </View>
                <View style={{ flex: 1.4, marginEnd: 10 }}>
                    <AppText size={13}>{item.message}</AppText>
                </View>
                <View style={styles.statusContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
                        <AppText size={13} color={getStatusColor()} style={{ marginEnd: 5 }}>{getStatus()}</AppText>
                        {isExpanded ? (
                            <DropUpIcon />

                        ) : (
                            <DropDownIcon />
                        )}
                    </View>
                </View>
            </TouchableOpacity>

            {isExpanded && (
                <View style={{ paddingHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10 }}>
                        <CommonImage touchable={false} size={45} source={{ uri: getUserProfilePicture() }} />
                        <View style={{ flex: 1, borderWidth: 1, borderColor: Colors.grey, borderRadius: 15, paddingHorizontal: 15, marginHorizontal: 10 }}>
                            <TextInput
                                value={messageText}
                                placeholder={"Write message here..."}
                                style={{ paddingVertical: 10 }}
                                onChangeText={(text) => setMessageText(text)}
                                onSubmitEditing={onSendIconPress}
                            />
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.sendIconContainer}
                            onPress={onSendIconPress}>
                            <SendMessageIcon width={24} height={24} />
                        </TouchableOpacity>
                    </View>
                    {loading && conversation.length == 0 ? (<ActivityIndicator size={'small'} color={Colors.ui_primary} style={{ marginBottom: 10 }} />) : (
                        <View style={{ marginStart: '12%' }}>
                            {conversation.map((item, index) => {
                                return (
                                    <View key={String(index)} style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                                        <Image style={{ width: 45, height: 45, borderRadius: 45 / 2 }} source={{ uri: item.user ? getUserProfilePicture() : DEFAULT_AVATAR_URL }} />
                                        {item.user ? (
                                            <View style={{ flex: 1, marginHorizontal: 10 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <AppText type={'bold'} size={13} >{userData.username}</AppText>
                                                </View>
                                                <AppText size={13} color={Colors.greydark}>{item.user}</AppText>
                                            </View>
                                        ) : (
                                            <View style={{ flex: 1, marginHorizontal: 10 }}>
                                                <AppText type={'bold'} size={13}>{"Support"}</AppText>
                                                <AppText size={13} color={Colors.greydark}>{item.admin}</AppText>
                                            </View>
                                        )}
                                    </View>
                                )
                            })}
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

HelpTicketListItem.propTypes = {
    item: PropTypes.object
};

HelpTicketListItem.defaultProps = {
    item: {},
};
