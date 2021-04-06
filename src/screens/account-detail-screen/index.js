import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText, BackHeader } from '../../components';
import { Colors } from '../../constants';
import { ArrowRightIcon } from '../../constants/svg-icons';
import styles from './style';

export default function AccountDetail(props) {

    const navigation = useNavigation();

    const { userData, friendsList } = useSelector((state) => state.userState);
    const { appLabels } = useSelector((state) => state.appState);

    const onBackPress = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <BackHeader
                title={"Account Details"}
                onBackPress={onBackPress}
                color={Colors.ui_primary}
            />
            <ScrollView>
                {userData && userData.passions && (
                    <AccountDetailItem
                        label={"Passions"}
                        title={userData.passions}
                        onPress={() => { }}
                    />
                )}
                {userData && userData.sexual_orientation && (
                    <AccountDetailItem
                        label={"Sexual Orientation"}
                        title={userData.sexual_orientation}
                        onPress={() => { }}
                    />
                )}
                <AccountDetailItem
                    label={"City"}
                    title={"Add living city"}
                    onPress={() => { }}
                />
                <AccountDetailItem
                    label={"Figure"}
                    title={"Athletic"}
                    onPress={() => { }}
                />
                <AccountDetailItem
                    label={"Hair Length"}
                    title={"Short"}
                    onPress={() => { }}
                />
                <AccountDetailItem
                    label={"Hair color"}
                    title={"Black"}
                    onPress={() => { }}
                />
                <AccountDetailItem
                    label={"Eye color"}
                    title={"Blue"}
                    onPress={() => { }}
                />
                <AccountDetailItem
                    label={"Smoker"}
                    title={"No"}
                    onPress={() => { }}
                />
                <AccountDetailItem
                    label={"Drinker"}
                    title={"Sometimes"}
                    onPress={() => { }}
                />
                <AccountDetailItem
                    label={"Children"}
                    title={"No"}
                    onPress={() => { }}
                />
                <AccountDetailItem
                    label={"Relationship status"}
                    title={"Single"}
                    onPress={() => { }}
                />
            </ScrollView>
        </View>
    )
}

const AccountDetailItem = ({ label, title, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.accountDetailItemContainer}>
            <View>
                <AppText type={'regular'} size={12} color={Colors.black}>{label}</AppText>
                <AppText type={'medium'} size={16} color={Colors.black}>{title}</AppText>
            </View>
            <ArrowRightIcon width={18} height={18} />
        </TouchableOpacity>
    )
}