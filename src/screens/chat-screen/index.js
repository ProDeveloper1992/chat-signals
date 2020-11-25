import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GeneralHeader} from '../../components/Headers';
import {useNavigation} from '@react-navigation/native';
import {toggleLanguageModal} from '../../redux/actions/app-modals-actions';
import {useDispatch} from 'react-redux';
import {Icons} from '../../constants';
import styles from './style';
import {ChatListItem} from '../../components/app-list-items'

const Chat = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  return <View style={styles.container}>
    <GeneralHeader
        rightIcon={Icons.user_profile}
        onRightPress={() => {}}
        onLeftPress={() => {}}
        onLeftPress={()=>navigation.navigate('UserProfile')}
        onLanguagePress={() => dispatch(toggleLanguageModal(true))}
        LanguageIcon={Icons.icon_languages}
        leftIcon={Icons.search}
        label={'Chat'}
      />
      <ChatListItem/>
  </View>;
};

export default Chat;
