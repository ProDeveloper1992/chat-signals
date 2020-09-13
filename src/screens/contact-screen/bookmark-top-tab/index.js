import React from 'react';
import { View, Text } from 'react-native';
import { NoListData } from '../../../components';
import styles from './style'

export default function BookmarkTopTab(props) {

    return (
        <View style={styles.container}>
            <NoListData title={'No bookmars found!'} />
        </View>
    );

}
