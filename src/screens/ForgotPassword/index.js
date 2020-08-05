import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {AuthContainer, Input} from '../../components';
import {GradientButton} from '../../components/Buttons';

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
      <AuthContainer style={{justifyContent: 'center'}}>
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
      </AuthContainer>
    );
  }
}
