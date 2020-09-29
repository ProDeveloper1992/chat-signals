import React from 'react';
import {View} from 'react-native';
import {NoListData} from '../../../components';
import styles from './style';

export default function BlockedTopTab(props) {
  return (
    <View style={styles.container}>
      <NoListData title={'No blocked contacts found!'} />
    </View>
  );
}
