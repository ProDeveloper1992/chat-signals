import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants';
import { AppText } from '../../components';

export default function NoListData({ title }) {
  return (
    <View style={styles.container}>
      <AppText type={'medium'} color={Colors.greydark} size={18}>
        {title || "No data found!"}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
