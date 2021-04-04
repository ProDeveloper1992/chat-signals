import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { NoListData, AppText, BackHeader, GeneralHeader } from '../../components';
import { Icons, Colors, DEFAULT_AVATAR_URL } from '../../constants';
import styles from './style';
import { ModeratorIconLabel, ModeratorHeader } from '../../components';
import ModeratorProfileInfoTab from './user-profile-info-tab';
import ModeratorProfilePhotosTab from './user-profile-photos-tab';
import ModeratorProfileActionTab from './user-profile-action-tab';
import { DeleteAccountModal, ModeratorActivityModal } from '../../components/app-modals';
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
import { toggleLanguageModal } from '../../redux/actions/app-modals-actions';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getFriendsList, userProfileDetail } from '../../redux/actions/user-actions';
import moment from 'moment';

export default function UserProfile(props) {
  const { params } = props.route;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [activityType, setActivityType] = useState('kisses');
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [cuurentTab, setCurrentTab] = useState(1);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [isMyPhotosExpanded, setMyPhotosExpanded] = useState(true);

  //Second Position Page
  const [profileImage, setProfileImage] = useState({ uri: null });

  const { userData, friendsList } = useSelector((state) => state.userState);
  const { appLabels } = useSelector((state) => state.appState);

  useEffect(() => {
    if (isFocused) {
      console.log("userData...", userData)
      dispatch(getFriendsList());
      dispatch(userProfileDetail());
    }
  }, [isFocused]);

  const renderCurrentTab = () => {
    switch (cuurentTab) {
      case 1:
        return <ModeratorProfileInfoTab />;
    }
  };

  const onPickOrCaptureImage = async () => {
    let options = {
      title: 'Select Option',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, async (response) => {
      console.log('Response = ', response);

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
      }
    });
  }

  const showActivityModal = (type) => {
    setActivityType(type);
    setActivityModalVisible(true);
  };

  const getProfilePicture = () => {
    var profilePic = DEFAULT_AVATAR_URL;
    if (
      userData &&
      userData.avatar
    ) {
      profilePic = userData.avatar;
    }
    return profilePic;
  };

  const onLogout = () => {
    Alert.alert('Confirm Logout!', 'Are you sure you want to logout?', [
      {
        text: 'No',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          AsyncStorage.clear();
          try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
          } catch (error) {
            // console.error(error);
          }
          props.navigation.navigate('auth-stack');
        },
      },
    ]);
  }

  const onLanguagePress = () => {
    dispatch(toggleLanguageModal(true));
  }

  return (
    <View style={styles.container}>
      <GeneralHeader label={"Profile"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <View style={styles.profileImageContainer}>
              <Image style={styles.profileImage} source={profileImage.uri ? profileImage : { uri: getProfilePicture() }} />
              <TouchableOpacity
                onPress={onPickOrCaptureImage}
                style={styles.editPenContainer}>
                <EditPenCircleIcon width={18} height={18} />
              </TouchableOpacity>
            </View>

            <View style={{ padding: 15 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppText type={'bold'} size={16}>{`${userData && userData.username}${userData && userData.dob ? `, ${moment().diff(moment(userData.dob, 'YYYY-MM-DD'), 'years')}` : ''}`}</AppText>
              </View>
            </View>

            <TouchableOpacity style={styles.boostButton}>
              <View style={styles.boostIconContainer}>
                <BoostIcon />
              </View>
              <AppText type={'bold'} size={12} uppercase>{"Boost Profile"}</AppText>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, padding: 15 }}>
            <View style={{ flexDirection: 'row' }}>
              <CounterCard
                onPress={() => { }}
                title={'Coins'}
                count={userData ? userData.credit : 0}
                icon={<CoinGradientIcon width={50} height={50} />} />
              <CounterCard
                onPress={() => { }}
                title={'Hearts'}
                count={userData ? userData.total_hearts : 0}
                icon={<HeartGradientIcon32 width={50} height={50} />} />
              <CounterCard
                onPress={() => { }}
                title={'Kisses'}
                count={userData ? userData.total_kiss : 0}
                icon={<KissGradientIcon32 width={50} height={50} />} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CounterCard
                onPress={() => { }}
                title={'Likes'}
                count={userData ? userData.total_likes : 0}
                icon={<LikeGradientIcon32 width={50} height={50} />} />
              <CounterCard
                onPress={() => navigation.navigate('FriendsScreen')}
                title={'Friends'}
                count={userData ? userData.totalfriends : 0}
                icon={<FriendGradientIcon32 width={50} height={50} />} />
              <CounterCard
                onPress={() => { }}
                title={'Stickers'}
                count={userData ? userData.stickers : 0}
                icon={<StickerGradientIcon32 width={50} height={50} />} />
            </View>
          </View>

          {/* <CardHeader
            title={"Account Information"}
            isExpanded={isAccountInfoExpanded}
            onPress={() => setAccountInfoExpanded(!isAccountInfoExpanded)} />

          {isAccountInfoExpanded && userData && (
            <View>
              <AccountInfoItem
                title={'Email'}
                value={userData.email}
                icon={Icons.mail_icon} />
              <AccountInfoItem
                title={'Nickname'}
                value={userData.username}
                icon={Icons.user_profile} />
              <AccountInfoItem
                title={'Gender'}
                value={userData.gender}
                icon={Icons.group_active} />
              <AccountInfoItem
                title={'Language'}
                value={userData.language}
                icon={Icons.icon_languages} />
              <AccountInfoItem
                title={'Referral Code'}
                value={userData.referral_code}
                icon={Icons.chat_inactive} />
              <AccountInfoItem
                title={'Credit'}
                value={userData.credit}
                icon={Icons.chat_inactive} />
            </View>
          )} */}
          <View style={{ borderBottomWidth: 1, borderColor: Colors.grey, marginHorizontal: 10 }} />
          <CardHeader
            title={appLabels.photos}
            isExpanded={isMyPhotosExpanded}
            onPress={() => setMyPhotosExpanded(!isMyPhotosExpanded)} />

          {/* {isMyPhotosExpanded && (
            <ModeratorProfilePhotosTab
            // photosList={params.item.moderator_photos}
            />
          )} */}

          {userData && userData.email && (
            <View style={styles.cardHeaderContainer}>
              <View>
                <AppText type={'regular'} size={14} color={Colors.black}>{"Email"}</AppText>
                <AppText type={'bold'} size={16} color={Colors.black}>{userData.email}</AppText>
              </View>
              <View>
                <AppText type={'bold'} color={Colors.greydark}>{"Verified"}</AppText>
              </View>
            </View>
          )}

          {userData && userData.dob && (
            <View style={styles.cardHeaderContainer}>
              <View>
                <AppText type={'regular'} size={14} color={Colors.black}>{"Birthday"}</AppText>
                <AppText type={'bold'} size={16} color={Colors.black}>{userData.dob}</AppText>
              </View>
            </View>
          )}

          <CardHeader
            title={"Account Details"}
            isExpanded={false}
            onPress={() => { }} />

          <CardHeader
            title={"Notifications"}
            isExpanded={false}
            onPress={() => { }} />

          <CardHeader
            title={"Language"}
            isExpanded={false}
            onPress={onLanguagePress} />

          <CardHeader
            title={"Privacy Policy"}
            isExpanded={false}
            onPress={() => { }} />

          <CardHeader
            title={"Help & Support"}
            isExpanded={false}
            onPress={() => { }} />

          <AppText
            onPress={onLogout}
            type={'bold'}
            color={Colors.red}
            size={18}
            onPress={() => setDeleteAccountModalVisible(true)}
            style={{ marginTop: 40, marginBottom: 10, textAlign: 'center' }}>{"Delete Account"}</AppText>

          <AppText
            onPress={onLogout}
            type={'bold'}
            size={18}
            style={{ marginBottom: 20, textAlign: 'center' }}>{"Logout"}</AppText>

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
    </View>
  );
}

