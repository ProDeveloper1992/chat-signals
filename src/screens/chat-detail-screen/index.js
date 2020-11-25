import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ChatDetailHeader} from '../../components/Headers';
import {useNavigation} from '@react-navigation/native';
import {toggleLanguageModal} from '../../redux/actions/app-modals-actions';
import {useDispatch} from 'react-redux';
import {Icons} from '../../constants';
import styles from './style';

const ChatDetail = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userItem = props.route.params.item;

  return (
    <View style={styles.container}>
      <ChatDetailHeader
        leftIcon={{uri: userItem.profileImage}}
        onLeftPress={() => navigation.goBack()}
        label={userItem.userName}
      />
      <Text>{"WORK IN PROGRESS......."}</Text>
    </View>
  );
};

export default ChatDetail;
