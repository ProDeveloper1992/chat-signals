import React from 'react';
import {StyleSheet, View,Text} from 'react-native';
import {GeneralHeader} from '../../components/Headers';
import {useNavigation} from '@react-navigation/native';
import {toggleLanguageModal} from '../../redux/actions/app-modals-actions';
import {useDispatch} from 'react-redux';
import {Icons} from '../../constants';
import FlipCard from 'react-native-flip-card';

const DailyCoins = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <GeneralHeader
        leftIcon={Icons.user_profile}
        onLeftPress={() => navigation.navigate('UserProfile')}
        LanguageIcon={Icons.icon_languages}
        onLanguagePress={() => dispatch(toggleLanguageModal(true))}
        label={'Daily Coins'}
      />
      <View style={{flex:0.5,backgroundColor:'yellow'}}>
      <FlipCard
        style={{flex:1,backgroundColor:'pink'}}
        friction={20}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={false}
        clickable={false}
        onFlipEnd={(isFlipEnd) => {
          console.log('isFlipEnd', isFlipEnd);
        }}>
        {/* Face Side */}
        <View style={styles.face}>
          <Text>The Faceeeeee</Text>
        </View>
        {/* Back Side */}
        <View style={styles.back}>
          <Text>The Backkkkkk</Text>
        </View>
      </FlipCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DailyCoins;
