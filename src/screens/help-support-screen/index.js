import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, FlatList, Platform, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AppButton, AppIndicatorLoader, AppText, BackHeader, HelpTicketListItem, NoListData } from '../../components';
import { Colors } from '../../constants';
import styles from './style';
import { getHelpTicketList } from '../../redux/actions/user-actions';

export default function HelpAndSupport(props) {

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const { userData, customerHelpTicketList } = useSelector((state) => state.userState);
    const { appLabels, selectedLanguage } = useSelector((state) => state.appState);

    const [isLoadingTickets, setLoadingTickets] = useState(true);

    useEffect(() => {
        if (isFocused) {
            getTickets();
        }
    }, [isFocused]);

    const getTickets = async () => {
        setLoadingTickets(true);
        await dispatch(getHelpTicketList());
        setLoadingTickets(false);
    }

    const onBackPress = () => {
        navigation.goBack();
    }

    const onAddNewTicketPress = () => {
        navigation.navigate('CreateTicket')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : 'height'}
            enabled={Platform.OS === "ios" ? true : false}
            style={styles.container}
        >
            <View style={styles.container}>
                <BackHeader
                    title={`${appLabels.help} & ${appLabels.support}`}
                    onBackPress={onBackPress}
                    color={Colors.ui_primary}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 15 }}>
                    <View style={{ flex: 1.2 }} >
                        <AppText type={"bold"} size={18}>{appLabels.tickets}</AppText>
                    </View>
                    <AppButton
                        title={`+ ${appLabels.add_new}`}
                        onPress={onAddNewTicketPress}
                        style={{ flex: 0.8, alignSelf: 'flex-end' }}
                    />
                </View>
                {isLoadingTickets && customerHelpTicketList && customerHelpTicketList.length == 0 ? (<AppIndicatorLoader />) : (
                    <FlatList
                        data={customerHelpTicketList}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <HelpTicketListItem
                                key={String(index)}
                                item={item}
                                index={index} />
                        )}
                        keyExtractor={(item, index) => String(index)}
                        ListEmptyComponent={<NoListData title={appLabels.no_tickets_found} />}
                    />
                )}
            </View>
        </KeyboardAvoidingView>
    )
}