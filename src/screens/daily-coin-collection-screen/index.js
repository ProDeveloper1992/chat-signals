import React from 'react';
import { StyleSheet, View, SafeAreaView, Animated, Text } from 'react-native';
import { GeneralHeader } from '../../components/Headers';
import { useNavigation } from '@react-navigation/native';
import { toggleLanguageModal } from '../../redux/actions/app-modals-actions';
import { useDispatch, useSelector } from 'react-redux';
import { GradientButton, AppText, AuthContainer } from '../../components';
import CountDown from 'react-native-countdown-component';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Images, mailformat, Colors, Gifs, Icons } from '../../constants';

const DailyCoins = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { appLabels } = useSelector((state) => state.appState);

  let animatedValue = new Animated.Value(0);
  let val = 0;

  animatedValue.addListener(({ value }) => {
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
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
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
    <View style={styles.container}>
      <GeneralHeader
        leftIcon={Icons.user_profile}
        onLeftPress={() => navigation.navigate('UserProfile')}
        LanguageIcon={Icons.icon_languages}
        onLanguagePress={() => dispatch(toggleLanguageModal(true))}
        label={appLabels.daily_coins}
      />
      <AuthContainer blur>
        <View style={{ flex: 1, padding: 24 }}>
          <CountDown
            until={60 * 60}
            size={20}
            onFinish={() => alert('Finished')}
            timeLabelStyle={{ color: Colors.ui_primary }}
            digitStyle={{ backgroundColor: '#FFF' }}
            digitTxtStyle={{ color: Colors.ui_primary }}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{ h: 'HH', m: 'MM', s: 'SS' }}
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
              <CountdownCircleTimer
                isPlaying
                size={150}
                duration={60 * 60}
                isLinearGradient={true}
                colors={[
                  ["#C70039", 0.33],
                  ["#FF5733", 0.33],
                  [Colors.golden, 0.34],
                ]}
              >
                {({ remainingTime, animatedColor }) => {
                  const hours = Math.floor(remainingTime / 3600) < 10 ? "0" + Math.floor(remainingTime / 3600) : Math.floor(remainingTime / 3600);
                  const minutes = Math.floor((remainingTime % 3600) / 60) < 10 ? "0" + Math.floor((remainingTime % 3600) / 60) : Math.floor((remainingTime % 3600) / 60);
                  const seconds = remainingTime % 60 < 10 ? "0" + remainingTime % 60 : remainingTime % 60;
                  return (
                    <Animated.Text style={{ color: Colors.black, fontSize: 18, fontWeight: 'bold' }}>
                      {`${hours}:${minutes}:${seconds}`}
                    </Animated.Text>
                  )
                }}
              </CountdownCircleTimer>
            </Animated.View>

            <Animated.View
              style={[backAnimatedStyle, styles.cardStyle, styles.cardBack]}>
              <AppText
                type={'bold'}
                size={20}
                color={Colors.white}
                style={{ textAlign: 'center', marginHorizontal: 30 }}>
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
    </View>
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
    width: '90%',
    height: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 4,
    backfaceVisibility: 'hidden',
  },

  cardFront: {
    bottom: '10%',
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.7)',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },

  cardBack: {
    bottom: '10%',
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.7)',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
});

export default DailyCoins;
