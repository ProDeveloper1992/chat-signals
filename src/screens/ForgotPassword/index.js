import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {
  GradientButton,
  AuthInput,
  AuthContainer,
  BackHeader,
} from '../../components';
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
      <AuthContainer blur>
        <BackHeader onBackPress={() => this.props.navigation.goBack()} />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <AuthInput
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
        </View>
      </AuthContainer>
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
