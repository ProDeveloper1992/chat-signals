import React from 'react';
import {StyleSheet, Image, View, ScrollView} from 'react-native';

import {
  GradientButton,
  Loading,
  AuthContainer,
  BackHeader,
  CountryPicker,
} from '../../components';
import {Images, Colors, Icons, Gifs} from '../../constants';
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

  const {appLabels} = useSelector((state) => state.appState);

  const [loading, setLoading] = React.useState(false);

  function onLoginWithFacebook() {
    setLoading(true);
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          setLoading(false);
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
      function (error) {
        setLoading(false);
      },
    );
  }

  //Create response callback.
  const _responseInfoCallback = async (error, result) => {
    if (error) {
      console.log('ERROR:- ', error);
    } else {
      const response = await dispatch(loginUser());
      setLoading(false);
      if (response.meta.status) {
        navigation.navigate('main-stack');
      }
      console.log('RESULT:- ', result);
    }
  };

  return (
    <AuthContainer blur>
      <BackHeader onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={globalStyle.logo} source={Gifs.chat_signal_logo} />
        <View style={{marginTop: '10%'}}>
          <CountryPicker />

          <GradientButton
            type={'facebook'}
            title={appLabels.register_with_facebook}
            icon={
              <Image source={Icons.facebook_icon} style={styles.facebookIcon} />
            }
            iconColor={Colors.white}
            style={styles.registerButtom}
            onPress={() => onLoginWithFacebook()}
            loading={loading}
          />
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
  facebookIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.white,
    marginEnd: 8,
  },
});

export default RegisterWithFacebook;
