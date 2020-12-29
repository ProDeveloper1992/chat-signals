import React from 'react';
import {StyleSheet, View, SafeAreaView, Animated, Text} from 'react-native';
import {GeneralHeader} from '../../components/Headers';
import {useNavigation} from '@react-navigation/native';
import {toggleLanguageModal} from '../../redux/actions/app-modals-actions';
import {useDispatch} from 'react-redux';
import {GradientButton, AppText, AuthContainer} from '../../components';
import CountDown from 'react-native-countdown-component';
import {Images, mailformat, Colors, Gifs, Icons} from '../../constants';

const DailyCoins = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let animatedValue = new Animated.Value(0);
  let val = 0;

  animatedValue.addListener(({value}) => {
    val = value;
  });

  let frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  let backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };

  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  const flipCard = () => {
    if (val >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <SafeAreaView style={[styles.container, {}]}>
      <GeneralHeader
        leftIcon={Icons.user_profile}
        onLeftPress={() => navigation.navigate('UserProfile')}
        LanguageIcon={Icons.icon_languages}
        onLanguagePress={() => dispatch(toggleLanguageModal(true))}
        label={'Daily Coins'}
      />
      <AuthContainer blur>
        <View style={{flex: 1, padding: 24}}>
          <CountDown
            until={60 * 60}
            size={20}
            onFinish={() => alert('Finished')}
            timeLabelStyle={{color: Colors.ui_primary}}
            digitStyle={{backgroundColor: '#FFF'}}
            digitTxtStyle={{color: Colors.ui_primary}}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{h: 'HH', m: 'MM', s: 'SS'}}
          />
          <AppText
            type={'medium'}
            size={14}
            style={{
              textAlign: 'center',
              marginTop: 10,
              paddingVertical: 5,
            }}>
            {'Visit daily to collect Chat-Coins..!!!'}
          </AppText>

          <View style={styles.cardContainer}>
            <Animated.View
              style={[frontAnimatedStyle, styles.cardStyle, styles.cardFront]}>
              <AppText
                type={'bold'}
                size={20}
                color={Colors.white}
                style={{textAlign: 'center'}}>
                {'Chat-Coins'}
              </AppText>
            </Animated.View>

            <Animated.View
              style={[backAnimatedStyle, styles.cardStyle, , styles.cardBack]}>
              <AppText
                type={'bold'}
                size={20}
                color={Colors.white}
                style={{textAlign: 'center'}}>
                {'Hurrah...you got 25 chat-coins..!!!'}
              </AppText>
            </Animated.View>
          </View>
          <GradientButton
            type={'primary'}
            title={'Collect'}
            style={styles.btnstyle}
            onPress={() => flipCard()}
          />
        </View>
      </AuthContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btnstyle: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginVertical: 20,
  },

  cardContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  cardStyle: {
    width: '75%',
    height: '75%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 4,
    backfaceVisibility: 'hidden',
  },

  cardFront: {
    backgroundColor: 'rgba(82,184,188,0.5)',
  },

  cardBack: {
    top: 0,
    position: 'absolute',
    backgroundColor: Colors.ui_primary_dark,
  },
});

export default DailyCoins;
