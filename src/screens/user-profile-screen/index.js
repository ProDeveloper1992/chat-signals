import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { AppText, CommonImage, GeneralHeader } from '../../components';
import { Colors, DEFAULT_AVATAR_URL } from '../../constants';
import styles from './style';
import { AppAlertModal, DeleteAccountModal, ModeratorActivityModal } from '../../components/app-modals';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleSignin } from 'react-native-google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import {
  EditPenCircleIcon,
  BoostIcon,
  KissGradientIcon32,
  StickerGradientIcon32,
  LikeGradientIcon32,
  HeartGradientIcon32,
  FriendGradientIcon32,
  CoinGradientIcon,
  ArrowRightIcon
} from '../../constants/svg-icons';
import { toggleGallerySwiperModal, toggleLanguageModal } from '../../redux/actions/app-modals-actions';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getAppearanceAndInterests, getCustomerProfileDetail } from '../../redux/actions/user-actions';
import moment from 'moment';
import { logoutUser } from '../../redux/reducers';
import { getUserProfilePicture } from '../../utils/common';

var RNFS = require('react-native-fs');

export default function UserProfile(props) {
  const { params } = props.route;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [activityType, setActivityType] = useState('kisses');
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [cuurentTab, setCurrentTab] = useState(1);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const getUserProfileImage = () => {
    let image_url = null;
    if (userData && userData.profilepictures && userData.profilepictures.length > 0) {
      for (let profilePicture of userData.profilepictures) {
        if (profilePicture.status == "1") {
          console.log(profilePicture.is_profile_photo)
          image_url = profilePicture.picture;
        }
      }
      return image_url;
    } else {
      return DEFAULT_AVATAR_URL;
    }
  }

  //Second Position Page
  const [profileImage, setProfileImage] = useState({ uri: null });

  const { userData, friendsList } = useSelector((state) => state.userState);
  const { appLabels } = useSelector((state) => state.appState);

  useEffect(() => {
    if (isFocused) {
      console.log("userData...", userData)
      dispatch(getCustomerProfileDetail());
      dispatch(getAppearanceAndInterests());
    }
  }, [isFocused]);

  const onPickOrCaptureImage = async () => {
    let options = {
      title: 'Select Option',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, async (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // let source = response;
        // You can also display the image using data:
        let source = {
          uri: 'data:image/jpeg;base64,' + response.data
        };
        setProfileImage(source);

        // RNFS.readFile(response.uri, "base64").then(data => {
        //   // binary data
        //   console.log("RNFS data", data);
        // });

        // console.log("response.path", response.path)

        // let blob = await base64ToBlob(response.data);
        // console.log('btoB64 resp === ', blob);

      }
    });
  }

  // const base64ToBlob = async (encoded) => {
  //   let url = `data:image/jpg;base64,${encoded}`;
  //   let res = await fetch(url);
  //   let blob = await res?.blob();
  //   return blob;
  // }

  const showActivityModal = (type) => {
    setActivityType(type);
    setActivityModalVisible(true);
  };

  const onLogout = async () => {
    await dispatch(logoutUser());
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      // console.error(error);
    }
    await setLogoutModalVisible(false);
    props.navigation.push('auth-stack');
  }

  const onLanguagePress = () => {
    dispatch(toggleLanguageModal(true));
  }

  return (
    <View style={styles.container}>
      <GeneralHeader label={appLabels.profile} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <View style={styles.profileImageContainer}>
              <TouchableOpacity onPress={() => dispatch(toggleGallerySwiperModal(true, [{ url: profileImage.uri ? profileImage.uri : getUserProfilePicture() }]))}>
                <Image style={styles.profileImage} source={profileImage.uri ? profileImage : { uri: getUserProfilePicture() }} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('UserPhotos')}
                style={styles.editPenContainer}>
                <EditPenCircleIcon width={18} height={18} />
              </TouchableOpacity>
            </View>

            <View style={{ padding: 15 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppText type={'bold'} size={16}>{`${userData && userData.username}${userData && userData.dob ? `, ${moment().diff(moment(userData.dob, 'DD-MM-YYYY'), 'years')}` : ''}`}</AppText>
              </View>
            </View>

            <TouchableOpacity style={styles.boostButton}>
              <View style={styles.boostIconContainer}>
                <BoostIcon />
              </View>
              <AppText type={'bold'} size={12} uppercase>{`${appLabels.boost} ${appLabels.profile}`}</AppText>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, padding: 15 }}>
            <View style={{ flexDirection: 'row' }}>
              <CounterCard
                onPress={() => { }}
                title={appLabels.Coins}
                count={userData ? userData.credit : 0}
                icon={<CoinGradientIcon width={50} height={50} />} />
              <CounterCard
                onPress={() => navigation.navigate('HeartsScreen')}
                title={appLabels.heart}
                count={userData ? userData.total_hearts : 0}
                icon={<HeartGradientIcon32 width={50} height={50} />} />
              <CounterCard
                onPress={() => navigation.navigate('KissesScreen')}
                title={appLabels.kisses}
                count={userData ? userData.total_kiss : 0}
                icon={<KissGradientIcon32 width={50} height={50} />} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CounterCard
                onPress={() => navigation.navigate('LikesScreen')}
                title={appLabels.likes}
                count={userData ? userData.total_likes : 0}
                icon={<LikeGradientIcon32 width={50} height={50} />} />
              <CounterCard
                onPress={() => navigation.navigate('FriendsScreen')}
                title={appLabels.friends}
                count={userData ? userData.totalfriends : 0}
                icon={<FriendGradientIcon32 width={50} height={50} />} />
              <CounterCard
                onPress={() => { }}
                title={appLabels.stickers}
                count={userData ? userData.stickers : 0}
                icon={<StickerGradientIcon32 width={50} height={50} />} />
            </View>
          </View>

          <View style={{ borderBottomWidth: 1, borderColor: Colors.grey, marginHorizontal: 10 }} />
          <CardHeader
            title={appLabels.photos}
            onPress={() => navigation.navigate('UserPhotos')} />


          <CardHeader
            title={appLabels.account_info}
            onPress={() => navigation.navigate('AccountDetail')}
          />

          <CardHeader
            title={`${appLabels.appearance} & ${appLabels.interests}`}
            onPress={() => navigation.navigate('AppearanceScreen')}
          />

          {/* <CardHeader
            title={"Notifications"}
            onPress={() => { }} /> */}


          <CardHeader
            title={appLabels.language}
            onPress={onLanguagePress} />

          <CardHeader
            title={appLabels.privacy_policy}
            onPress={() => navigation.navigate('PrivacyPolicy')} />

          <CardHeader
            title={`${appLabels.help} & ${appLabels.support}`}
            onPress={() => navigation.navigate('HelpAndSupport')} />

          <AppText
            onPress={onLogout}
            type={'bold'}
            color={Colors.red}
            size={18}
            onPress={() => setDeleteAccountModalVisible(true)}
            style={{ marginTop: 40, marginBottom: 10, textAlign: 'center' }}>{"Delete Account"}</AppText>

          <AppText
            onPress={() => setLogoutModalVisible(true)}
            type={'bold'}
            size={18}
            style={{ marginBottom: 20, textAlign: 'center' }}>{appLabels.logout}</AppText>

          <ModeratorActivityModal
            visible={activityModalVisible}
            onHideModal={() => setActivityModalVisible(false)}
            type={activityType}
          />
          <DeleteAccountModal
            visible={deleteAccountModalVisible}
            onHideModal={() => setDeleteAccountModalVisible(false)}
          />
        </View>
      </ScrollView>
      <AppAlertModal
        visible={isLogoutModalVisible}
        onHideModal={() => setLogoutModalVisible(false)}
        title={appLabels.logout}
        message={"Are you sure you want to logout?"}
        button1Title={appLabels.logout}
        button2Title={appLabels.cancel}
        onButton1Press={onLogout}
      />
    </View>
  );
}

const CounterCard = ({ title, count, icon, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.cardContainer, { flex: 1, margin: 5 }]}>
      <View style={{ marginBottom: -10 }}>
        {icon}
      </View>
      <AppText type={'bold'} size={16}>{count}</AppText>
      <AppText type={'regular'} size={12} style={{ marginTop: -3 }}>{title}</AppText>
    </TouchableOpacity>
  )
}

const CardHeader = ({ title, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.cardHeaderContainer}>
      <AppText type={'medium'} size={16} color={Colors.black}>{title}</AppText>
      <ArrowRightIcon width={24} height={24} />
    </TouchableOpacity>
  )
}