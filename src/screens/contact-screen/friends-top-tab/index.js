import React from 'react';
import { View, Text } from 'react-native';
import { NoListData } from '../../../components';
import styles from './style'

export default function FriendsTopTab(props) {

    return (
        <View style={styles.container}>
            <NoListData title={'No friends found!'} />
        </View>
    );

}
