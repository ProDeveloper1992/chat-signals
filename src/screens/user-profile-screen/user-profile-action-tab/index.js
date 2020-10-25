import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {AppText} from '../../../components';
import {Icons, Colors} from '../../../constants';
import styles from './style';

export default function UserProfileActionTab(props) {
  const navigation = useNavigation();

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
          navigation.navigate('auth-stack');
        },
      },
    ]);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <AppText
        type={'bold'}
        size={13}
        style={{
          textAlign: 'center',
          textTransform: 'uppercase',
          padding: 10,
        }}>
        {'settings'}
      </AppText>

      <ActionHolder
        onPress={() => alert('Edit Profile')}
        label={'Edit Profile'}
      />

      <ActionHolder
        onPress={() => alert('Search Filter')}
        label={'Search Filter'}
      />

      <ActionHolder
        onPress={() => alert('Change Password')}
        label={'Change Password'}
      />

      <ActionHolder
        onPress={() => alert('Deactivate Account')}
        label={'Deactivate Account'}
      />

      <ActionHolder onPress={() => alert('Credit Log')} label={'Credit Log'} />

      <ActionHolder onPress={onLogout} label={'Logout'} />

      <AppText
        type={'bold'}
        size={13}
        style={{
          textAlign: 'center',
          textTransform: 'uppercase',
          padding: 10,
        }}>
        {'profile-info'}
      </AppText>

      <ActionHolder
        onPress={() => alert('Privacy policy')}
        label={'Privacy policy'}
      />

      <ActionHolder
        onPress={() => alert('Terms of Service')}
        label={'Terms of Service'}
      />

      <ActionHolder onPress={() => alert('Revocation')} label={'Revocation'} />

      <ActionHolder
        onPress={() => alert('About ChatSignal')}
        label={'About ChatSignal'}
      />

      <ActionHolder onPress={() => alert('Contact')} label={'Contact'} />
    </ScrollView>
  );
}

const ActionHolder = (props) => {
  return (
    <TouchableOpacity
      style={styles.propertyContainer}
      onPress={props.onPress}
      activeOpacity={0.5}>
      <AppText type={'medium'} size={12}>
        {props.label}
      </AppText>
      <Image
        source={Icons.right_arrow}
        style={{height: 14, width: 14, resizeMode: 'cover'}}
      />
    </TouchableOpacity>
  );
};