const CounterCard = ({ title, count, icon, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.cardContainer, { flex: 1, margin: 5 }]}>
      {/* <Image style={[styles.commonIcon, { marginVertical: 5 }]} source={icon} /> */}
      <View style={{ marginBottom: -10 }}>
        {icon}
      </View>
      <AppText type={'bold'} size={16}>{count}</AppText>
      <AppText type={'regular'} size={12} style={{ marginTop: -3 }}>{title}</AppText>
    </TouchableOpacity>
  )
}

const CardHeader = ({ title, onPress, isExpanded }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.cardHeaderContainer}>
      <AppText type={'medium'} size={16} color={Colors.black}>{title}</AppText>
      {/* <Image style={[styles.commonIcon, { tintColor: Colors.ui_primary }]} source={isExpanded ? Icons.icon_drop_up : Icons.icon_drop_down} /> */}
      <ArrowRightIcon width={24} height={24} />
    </TouchableOpacity>
  )
}

const AccountInfoItem = ({ title, value, icon }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }}>
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.black, justifyContent: 'center', alignItems: 'center', marginEnd: 10 }}>
        <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: Colors.white }} source={icon} />
      </View>
      <View>
        <AppText type={'bold'} size={16}>{title}</AppText>
        <AppText>{value}</AppText>
      </View>
    </View>
  )
}