import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {GradientButton} from '../../components/Buttons';
import {Input} from '../../components/Input';
import {Images} from '../../constants';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  render() {
    const {email} = this.state;
    return (
      <ImageBackground style={styles.container} source={Images.login_bg_2}>
        <Input
          placeholder={'Email'}
          keyboardType={'email-address'}
          value={email}
          onChangeText={(email) => this.setState({email})}
        />
        <GradientButton
          type={'primary'}
          title={'Send'}
          style={{marginTop: 20}}
          // onPress={this.onLogin.bind(this)}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
});
