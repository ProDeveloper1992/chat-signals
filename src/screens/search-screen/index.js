import React from 'react';
import { View, Platform } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icons, Colors } from '../../constants';
import { AppText, AuthInput, AppButton } from '../../components';
import { GeneralHeader } from '../../components/Headers';
import styles from './style';
import Icon from 'react-native-ionicons';

import { toggleLanguageModal } from '../../redux/actions/app-modals-actions';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 20,
          backgroundColor: Colors.ui_primary,
        }}>
        <Icon
          name={'arrow-back'}
          color={Colors.white}
          size={30}
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <AppText
            type={'bold'}
            size={16}
            style={{ textTransform: 'uppercase' }}
            color={Colors.white}>
            {'Search'}
          </AppText>
        </View>
      </View>
      <View style={styles.insideContainer}>
        <AuthInput
          style={{ marginVertical: 5 }}
          label={'Search'}
          placeholder={'Search...'}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          position: 'absolute',
          bottom: 30,
          left: 0,
          right: 0,
        }}>
        <AppButton
          type={'primary'}
          title={'Search'}
          style={{ marginTop: 20 }}
          onPress={() => { }}
          loading={loading}
        />
      </View>
    </View>
  );
}
