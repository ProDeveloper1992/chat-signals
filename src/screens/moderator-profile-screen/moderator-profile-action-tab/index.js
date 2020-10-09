import React from 'react';
import {View, ScrollView, Image, TouchableOpacity, Text} from 'react-native';
import {AppText} from '../../../components';
import {Icons, Colors} from '../../../constants';
import styles from './style';

export default function ModeratorProfileActionTab(props) {
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
        {'settings'}
      </AppText>

      <ActionHolder
        onPress={() => alert('Give away coins')}
        label={'Give away coins'}
      />
      <ActionHolder
        onPress={() => alert('Report user')}
        label={'Report user'}
      />

      <ActionHolder onPress={() => alert('Block user')} label={'Block user'} />
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
        style={{height: 14, width: 14, resizeMode: 'cover'}}
      />
    </TouchableOpacity>
  );
};
