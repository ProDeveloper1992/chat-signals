import React, { useEffect, useState } from 'react';
import { Keyboard, View, TouchableWithoutFeedback, FlatList, TouchableOpacity } from 'react-native';
import { ChatDetailHeader } from '../../components/Headers';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style';
import { AppText, ChatBubble, ChatInput, CommonImage } from '../../components';
import { Colors, Icons } from '../../constants';
import { getChatConversation } from '../../redux/actions/user-actions';
import { InfoIcon } from '../../constants/svg-icons';
import { sendMessage } from '../../redux/actions/chat-actions';

const ChatDetail = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const customer = props.route.params.item;

  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);

  const { userData } = useSelector((state) => state.userState);

  useEffect(() => {
    getChatMessages();
  }, []);

  const getChatMessages = async () => {
    const response = await dispatch(getChatConversation(customer.user.id));
    if (response.meta.status) {
      setMessages(response.data);
    }
  }

  const isMessageFromUser = (item) => {
    if (item.from_id == userData.id) {
      return true;
    } else {
      return false;
    }
  }

  const onSendTextMessage = async () => {
    let messageToSend = {
      id: 109,
      customer_id: customer.user.id,
      message: messageText,
      // file:'',
      // gift_id:null
    };
    await dispatch(sendMessage(messageToSend));
    setMessageText('')
    const response = await dispatch(getChatConversation(customer.user.id));
    if (response.meta.status) {
      setMessages(response.data);
    }
  }

  return (
    // <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={styles.container}>
      <ChatDetailHeader
        leftIcon={Icons.user_profile}
        onLeftPress={() => navigation.goBack()}
        label={customer.user.username}
      />
      <View style={styles.userDetailHeader}>
        <CommonImage size={44} borderColor={Colors.white} />
        <View style={{ flex: 1, paddingHorizontal: 12 }}>
          <AppText type={'bold'} size={18}>{customer.user.username}</AppText>
          <AppText type={'regular'} size={12} color={Colors.greydark}>{"Online"}</AppText>
        </View>
        <TouchableOpacity style={{ marginBottom: -10 }}>
          <InfoIcon width={40} height={40} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatBubble item={item} isFromUser={isMessageFromUser(item)} />
        )}
        keyExtractor={(item, index) => String(index)}
      />
      <ChatInput
        value={messageText}
        placeholder={'Type message...'}
        onSendPress={() => onSendTextMessage()}
        onChangeMessage={(text) => setMessageText(text)} />
    </View>
    // </TouchableWithoutFeedback>
  );
};

export default ChatDetail;
