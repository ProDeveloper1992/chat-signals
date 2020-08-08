import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import {GradientButton, AuthContainer} from '../../components';
import {Images} from '../../constants';
import {isIphoneX} from '../../utils/globalFunctions';
import {globalStyle} from '../../styles/globalStyle';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onRegister = () => {
    this.props.navigation.navigate('RegisterLanding');
  };

  onLogin = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <AuthContainer>
        <Image
          style={[globalStyle.logo, {marginTop: isIphoneX() ? 60 : 50}]}
          source={Images.app_logo}
        />
        <View style={styles.bottomView}>
          <View style={{marginEnd: 8, flex: 1}}>
            <GradientButton
              type={'light'}
              title={'Register'}
              style={{paddingVertical: Platform.OS === 'ios' ? 18 : 15}}
              onPress={this.onRegister.bind(this)}
            />
          </View>
          <View style={{marginStart: 8, flex: 1}}>
            <GradientButton
              type={'primary'}
              title={'Login'}
              style={{paddingVertical: Platform.OS === 'ios' ? 18 : 15}}
              onPress={this.onLogin.bind(this)}
            />
          </View>
        </View>
      </AuthContainer>
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
});
