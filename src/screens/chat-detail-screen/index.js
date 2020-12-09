import React, { useState } from 'react';
import {Keyboard, View, TouchableWithoutFeedback, FlatList} from 'react-native';
import {ChatDetailHeader} from '../../components/Headers';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import styles from './style';
import { ChatBubble, ChatInput } from '../../components';

const ChatDetail = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userItem = props.route.params.item;

  const [messageText, setMessageText]= useState('');

  const [chatData, setChatData]=useState([
    {
      id: -2105076426,
      type: "Customer",
      from_id: 5,
      to_id: 1,
      body: "Hello",
      attachment: "51cc51b6-6fe5-44f5-a34c-34820b59431c.png,Gift",
      seen: "0",
      created_at: "2020-12-09T11:07:05.000000Z",
      updated_at: "2020-12-09T11:07:07.000000Z",
      moderator_id: 85
    },
    {
      id: -2105073226,
      type: "Customer",
      from_id: 1,
      to_id: 5,
      body: "Hey, whasup???",
      attachment: "51cc51b6-6fe5-44f5-a34c-34820b59431c.png,Gift",
      seen: "1",
      created_at: "2020-12-09T11:07:05.000000Z",
      updated_at: "2020-12-09T11:07:07.000000Z",
      moderator_id: 85
    },
    {
      id: -2105076426,
      type: "Customer",
      from_id: 5,
      to_id: 1,
      body: "Nothing, enjoying party!!",
      attachment: "51cc51b6-6fe5-44f5-a34c-34820b59431c.png,Gift",
      seen: "0",
      created_at: "2020-12-09T11:07:05.000000Z",
      updated_at: "2020-12-09T11:07:07.000000Z",
      moderator_id: 85
    },
    {
      id: -2105073226,
      type: "Customer",
      from_id: 1,
      to_id: 5,
      body: "Great!!!",
      attachment: "51cc51b6-6fe5-44f5-a34c-34820b59431c.png,Gift",
      seen: "1",
      created_at: "2020-12-09T11:07:05.000000Z",
      updated_at: "2020-12-09T11:07:07.000000Z",
      moderator_id: 85
    },
    {
      id: -2105076426,
      type: "Customer",
      from_id: 5,
      to_id: 1,
      body: "What about you?",
      attachment: "51cc51b6-6fe5-44f5-a34c-34820b59431c.png,Gift",
      seen: "0",
      created_at: "2020-12-09T11:07:05.000000Z",
      updated_at: "2020-12-09T11:07:07.000000Z",
      moderator_id: 85
    },
    {
      id: -2105073226,
      type: "Customer",
      from_id: 1,
      to_id: 5,
      body: "I'm going to weekend trip..!",
      attachment: "51cc51b6-6fe5-44f5-a34c-34820b59431c.png,Gift",
      seen: "1",
      created_at: "2020-12-09T11:07:05.000000Z",
      updated_at: "2020-12-09T11:07:07.000000Z",
      moderator_id: 85
    },
    {
      id: -2105076426,
      type: "Customer",
      from_id: 5,
      to_id: 1,
      body: "Wow!!! Woohoo!!!",
      attachment: "51cc51b6-6fe5-44f5-a34c-34820b59431c.png,Gift",
      seen: "0",
      created_at: "2020-12-09T11:07:05.000000Z",
      updated_at: "2020-12-09T11:07:07.000000Z",
      moderator_id: 85
    },
    {
      id: -2105073226,
      type: "Customer",
      from_id: 1,
      to_id: 5,
      body: "Yeah:)",
      attachment: "51cc51b6-6fe5-44f5-a34c-34820b59431c.png,Gift",
      seen: "1",
      created_at: "2020-12-09T11:07:05.000000Z",
      updated_at: "2020-12-09T11:07:07.000000Z",
      moderator_id: 85
    }
  ])

  const isMessageFromUser=(item)=>{
    if(item.from_id == 1){
      return true;
    }else{
      return false;
    }
  }

  const onSendTextMessage=()=>{
    let messageToSend = {
      id: -2105073226,
      type: "Customer",
      from_id: 1,
      to_id: 5,
      body: messageText,
      attachment: "51cc51b6-6fe5-44f5-a34c-34820b59431c.png,Gift",
      seen: "1",
      created_at: "2020-12-09T11:07:05.000000Z",
      updated_at: "2020-12-09T11:07:07.000000Z",
      moderator_id: 85
    }; 
    chatData.push(messageToSend);
  }

  return (
    // <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={styles.container}>
      <ChatDetailHeader
        leftIcon={{uri: userItem.profileImage}}
        onLeftPress={() => navigation.goBack()}
        label={userItem.userName}
      />
      <FlatList
        data={chatData}
        contentContainerStyle={{paddingTop: 20, paddingBottom:80}}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ChatBubble item={item} isFromUser={isMessageFromUser(item)}/>
        )}
        keyExtractor={(item, index) => String(index)}
      />
      <ChatInput placeholder={'Send message'} onSendPress={()=>onSendTextMessage()} onChangeText={(text)=>setMessageText(text)}/>
    </View>
    // </TouchableWithoutFeedback>
  );
};

export default ChatDetail;
