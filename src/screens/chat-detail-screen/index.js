import React from 'react';
import {Keyboard, View, Text, TouchableWithoutFeedback} from 'react-native';
import {ChatDetailHeader} from '../../components/Headers';
import {useNavigation} from '@react-navigation/native';
import {toggleLanguageModal} from '../../redux/actions/app-modals-actions';
import {useDispatch} from 'react-redux';
import {Icons} from '../../constants';
import styles from './style';
import { ChatInput } from '../../components';

const ChatDetail = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userItem = props.route.params.item;

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={styles.container}>
      <ChatDetailHeader
        leftIcon={{uri: userItem.profileImage}}
        onLeftPress={() => navigation.goBack()}
        label={userItem.userName}
      />
      <Text>{"WORK IN PROGRESS......."}</Text>
      <ChatInput placeholder={'Send message'} onSendPress={()=>alert('Coming soon...')}/>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatDetail;
