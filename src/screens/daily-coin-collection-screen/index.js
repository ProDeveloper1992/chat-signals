import React from 'react';
import { StyleSheet, View, SafeAreaView, Animated, Text } from 'react-native';
import { GeneralHeader } from '../../components/Headers';
import { useNavigation } from '@react-navigation/native';
import { toggleLanguageModal } from '../../redux/actions/app-modals-actions';
import { useDispatch } from 'react-redux';
import { GradientButton, AppText, AuthContainer } from '../../components';
import CountDown from 'react-native-countdown-component';
import { Images, mailformat, Colors, Gifs, Icons } from '../../constants';

const DailyCoins = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let animatedValue = new Animated.Value(0);
  let value = 0;
  let val = 0;

  // animatedValue.addListener(({value}) => {
  //   val = value;
  // });

  // let frontInterpolate = animatedValue.interpolate({
  //   inputRange: [0, 180],
  //   outputRange: ['0deg', '180deg'],
  // });
  // let backInterpolate = animatedValue.interpolate({
  //   inputRange: [0, 180],
  //   outputRange: ['180deg', '360deg'],
  // });
  // let frontOpacity = animatedValue.interpolate({
  //   inputRange: [89, 90],
  //   outputRange: [1, 0],
  // });

  // let backOpacity = animatedValue.interpolate({
  //   inputRange: [89, 90],
  //   outputRange: [0, 1],
  // });

  // let elevationFront = animatedValue.interpolate({
  //   inputRange: [0, 25],
  //   outputRange: [10, 0],
  // });

  // let elevationBack = animatedValue.interpolate({
  //   inputRange: [155, 180],
  //   outputRange: [0, 10],
  // });

  const flipCard = () => {
    if (value >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    }
  };

  // const frontAnimatedStyle = {
  //   transform: [{rotateY: frontInterpolate}],
  // };
  // const backAnimatedStyle = {
  //   transform: [{rotateY: backInterpolate}],
  // };

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
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginVertical: 10,
              height: '60%',
              width: '75%',
              backgroundColor: 'rgba(82,184,188,0.5)',
              borderRadius: 4,
            }}>
            <AppText
              type={'bold'}
              size={20}
              color={Colors.white}
              style={{ textAlign: 'center' }}>
              {'Chat-Coins'}
            </AppText>
          </View>
          {/* <Animated.View
            style={[
              frontAnimatedStyle,
              styles.paperFront,
              {elevation: elevationFront},
              {opacity: frontOpacity},
            ]}>
            <Text
              style={{
                fontSize: 20,
                paddingTop: 8,
                paddingLeft: 8,
                color: 'black',
                lineHeight: 20,
              }}>
              Title Front {value} - <Text style={{fontSize: 8}}>KPI</Text>
            </Text>
            <View style={{position: 'absolute', paddingTop: 3, right: 8}}>
              <Text>{'TabBarIcon'}</Text>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              backAnimatedStyle,
              styles.paperBack,
              {elevation: elevationBack},
              {opacity: backOpacity},
            ]}>
            <Text>Back title {value}</Text>
          </Animated.View> */}
          <GradientButton
            type={'primary'}
            title={'Collect'}
            style={styles.loginButton}
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

  loginButton: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginVertical: 20,
  },

  paperFront: {
    marginHorizontal: 15,
    backgroundColor: 'white',
    minHeight: 200,
    borderRadius: 5,
    marginBottom: 15,
  },
  paperBack: {
    top: -215,
    marginHorizontal: 15,
    backgroundColor: 'white',
    minHeight: 200,
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default DailyCoins;
