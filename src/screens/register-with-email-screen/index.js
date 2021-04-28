import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import appleAuth, {
  AppleButton,
  appleAuthAndroid
} from "@invertase/react-native-apple-authentication";
import 'react-native-get-random-values';


import {
  AppButton,
  AuthInput,
  AuthContainer,
  BackHeader,
  GenderPicker,
  AppText,
  CountryPicker,
  DatePicker,
  TextButton,
  TagItem,
  GenderItem,
} from '../../components';
import { mailformat, Colors, Images } from '../../constants';
import { EmailIcon, PasswordIcon, ProfileIcon, CameraIcon, EditPenCircleIcon, EyeCloseIcon, EyeOpenIcon, AppleLogoIcon } from '../../constants/svg-icons';
import { registerUser, setSelectedGender, setSelectedLookingGender } from '../../redux/actions/user-actions';
import { toggleAddPassionsModal, toggleMoreGenderModal, toggleSexualOrientationModal } from '../../redux/actions/app-modals-actions';

import GoogleIcon from '../../assets/icons/google.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import { fetchAndUpdateCredentialState, loginWithFacebook, loginWithGoogle, onAppleLoginForAndroid, onAppleLoginForiOS } from '../../services/social-login-service';
import { apiRoot } from '../../services/api-service';
import { showToast } from '../../redux/actions/app-actions';
import { getFontFamily } from '../../utils/common';

