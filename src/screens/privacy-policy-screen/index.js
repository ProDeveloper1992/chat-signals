import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText, BackHeader } from '../../components';
import { Colors } from '../../constants';
import styles from './style';

export default function PrivacyPolicy(props) {

    const navigation = useNavigation();

    const { userData, friendsList } = useSelector((state) => state.userState);
    const { appLabels } = useSelector((state) => state.appState);

    const onBackPress = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <BackHeader
                title={appLabels.privacy_policy}
                onBackPress={onBackPress}
                color={Colors.ui_primary}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: "10%" }}>
                <AppText type={'light'}>{`Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.

These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.`}</AppText>
            </ScrollView>
        </View>
    )
}