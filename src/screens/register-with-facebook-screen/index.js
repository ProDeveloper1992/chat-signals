import React from 'react';
import {StyleSheet, Image, View, ScrollView} from 'react-native';

import {
  GradientButton,
  Loading,
  AuthContainer,
  BackHeader,
  CountryPicker,
} from '../../components';
import {Images, Colors} from '../../constants';
import {globalStyle} from '../../styles/global-style';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../redux/actions/user-actions';

const RegisterWithFacebook = (props) => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const {appStrings} = useSelector((state) => state.appState);

  const [loading, setLoading] = React.useState(false);

  function onLoginWithFacebook() {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const infoRequest = new GraphRequest(
              '/me',
              {
                parameters: {
                  fields: {
                    string:
                      'email,name,picture,first_name,middle_name,last_name', // what you want to get
                  },
                },
              },
              _responseInfoCallback,
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {},
    );
  }

  //Create response callback.
  const _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('ERROR:- ', error);
    } else {
      dispatch(loginUser());
      navigation.navigate('main-stack');
      console.log('RESULT:- ', result);
    }
  };

  return (
    <AuthContainer blur>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={globalStyle.logo} source={Images.app_logo} />
        <View style={{marginTop: '10%'}}>
          <CountryPicker />

          <GradientButton
            type={'facebook'}
            title={appStrings.register.register_with_facebook}
            icon={'mail'}
            iconColor={Colors.white}
            style={styles.registerButtom}
            onPress={() => onLoginWithFacebook()}
          />
          <Loading loading={loading} />
        </View>
      </ScrollView>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
  },
  registerButtom: {
    marginVertical: 10,
    paddingVertical: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 16,
  },
});

export default RegisterWithFacebook;
