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
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AppText } from '../../../components';
import { Icons, Colors } from '../../../constants';
import styles from './style';
import { useSelector } from 'react-redux';

export default function UserProfileActionTab(props) {
  const navigation = useNavigation();

  const { appLabels } = useSelector((state) => state.appState);

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
        {appLabels.settings}
      </AppText>

      <ActionHolder
        onPress={() => alert(appLabels.edit_profile)}
        label={appLabels.edit_profile}
      />

      <ActionHolder
        onPress={() => alert(appLabels.change_password)}
        label={appLabels.change_password}
      />

      <ActionHolder
        onPress={() => alert(appLabels.deactivate_account)}
        label={appLabels.deactivate_account}
      />

      <ActionHolder onPress={() => alert(appLabels.credit_log)} label={appLabels.credit_log} />

      <ActionHolder onPress={onLogout} label={appLabels.logout} />

      <AppText
        type={'bold'}
        size={13}
        style={{
          textAlign: 'center',
          textTransform: 'uppercase',
          padding: 10,
        }}>
        {appLabels.profile_info}
      </AppText>

      <ActionHolder
        onPress={() => alert(appLabels.privacy_policy)}
        label={appLabels.privacy_policy}
      />

      <ActionHolder
        onPress={() => alert(appLabels.terms_of_service)}
        label={appLabels.terms_of_service}
      />

      <ActionHolder onPress={() => alert(appLabels.revocation)} label={appLabels.revocation} />

      <ActionHolder
        onPress={() => alert(appLabels.about_chat_signal)}
        label={appLabels.about_chat_signal}
      />

      <ActionHolder onPress={() => alert(appLabels.contact)} label={appLabels.contact} />
    </ScrollView>
  );
}

const ActionHolder = (props) => {
  return (
    <TouchableOpacity
      style={styles.propertyContainer}
      onPress={props.onPress}
      activeOpacity={0.5}>
      <AppText type={'medium'} size={13}>
        {props.label}
      </AppText>
      <Image
        source={Icons.right_arrow}
        style={{ height: 14, width: 14, resizeMode: 'cover' }}
      />
    </TouchableOpacity>
  );
};
