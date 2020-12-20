import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GeneralHeader} from '../../components/Headers';
import {useNavigation} from '@react-navigation/native';
import {toggleLanguageModal} from '../../redux/actions/app-modals-actions';
import {useDispatch} from 'react-redux';
import {Icons} from '../../constants';

const DailyCoins = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  return <View style={styles.container}>
    <GeneralHeader
        leftIcon={Icons.user_profile}
        onLeftPress={()=>navigation.navigate('UserProfile')}
        LanguageIcon={Icons.icon_languages}
        onLanguagePress={() => dispatch(toggleLanguageModal(true))}
        label={'Daily Coins'}
      />
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DailyCoins;
