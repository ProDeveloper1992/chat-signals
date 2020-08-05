import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import {GradientButton} from '../../components/Buttons/GradientButton';
import {Images} from '../../constants';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onRegister = () => {
    this.props.navigation.navigate('Register');
  };

  onLogin = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <ImageBackground style={styles.container} source={Images.login_bg_2}>
        <Image style={styles.logo} source={Images.app_logo} />
        <View style={styles.bottomView}>
          <View style={{marginEnd: 8, flex: 1}}>
            <GradientButton
              type={'light'}
              title={'Register'}
              style={{paddingVertical: 18}}
              onPress={this.onRegister.bind(this)}
            />
          </View>
          <View style={{marginStart: 8, flex: 1}}>
            <GradientButton
              type={'primary'}
              title={'Login'}
              style={{paddingVertical: 18}}
              onPress={this.onLogin.bind(this)}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  bottomView: {
    bottom: 25,
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  logo: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
  },
});
