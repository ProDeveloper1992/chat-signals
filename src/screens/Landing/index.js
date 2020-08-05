import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {AuthContainer} from '../../components';
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
      <AuthContainer>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={{
              uri: Images.app_logo,
            }}
          />
          <View style={styles.bottomView}>
            <View style={[styles.container, {marginEnd: 8}]}>
              <GradientButton
                type={'light'}
                title={'Register'}
                style={{paddingVertical: 18}}
                onPress={this.onRegister.bind(this)}
              />
            </View>
            <View style={[styles.container, {marginStart: 8}]}>
              <GradientButton
                type={'primary'}
                title={'Login'}
                style={{paddingVertical: 18}}
                onPress={this.onLogin.bind(this)}
              />
            </View>
          </View>
        </View>
      </AuthContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
  },
});
