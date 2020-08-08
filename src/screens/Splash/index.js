// import React from 'react';
// import {View, StyleSheet, Image} from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import {Images} from '../../constants';

// export function Splash() {
//   const {colors} = useTheme();
//   return (
//     <View style={[styles.container, {backgroundColor: 'transparent'}]}>
//       <Image source={Images.splash} style={{height: '100%', width: '100%'}} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import LottieView from 'lottie-react-native';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <LottieView source={require('../../assets/animations/heart.json')} autoPlay loop />
    );
  }
}
