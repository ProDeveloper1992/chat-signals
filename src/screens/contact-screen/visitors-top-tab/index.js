import React from 'react';
import {View} from 'react-native';
import {NoListData} from '../../../components';
import styles from './style';

export default function VisitorsTopTab(props) {
  return (
    <View style={styles.container}>
      <NoListData title={'No visitors found!'} />
    </View>
  );
}
