import React from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText } from '../../../components';
import { Icons, Colors } from '../../../constants';
import styles from './style';

export default function ModeratorProfileActionTab(props) {

  const { appLabels } = useSelector((state) => state.appState);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <AppText
        type={'bold'}
        size={13}
        style={{
          textAlign: 'center',
          textTransform: 'uppercase',
          padding: 10,
        }}>
        {appLabels.settings}
      </AppText>

      <ActionHolder
        onPress={() => alert(appLabels.give_away_coins)}
        label={appLabels.give_away_coins}
      />
      <ActionHolder
        onPress={() => alert(appLabels.report_user)}
        label={appLabels.report_user}
      />

      <ActionHolder onPress={() => alert(appLabels.block_user)} label={appLabels.block_user} />
    </ScrollView>
  );
}

const ActionHolder = (props) => {
  return (
    <TouchableOpacity
      style={styles.propertyContainer}
      onPress={props.onPress}
      activeOpacity={0.5}>
      <AppText type={'medium'} size={12}>
        {props.label}
      </AppText>
      <Image
        source={Icons.right_arrow}
        style={{ height: 14, width: 14, resizeMode: 'cover' }}
      />
    </TouchableOpacity>
  );
};