const RegisterWithEmail = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const { appLabels, passionList, genderList, selectedLanguage } = useSelector((state) => state.appState);
  const { userPassions, selectedUserGender, userSexualOrientation } = useSelector((state) => state.userState);

  const [postalCode, setPostalCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [stepPosition, setStepPosition] = useState(0);

  //Zero Position Page
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(null);
  const [confpassword, setConfPassword] = useState('');
  const [confPassError, setConfPassError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //First Position Page
  const [userName, setUserName] = useState('');
  const [userNameError, setUsernameError] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [birthDateError, setBirthDateError] = useState(null);

  //Second Position Page
  const [profileImage, setProfileImage] = useState({ uri: null });
  const [profileImageFile, setProfileImageFile] = useState(null);


  const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);
  useEffect(() => {
    if (!appleAuth.isSupported) return;

    fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
      updateCredentialStateForUser(`Error: ${error.code}`),
    );
  }, []);

  useEffect(() => {
    if (!appleAuth.isSupported) return;

    return appleAuth.onCredentialRevoked(async () => {
      console.warn('Credential Revoked');
      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(`Error: ${error.code}`),
      );
    });
  }, []);


  const onRegisterUser = async () => {
    if (stepPosition == 0) {
      setStepPosition(1);
    } else {
      let isValid = true;
      if (userName.trim() == 0) {
        isValid = false;
        setUsernameError('Username must not be empty!');
        // setEmailError(appLabels.email_error_1);
      } else {
        setUsernameError(null);
      }

      if (profileImage.uri === null) {
        isValid = false;
        dispatch(showToast('negative', "Please select your profile image!"));
      }


      if (isValid) {
        let formatedBirthDate = moment(moment(birthDate, 'DD/MM/YYYY')).format('YYYY-MM-DD');
        console.log("DOB", formatedBirthDate)
        console.log("profileImage", profileImage)
        try {
          const cleanURL = profileImage.uri.replace("file://", "");

          // let requestData = {
          //   language: selectedLanguage,
          //   username: userName,
          //   email: email,
          //   password: password,
          //   dob: formatedBirthDate,
          //   gender: selectedUserGender.id,
          //   sexual_orientation: userSexualOrientation.id,
          //   picture: profileImageFile,
          //   passions: 1
          // };

          let fileName = profileImage.fileName ? profileImage.fileName : moment().unix() + '.jpg'
          let PATH_TO_THE_FILE = Platform.OS == 'android' ? profileImage.uri : profileImage.origURL;

          setLoading(true);
          RNFetchBlob.fetch('POST', `${apiRoot}/registration`, {
            'Content-Type': 'multipart/form-data',
          }, [
            // element with property `filename` will be transformed into `file` in form data
            {
              name: 'picture',
              filename: fileName,
              type: profileImage.type,
              data: RNFetchBlob.wrap(PATH_TO_THE_FILE)
            },
            { name: 'language', data: `${selectedLanguage}` },
            { name: 'username', data: `${userName}` },
            { name: 'email', data: `${email}` },
            { name: 'password', data: `${password}` },
            { name: 'dob', data: `${formatedBirthDate}` },
            { name: 'gender', data: `${selectedUserGender.id}` },
            { name: 'sexual_orientation', data: `${userSexualOrientation.id}` },
            { name: 'passions[]', data: '1' },

          ]).then(async (resp) => {
            console.log("resp", resp);
            if (resp && resp.data) {
              let parsedData = await JSON.parse(resp.data);
              console.log("parsedData", parsedData);
              if (parsedData) {
                if (parsedData.meta && parsedData.meta.status === true) {
                  dispatch(showToast('positive', parsedData.meta.message));
                  setStepPosition(0);
                  navigation.navigate('Login');
                } else {
                  dispatch(showToast('negative', parsedData.meta.message));
                }
              } else {
                dispatch(showToast('negative', "Something went wrong! Try again!"))
              }

            }
            setLoading(false);
            // // if (parsedData.meta.status == 2) {
            // dispatch(showToast('negative', parsedData.meta.message))
            // // }
          }).catch((err) => {
            setLoading(false);
            console.log("err", err)
          })

          // setLoading(true);
          // const response = await dispatch(registerUser(requestData));
          // setLoading(false);
          // if (response.meta.status) {
          //   // navigation.navigate('main-stack');
          // }

        } catch (e) {
          console.log("e", e)
          setLoading(false);
        }
      }
    }
  };

  const onGoogleIconPress = async () => {
    await loginWithGoogle();
  };

  const onFacebookIconPress = async () => {
    await loginWithFacebook();
  };

  const onBackPress = () => {
    if (stepPosition == 0) {
      navigation.goBack();
    } else {
      setStepPosition(0);
    }
  };

  const onSelectUserGenderItem = (genderItem) => {
    if (genderItem.gender_id != 3) {
      dispatch(setSelectedGender(genderItem));
    } else {
      //Open More Gender Modal
      dispatch(toggleMoreGenderModal(true));
    }
  };

  const onSelectLookingGenderItem = (genderItem) => {
    dispatch(setSelectedLookingGender(genderItem));
  };

  //Go to Fisrt position
  const onGoToFirstPosition = () => {

    let isValid = true;

    if (email.trim() == 0) {
      isValid = false;
      setEmailError(appLabels.email_error_1);
    } else if (!email.match(mailformat)) {
      isValid = false;
      setEmailError(appLabels.email_error_2);
    } else {
      setEmailError(null);
    }

    if (password.trim() == 0) {
      isValid = false;
      setPassError(appLabels.password_error_1);
    } else {
      setPassError(null);
    }

    if (confpassword != password) {
      isValid = false;
      setConfPassError(appLabels.password_error_2);
    } else {
      setConfPassError(null);
    }

    if (isValid) {
      setStepPosition(1);
    }

  }

  //Go to Second position
  const onGoToSecondPosition = () => {
    let isValid = true;
    if (userName.trim() == 0) {
      isValid = false;
      setUsernameError('Username must not be empty!');
      // setEmailError(appLabels.email_error_1);
    } else {
      setUsernameError(null);
    }

    if (birthDate === null) {
      isValid = false;
      setBirthDateError('Select your birthdate');
    } else {
      setBirthDateError(null);
    }

    if (isValid) {
      setStepPosition(2);
    }

  }

  const onPickOrCaptureImage = async () => {
    let options = {
      title: 'Select Option',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let sourceFull = response;
        console.log("sourceFull", sourceFull)
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        // let source = {
        //   uri: response.uri
        // };
        setProfileImage(response);
        setProfileImageFile(response.uri);
      }
    });
  }

  const onShowAddPassionsModal = () => {
    dispatch(toggleAddPassionsModal(true));
  }

  const onShowSexualOrientationModal = () => {
    dispatch(toggleSexualOrientationModal(true));
  }

  const renderPage = () => {
    switch (stepPosition) {
      case 0:
        return (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <AppText
              type={'bold'}
              size={24}
              style={{ textAlign: 'center', marginTop: 20 }}>
              {"Create account"}
            </AppText>
            <AuthInput
              label={appLabels.email}
              placeholder={appLabels.email}
              keyboardType={'email-address'}
              value={email}
              onChangeText={setEmail}
              error={emailError}
              icon={<EmailIcon width={24} height={24} />}
            />

            <AuthInput
              label={appLabels.password}
              placeholder={appLabels.password}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              error={passError}
              icon={<PasswordIcon width={24} height={24} />}
              rightIcon={showPassword ? <EyeOpenIcon width={24} height={24} /> : <EyeCloseIcon width={24} height={24} />}
              onRightIconPress={() => setShowPassword(!showPassword)}
            />

            <AuthInput
              label={appLabels.confirm_password}
              placeholder={appLabels.confirm_password}
              secureTextEntry={!showConfirmPassword}
              value={confpassword}
              onChangeText={setConfPassword}
              error={confPassError}
              icon={<PasswordIcon width={24} height={24} />}
              rightIcon={showConfirmPassword ? <EyeOpenIcon width={24} height={24} /> : <EyeCloseIcon width={24} height={24} />}
              onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            <AppButton
              // disabled={postalCode.trim() === ''}
              title={appLabels.next}
              style={{ marginBottom: 20, marginTop: "10%" }}
              onPress={onGoToFirstPosition}
              loading={loading}
            />

            <AppText
              color={Colors.black}
              style={{ alignSelf: 'center', marginBottom: 10 }}>
              {'or'}
            </AppText>

            <AppButton
              type={'sociallogin'}
              title={"Continue with Facebook"}
              icon={<FacebookIcon width={30} height={30} />}
              onPress={onFacebookIconPress}
            />
            <View style={{ marginTop: 15 }} />
            <AppButton
              type={'sociallogin'}
              title={"Continue with Google"}
              icon={<GoogleIcon width={30} height={30} />}
              onPress={onGoogleIconPress}
            />
            <View style={{ marginTop: 15 }} />
            {Platform.OS == 'android' ? (
              <View>
                {appleAuthAndroid.isSupported && (
                  <AppButton
                    type={'sociallogin'}
                    title={"Continue with Apple"}
                    icon={<AppleLogoIcon width={30} height={30} />}
                    onPress={onAppleLoginForAndroid}
                  // loading={googleLoginLoading}
                  />
                )}
              </View>
            ) : (
              <AppButton
                type={'sociallogin'}
                title={"Log in with Apple"}
                icon={<AppleLogoIcon width={30} height={30} />}
                onPress={() => onAppleLoginForiOS(updateCredentialStateForUser)}
              // loading={googleLoginLoading}
              />
            )}

            <TextButton
              style={{ alignSelf: 'center' }}
              title={'Back'}
              fontType={'bold'}
              titleColor={Colors.black}
              onPress={onBackPress} />
          </View>
        );

      case 1:
        return (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <AppText
              type={'bold'}
              size={24}
              style={{ textAlign: 'center', marginVertical: 20 }}>
              {"Create account"}
            </AppText>
            <AuthInput
              label={appLabels.user_name}
              placeholder={appLabels.user_name}
              keyboardType={'email-address'}
              value={userName}
              onChangeText={setUserName}
              error={userNameError}
              icon={<ProfileIcon width={24} height={24} />}
            />
            <DatePicker
              title={'Birthday'}
              error={birthDateError}
              value={birthDate}
              onChangeDate={(date) => setBirthDate(date)} />
            <SectionLable title={appLabels.i_am} />
            <GenderPicker
              type={'user'}
              onSelectGenderItem={(item) => onSelectUserGenderItem(item)} />
            {/* {selectedUserGender.id != 1 && selectedUserGender.gender_id != 2 && (
              <GenderItem style={{ alignSelf: 'flex-start', marginTop: 10 }} gender={selectedUserGender.gender} isSelected={true} />
            )} */}
            <AppText
              style={{ marginTop: 20 }}
              color={Colors.greydark}
              size={16}>
              {'Optional'}
            </AppText>

            <AppText type={'bold'} size={16} style={{ marginTop: 10 }}>{"Passions " + `${userPassions.length}/${passionList.length}`}</AppText>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
              {userPassions.map((item, index) => {
                return <TagItem key={String(index)} title={item.name} disabled selected={true} />
              })}
            </View>

            <AddItem
              subtitle={'Add passions'}
              onAddPress={onShowAddPassionsModal}
            />

            <AppText type={'bold'} size={16} style={{ marginTop: 10, marginBottom: 5 }}>{"Sexual orientation"}</AppText>
            <AddItem
              subtitle={'Add sexual orientation'}
              onAddPress={onShowSexualOrientationModal}
            />

            {userSexualOrientation && (
              <AppText size={16}>{userSexualOrientation.name}</AppText>
            )}

            <AppButton
              // disabled={postalCode.trim() === ''}
              title={'Continue'}
              style={{ marginTop: "10%" }}
              onPress={onGoToSecondPosition}
              loading={loading}
            />
            <TextButton
              style={{ alignSelf: 'center' }}
              title={'Back'}
              fontType={'bold'}
              titleColor={Colors.black}
              onPress={() => setStepPosition(0)} />
          </View>
        );

      case 2:
        return (
          <View style={{ flex: 1 }}>
            <AppText
              type={'bold'}
              size={24}
              style={{ textAlign: 'center', marginVertical: 20 }}>
              {"Select profile picture"}
            </AppText>
            <TouchableOpacity
              disabled={profileImage.uri === null ? false : true}
              onPress={onPickOrCaptureImage}
              style={styles.profileImageContainer}
            >
              <ImageBackground
                imageStyle={{ borderRadius: 134 / 2 }}
                style={styles.profileImage} source={profileImage}>
                {profileImage.uri === null && (
                  <View>
                    <AppText style={{ position: 'absolute', top: -5, right: 0 }}>{'+'}</AppText>
                    <CameraIcon width={52} height={52} />
                  </View>
                )}
              </ImageBackground>
              {profileImage.uri != null && (
                <TouchableOpacity
                  onPress={onPickOrCaptureImage}
                  style={styles.editPenContainer}>
                  <EditPenCircleIcon width={24} height={24} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            <View style={{ width: '100%', bottom: 20, position: 'absolute' }}>
              <AppButton
                title={'Continue'}
                onPress={onRegisterUser}
                loading={loading} />

              <TextButton
                style={{ alignSelf: 'center' }}
                title={'Back'}
                fontType={'bold'}
                titleColor={Colors.black}
                onPress={() => setStepPosition(1)} />
            </View>
          </View>
        )
    }
  };

  return (
    <AuthContainer>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, justifyContent: 'center' }}>{renderPage()}</View>
        </ScrollView>
      </View>
    </AuthContainer>
  );
};

