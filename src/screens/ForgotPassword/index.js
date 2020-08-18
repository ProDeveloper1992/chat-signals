import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import {
  GradientButton,
  AuthInput,
  AuthContainer,
  BackHeader,
} from '../../components';
import {Images} from '../../constants';
import {globalStyle} from '../../styles/globalStyle';

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
        <Image style={globalStyle.logo} source={Images.forgot_heart_logo} />
        <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 20}}>
          <Text style={{color:'#fff',paddingHorizontal:5,paddingVertical:10 , fontWeight:'800'}}>
            {
              'Forgot Password?  Not bad.  As a registered member, you can now request a new password using your email address.'
            }
          </Text>
          <AuthInput
            placeholder={'Email'}
            keyboardType={'email-address'}
            value={email}
            onChangeText={(email) => this.setState({email})}
          />
          <GradientButton
            type={'primary'}
            title={'Request New Password'}
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
