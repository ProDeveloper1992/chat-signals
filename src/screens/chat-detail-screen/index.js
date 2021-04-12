import React, { useEffect, useMemo, useState } from 'react';
import { Keyboard, View, TouchableWithoutFeedback, FlatList, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { ChatDetailHeader } from '../../components/Headers';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style';
import { AppText, ChatBubble, ChatInput, CommonImage } from '../../components';
import { Colors, Icons } from '../../constants';
import { getChatConversation } from '../../redux/actions/user-actions';
import { InfoIcon } from '../../constants/svg-icons';
import { sendMessage } from '../../redux/actions/chat-actions';
import { ModeratorActivityModal, ModeratorChatDetailModal } from '../../components/app-modals';
import { ActionDispatcher } from '../../redux/actions';
import { GET_CHAT_CONVERSATION_SUCCESS } from '../../redux/actions/types';

const ChatDetail = (props) => {
  let listViewRef;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const moderator = props.route.params.item;

  const { userData, authToken } = useSelector((state) => state.userState);
  const { conversation } = useSelector((state) => state.chatState);

  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(conversation);
  const [activityType, setActivityType] = useState('kiss');
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [moderatorDetailModalVisible, setModeratorDetailModalVisible] = useState(false);


  useEffect(() => {
    getChatMessages();

    console.log("moderator", moderator)
  }, []);

  useMemo(() => {
    if (!isFocused) {
      dispatch(ActionDispatcher(GET_CHAT_CONVERSATION_SUCCESS, []));
    }
  }, [isFocused])

  useMemo(() => {
    setMessages(conversation);
  }, [conversation])

  const getChatMessages = async () => {
    const response = await dispatch(getChatConversation(moderator.user.id));
    if (response.meta.status) {
      setMessages(response.data);
    }
  }

  const isMessageFromUser = (item) => {
    if (userData && item.from_id == userData.id) {
      return true;
    } else {
      return false;
    }
  }

  // const createFormData = (photo, body) => {
  //   const data = new FormData();

  //   data.append("file", {
  //     name: photo.name,
  //     type: photo.type,
  //     uri:
  //       Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  //   });

  //   Object.keys(body).forEach(key => {
  //     data.append(key, body[key]);
  //   });

  //   return data;
  // };

  const onSendTextMessage = async (attachedDoc) => {

    console.log("attachedDoc", attachedDoc)
    if (attachedDoc != null) {

      setMessageText('');
      let messageToSend = {
        id: moderator.user.id,
        customer_id: userData.id,
        message: messageText,
        file: {
          name: attachedDoc.name,
          type: attachedDoc.type,
          uri: attachedDoc.uri,
        }
      };


      // const formData = new FormData();
      // formData.append('id', moderator.user.id);
      // formData.append('customer_id', userData.id);
      // formData.append('message', messageText);
      // formData.append('file', {
      //   uri: attachedDoc.uri, //Your Image File Path
      //   type: attachedDoc.type,
      //   name: attachedDoc.name,
      // });
      // axios({
      //   url: `${apiRoot}/sendMessage`,
      //   method: 'POST',
      //   data: formData,
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'multipart/form-data',
      //     'Authorization': `Bearer ${authToken}`
      //   }
      // })
      //   .then(function (response) {
      //     console.log("response :", response);
      //   })
      //   .catch(function (error) {
      //     console.log("error from image :", error);
      //   })

      // fetch(`${apiRoot}/sendMessage`, {
      //   method: "POST",
      //   headers: {
      //     "Authorization": `Bearer ${authToken}`,
      //     "Content-Type": "multipart/form-data"
      //   },
      //   body: createFormData(attachedDoc, messageToSend)
      // })
      //   .then(response => response.json())
      //   .then(response => {
      //     console.log("upload succes", response);
      //     alert("Upload success!");
      //   })
      //   .catch(error => {
      //     console.log("upload error", error);
      //     alert("Upload failed!");
      //   });

      await dispatch(sendMessage(messageToSend));
      const response = await dispatch(getChatConversation(moderator.user.id));
      if (response.meta.status) {
        setMessages(response.data);
      }
    } else {
      if (messageText != '') {

        let updated_messages = messages;

        let new_message = {
          attachment: [null, null, null],
          from_id: userData.id,
          fullTime: new Date(),
          id: Math.random(),
          message: messageText,
          seen: "0",
          time: "1 seconds ago",
          to_id: moderator.user.id,
          viewType: "default",
        }

        updated_messages.push(new_message);
        setMessages(updated_messages);
        listViewRef.scrollToEnd({ animated: true })
        setMessageText('');
        let messageToSend = {
          id: moderator.user.id,
          customer_id: userData.id,
          message: messageText,
        };
        await dispatch(sendMessage(messageToSend));
        const response = await dispatch(getChatConversation(moderator.user.id));
        if (response.meta.status) {
          setMessages(response.data);
        }
      }
    }
  }

  const onSendItemToModerator = (type) => {
    setActivityType(type);
    setActivityModalVisible(true);
  }

  const onInfoButtonPress = () => {
    setModeratorDetailModalVisible(true);
  }

  const onViewModeratorProfile = () => {
    // console.log("moderator user", moderator.user)
    navigation.navigate('ModeratorProfile', { item: moderator.user })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : 'height'}
      enabled={Platform.OS === "ios" ? true : false}
      style={styles.container}
    >
      <View style={styles.container}>
        <View>
          <ChatDetailHeader
            leftIcon={Icons.user_profile}
            onLeftPress={() => navigation.goBack()}
            label={moderator.user.username}
          />
          <View style={styles.userDetailHeader}>
            <CommonImage touchable={false} size={44} borderColor={Colors.white} source={{ uri: moderator.profile_picture }} />
            <View style={{ flex: 1, paddingHorizontal: 12 }}>
              <AppText type={'bold'} size={18}>{moderator.user.username}</AppText>
              <AppText type={'regular'} size={12} color={Colors.greydark}>{moderator.user.is_active * 1 == 1 ? "Online" : "Offline"}</AppText>
            </View>
            <TouchableOpacity
              onPress={onInfoButtonPress}
              style={{ marginBottom: -10 }}>
              <InfoIcon width={40} height={40} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          ref={(ref) => {
            listViewRef = ref;
          }}
          onContentSizeChange={() => listViewRef.scrollToEnd({ animated: true })}
          data={messages}
          extraData={messages}
          contentContainerStyle={{ flexGrow: 1, paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ChatBubble key={String(index)} item={item} isFromUser={isMessageFromUser(item)} />
          )}
          keyExtractor={(item, index) => String(index)}
        />
        <ChatInput
          value={messageText}
          placeholder={'Type message...'}
          onSendPress={onSendTextMessage}
          onChangeMessage={(text) => setMessageText(text)}
          onSendItem={onSendItemToModerator}
          onSubmitEditing={onSendTextMessage}
          onFocus={() => {
            setTimeout(() => {
              listViewRef.scrollToEnd({ animated: true })
            }, 100);
          }} />
        <ModeratorActivityModal
          visible={activityModalVisible}
          onHideModal={() => setActivityModalVisible(false)}
          moderator={{ id: moderator.user.id }}
          type={activityType}
          onSentItem={getChatMessages}
        />
        <ModeratorChatDetailModal
          visible={moderatorDetailModalVisible}
          onHideModal={() => setModeratorDetailModalVisible(false)}
          moderator={moderator}
          onViewProfile={onViewModeratorProfile}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatDetail;