const SectionLable = ({ title }) => {
  return (
    <AppText type={'regular'} size={14} color={Colors.black}>
      {title}
    </AppText>
  );
};

const AddItem = ({ title, subtitle, onAddPress }) => {
  return (
    <View>
      <TouchableOpacity style={{ paddingVertical: 5 }} onPress={onAddPress}>
        <AppText
          type={'regular'}
          color={Colors.black}>
          {`+ ${subtitle}`}
        </AppText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 25,
  },
  input: {
    marginVertical: 8,
  },
  registerButtom: {
    marginVertical: 32,
  },
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 16,
  },
  profileImageContainer: {
    alignSelf: 'center',
    width: 134,
    height: 134,
    borderRadius: 134 / 2,
    borderWidth: 3,
    borderColor: Colors.white,
    backgroundColor: Colors.ui_background,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 14,
  },
  profileImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editPenContainer: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  appleLoginButton: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    borderColor: Colors.greydark,
    borderWidth: 1.5
  },
  appleLoginButtonTitle: {
    flex: 1,
    fontFamily: getFontFamily('medium'),
    color: Colors.greydark,
    alignSelf: 'center',
    textAlign: 'center'
  },
  appleButtoniOS: {
    height: 45,
  }
});

export default RegisterWithEmail;
