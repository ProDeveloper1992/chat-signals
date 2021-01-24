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
import { NoListData, AppText, BackHeader } from '../../components';
import { Icons, Colors, DEFAULT_AVATAR_URL } from '../../constants';
import ImagePicker from 'react-native-image-picker';
import styles from './style';
import { ModeratorIconLabel, ModeratorHeader } from '../../components';
import ModeratorProfileInfoTab from './user-profile-info-tab';
import ModeratorProfilePhotosTab from './user-profile-photos-tab';
import ModeratorProfileActionTab from './user-profile-action-tab';
import { ModeratorActivityModal } from '../../components/app-modals';
import { useSelector } from 'react-redux';
import { GoogleSignin } from 'react-native-google-signin';
import AsyncStorage from '@react-native-community/async-storage';

export default function UserProfile(props) {
  const { params } = props.route;

  const [activityType, setActivityType] = useState('kisses');
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [cuurentTab, setCurrentTab] = useState(1);
  const [isAccountInfoExpanded, setAccountInfoExpanded] = useState(true);
  const [isMyPhotosExpanded, setMyPhotosExpanded] = useState(true);

  const { userData } = useSelector((state) => state.userState);
  const { appLabels } = useSelector((state) => state.appState);

  useEffect(() => {
    console.log("userData...", userData)
  }, []);

  const renderCurrentTab = () => {
    switch (cuurentTab) {
      case 1:
        return <ModeratorProfileInfoTab />;
    }
  };

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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={{ paddingStart: 15, backgroundColor: Colors.ui_primary }}>
          <BackHeader
            title={'My Profile'}
            onBackPress={() => props.navigation.goBack()}
            rightContent={
              <TouchableOpacity style={{ paddingEnd: 15 }} onPress={onLogout}>
                <AppText>{"Logout"}</AppText>
              </TouchableOpacity>
            }
          />
        </View>
        <View style={[styles.cardContainer, { marginBottom: 0 }]}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.profileImage} source={{ uri: getProfilePicture() }} />
            <View style={{ padding: 15 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.onlineStatusSignal(true)} />
                <AppText type={'bold'} size={16}>{userData.username}</AppText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={styles.smallIcon} source={Icons.coins_icon} />
                <AppText size={16}>{userData.credit}</AppText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <View style={styles.buttonWithIcon(Colors.ui_primary)}>
                  <Image style={[styles.smallIcon, { tintColor: Colors.white }]} source={Icons.chat_inactive} />
                  <AppText color={Colors.white} type={'medium'}>{"Chat"}</AppText>
                </View>
                <View style={styles.buttonWithIcon(Colors.red)}>
                  <Image style={[styles.smallIcon, { tintColor: Colors.white }]} source={Icons.kiss_icon} />
                  <AppText color={Colors.white} type={'medium'}>{"Kiss"}</AppText>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
          <View style={{ flex: 1 }}>
            <CounterCard
              title={'Kiss'}
              count={0}
              icon={Icons.kiss_icon} />
            <CounterCard
              title={'Stickers'}
              count={0}
              icon={Icons.sticker_icon} />
          </View>
          <View style={{ flex: 1 }}>
            <CounterCard
              title={'Likes'}
              count={0}
              icon={Icons.like_icon} />
            <CounterCard
              title={'Visits'}
              count={0}
              icon={Icons.heart_icon} />
          </View>
        </View>

        <CardHeader
          title={"Account Information"}
          isExpanded={isAccountInfoExpanded}
          onPress={() => setAccountInfoExpanded(!isAccountInfoExpanded)} />

        {isAccountInfoExpanded && userData && (
          <View style={styles.cardContainer}>
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
        )}

        <CardHeader
          title={"My photos"}
          isExpanded={isMyPhotosExpanded}
          onPress={() => setMyPhotosExpanded(!isMyPhotosExpanded)} />

        {isMyPhotosExpanded && (
          <View style={styles.cardContainer}>
            <ModeratorProfilePhotosTab
            // photosList={params.item.moderator_photos}
            />
          </View>
        )}

        {/* <View style={styles.cardContainer}>
          <View style={styles.tabViewContainer}>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                ...styles.tabView,
                backgroundColor:
                  cuurentTab === 1 ? Colors.ui_primary_dark : Colors.white,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0
              }}
              onPress={() => setCurrentTab(1)}>
              <AppText
                numberOfLines={1}
                type={'bold'}
                size={16}
                color={cuurentTab === 1 ? Colors.white : Colors.black}>
                {appLabels.profile_info}
              </AppText>
            </TouchableOpacity>

          </View>
          <View style={{ minHeight: 200 }}>{renderCurrentTab()}</View>
        </View> */}

        <ModeratorActivityModal
          visible={activityModalVisible}
          onHideModal={() => setActivityModalVisible(false)}
          type={activityType}
        />
      </View>
    </ScrollView>
  );
}

const CounterCard = ({ title, count, icon }) => {
  return (
    <View style={[styles.cardContainer, { flex: 1, margin: 5 }]}>
      <Image style={[styles.commonIcon, { marginVertical: 5 }]} source={icon} />
      <AppText color={Colors.grey}>{"Receive"}</AppText>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AppText type={'bold'} size={16} style={{ marginEnd: 5 }}>{count}</AppText>
        <AppText type={'bold'} size={16}>{title}</AppText>
      </View>
    </View>
  )
}

const CardHeader = ({ title, onPress, isExpanded }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.cardHeaderContainer}>
      <AppText type={'medium'} size={16} color={Colors.white}>{title}</AppText>
      <Image style={[styles.commonIcon, { tintColor: Colors.white }]} source={isExpanded ? Icons.icon_drop_up : Icons.icon_drop_down} />
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