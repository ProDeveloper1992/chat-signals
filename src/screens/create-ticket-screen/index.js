import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getHelpTicketSubjects, showToast } from '../../redux/actions/app-actions';
import { AppButton, AppDropDown, AppText, AuthInput, BackHeader, HelpTicketMenu } from '../../components';
import { Colors } from '../../constants';
import styles from './style';
import { createHelpTicket } from '../../redux/actions/user-actions';

export default function HelpAndSupport(props) {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { userData, friendsList } = useSelector((state) => state.userState);
    const { appLabels, selectedLanguage } = useSelector((state) => state.appState);

    const [creatingTicket, setCreatingTicket] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [additionalMessage, setAdditionalMessage] = useState('');
    const [additionalMessageError, setAdditionalMessageError] = useState(null);

    useEffect(() => {
        dispatch(getHelpTicketSubjects());
    }, [])

    const onBackPress = () => {
        navigation.goBack();
    }

    const onSelectTicketOption = (ticket) => {
        setSelectedTicket(ticket);
    }

    const onSubmitPress = async () => {
        let isValid = true;
        if (selectedTicket != null) {
            isValid = true;
        } else {
            isValid = false;
            dispatch(showToast('negative', "Please select subject!"))
        }

        if (additionalMessage == '') {
            isValid = false;
            setAdditionalMessageError("Please enter additional message!")
        } else {
            isValid = true;
            setAdditionalMessageError(null)
        }

        if (isValid) {
            setCreatingTicket(true);
            let requestData = {
                name: userData.username,
                email: userData.email,
                user_id: userData.id,
                ticket_category_id: selectedTicket.id,
                message: additionalMessage,
                agree: 'on',
                language: selectedLanguage
            }

            console.log(requestData)
            await dispatch(createHelpTicket(requestData));
            setCreatingTicket(false);
            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <BackHeader
                title={"Create new ticket"}
                onBackPress={onBackPress}
                color={Colors.ui_primary}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: "10%" }}>
                <AppText type={'bold'} size={16}>{"Contact Us"}</AppText>
                <AppText type={'light'}>{`Got something you want to talk about? Contact us or email us and we promise to get back to you as soon as we can.`}</AppText>

                <View style={{ marginVertical: '5%' }}>
                    <AppText type={'bold'} size={16}>{`What can we help with?`}</AppText>
                    <HelpTicketMenu onSelectOption={onSelectTicketOption} />
                    <AuthInput
                        label={"Additional message*"}
                        placeholder={"Message*"}
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={(message) => setAdditionalMessage(message)}
                        error={additionalMessageError} />
                </View>
                <AppText type={'light'}>{`Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam:`}</AppText>
                <AppText type={'light'}>{`- Omnis iste natus error sit voluptatem accusantium doloremque laudantium`}</AppText>
                <AppText type={'light'} style={{ marginTop: '5%' }}>{`You did not resolve your problem? be free to contact us:`}</AppText>
            </ScrollView>
            <View style={{ margin: 20 }}>
                <AppButton
                    disabled={selectedTicket == null}
                    title={"Submit"}
                    onPress={onSubmitPress}
                    loading={creatingTicket}
                />
            </View>
        </View>
    )
}