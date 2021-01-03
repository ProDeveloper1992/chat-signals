import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { NoListData } from '../../../components';
import styles from './style';

export default function BlockedTopTab(props) {

  const { appLabels } = useSelector((state) => state.appState);

  return (
    <View style={styles.container}>
      <NoListData title={appLabels.no_blocked} />
    </View>
  );
}
