import React, {Component} from 'react';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {
  GradientButton,
  Loading,
  AuthContainer,
  BackHeader,
  CountryPicker,
} from '../../components';
import {Images} from '../../constants';
import {globalStyle} from '../../styles/globalStyle';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {AuthContext} from '../../contexts/AuthContext';

export function RegisterWithFacebook({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const {register} = React.useContext(AuthContext);

  const {colors} = useTheme();

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
            title={'Register With Facebook'}
            icon={'mail'}
            iconColor={colors.white}
            style={styles.registerButtom}
            onPress={() => onLoginWithFacebook()}
          />
          <Loading loading={loading} />
        </View>
      </ScrollView>
    </AuthContainer>
  );
}

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

// import React, { Component } from 'react';

// import { View, StyleSheet, Text, Alert, Image } from 'react-native';

// import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

// export class RegisterWithFacebook extends Component {

//   constructor() {
//     super();
//     this.state = {

//       user_name: '',
//       avatar_url: '',
//       avatar_show: false
//     }
//   }

//   get_Response_Info = (error, result) => {
//     if (error) {
//       Alert.alert('Error fetching data: ' + error.toString());
//     } else {

//       this.setState({ user_name: 'Welcome' + ' ' + result.name });

//       this.setState({ avatar_url: result.picture.data.url });

//       this.setState({ avatar_show: true })

//       console.log(result);

//     }
//   }

//   onLogout = () => {

//     this.setState({ user_name: null, avatar_url: null, avatar_show: false });

//   }

//   render() {
//     return (
//       <View style={styles.container}>

//         {this.state.avatar_url ?
//           <Image
//             source={{ uri: this.state.avatar_url }}
//             style={styles.imageStyle} /> : null}

//         <Text style={styles.text}> {this.state.user_name} </Text>

//         <LoginButton
//           readPermissions={['public_profile']}
//           onLoginFinished={(error, result) => {
//             if (error) {
//               console.log(error.message);
//               console.log('login has error: ' + result.error);
//             } else if (result.isCancelled) {
//               console.log('login is cancelled.');
//             } else {
//               AccessToken.getCurrentAccessToken().then(data => {
//                 console.log(data.accessToken.toString());

//                 const processRequest = new GraphRequest(
//                   '/me?fields=name,picture.type(large)',
//                   null,
//                   this.get_Response_Info
//                 );
//                 // Start the graph request.
//                 new GraphRequestManager().addRequest(processRequest).start();

//               });
//             }
//           }}
//           onLogoutFinished={this.onLogout}
//         />

//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },

//   text: {
//     fontSize: 20,
//     color: '#000',
//     textAlign: 'center',
//     padding: 20
//   },

//   imageStyle: {

//     width: 200,
//     height: 300,
//     resizeMode: 'contain'

//   }
// });
