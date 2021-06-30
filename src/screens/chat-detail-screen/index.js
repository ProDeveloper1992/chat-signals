import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Keyboard, View, TouchableWithoutFeedback, FlatList, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { BackHeader } from '../../components';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './style';
import { AppIndicatorLoader, AppText, ChatBubble, ChatInput, CommonImage, NoListData } from '../../components';
import { Colors, Icons, SCREEN_WIDTH } from '../../constants';
import { ChatGradientIcon, InfoIcon, BlockIcon, DeleteBinIcon } from '../../constants/svg-icons';
import { deleteConversation, sendMessage, markConversationAsSeen, getChatConversation } from '../../redux/actions/chat-actions';
import { AppAlertModal, ModeratorActivityModal, ModeratorChatDetailModal } from '../../components/app-modals';
import { ActionDispatcher } from '../../redux/actions';
import { GET_CHAT_CONVERSATION_SUCCESS } from '../../redux/actions/types';
import RNFetchBlob from 'rn-fetch-blob'
import { apiRoot } from '../../services/api-service';
import { blockModerator } from '../../redux/actions/flirts-actions';
import moment from 'moment';
import { toggleGallerySwiperModal } from '../../redux/actions/app-modals-actions';
import { getGeneralSettingValueByName } from '../../utils/common';
import { getStickersList } from '../../redux/actions/user-actions';

var RNFS = require('react-native-fs');

export default function ChatDetail(props) {
  let listViewRef;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const moderator = props.route.params.item;

  const { appLabels } = useSelector((state) => state.appState);
  const { userData, authToken } = useSelector((state) => state.userState);
  const { conversation, isLoadingConversation } = useSelector((state) => state.chatState);

  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(conversation);
  const [loadingConversation, setLoadingConversation] = useState(true);
  const [activityType, setActivityType] = useState('kiss');
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [moderatorDetailModalVisible, setModeratorDetailModalVisible] = useState(false);
  const [moderatorDetailVisible, setModeratorDetailVisible] = useState(false);
  const [isDeleteConversationModalVisible, setIsDeleteConversationModalVisible] = useState(false);
  const [isBlockUserModalVisible, setIsBlockUserModalVisible] = useState(false);

  const [attachedDoc, setAttachedDocument] = useState(null);
  const [isSendingDocument, setIsSendingDocument] = useState(false);

  const [selectedStickerItem, setSelectedStickerItem] = useState(null);

  const [isDeletingConversation, setIsDeletingConversation] = useState(false);
  const [isBlockingUser, setIsBlockingUser] = useState(false);

  const conversationLength = messages.length;

  useEffect(() => {
    dispatch(ActionDispatcher(GET_CHAT_CONVERSATION_SUCCESS, []));
    getChatMessages();
    dispatch(getStickersList());
    console.log("moderator", moderator)
  }, []);

  // useMemo(() => {
  //   if (isFocused) {
  //     dispatch(ActionDispatcher(GET_CHAT_CONVERSATION_SUCCESS, []));
  //   }
  // }, [isFocused])

  useMemo(() => {
    setMessages(conversation);
  }, [conversation])

  const getChatMessages = async () => {
    const response = await dispatch(getChatConversation(moderator.user.id));
    dispatch(markConversationAsSeen(moderator.user.id));
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

  const onSendTextMessage = async () => {
    if (userData && userData.credit * 1 < getGeneralSettingValueByName('prices_message') * 1) {
      setActivityType('chat');
      setActivityModalVisible(true);

    } else {
      if (attachedDoc != null) {
        console.log("attachedDoc", attachedDoc)

        // RNFetchBlob.fs.stat(attachedDoc.uri)
        //   .then((stats) => {
        //     console.log("PATH OF IMAGE...", stats)
        //     let filePath = `file://${stats.path}`;
        //     if (Platform.OS === 'ios') {
        //       let arr = response.uri.split('/')
        //       const dirs = RNFetchBlob.fs.dirs
        //       filePath = `${dirs.DocumentDir}/${arr[arr.length - 1]}`
        //     }
        //     // setProfileImageFile(filePath);

        //     console.log("filePath", filePath)
        setIsSendingDocument(true);
        RNFetchBlob.fetch('POST', `${apiRoot}/sendMessage`, {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        }, [
          // element with property `filename` will be transformed into `file` in form data
          {
            name: 'file',
            filename: attachedDoc.name,
            type: attachedDoc.type,
            data: RNFetchBlob.wrap(attachedDoc.uri)
          },
          { name: 'id', data: `${moderator.user.id}` },
          { name: 'customer_id', data: `${userData.id}` },
          { name: 'message', data: `${messageText}` },

        ]).then(async (resp) => {
          // let parsedData = await JSON.parse(resp.data);
          console.log("resp", resp);
          dispatch(getChatConversation(moderator.user.id));
          setAttachedDocument(null);
          setMessageText('')
          setIsSendingDocument(false);
        }).catch((err) => {
          setAttachedDocument(null);
          setIsSendingDocument(false);
          setMessageText('')
          console.log("err", err)
          // ...
        })

        // })
        // .catch((err) => {
        //   console.log("PATH ERROR...", err)
        // })

        // await dispatch(sendMessage(messageToSend));
        // const response = await dispatch(getChatConversation(moderator.user.id));
        // if (response.meta.status) {
        //   setMessages(response.data);
        // }
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
  }

  const onSendItemToModerator = (type, stickerItem) => {
    setActivityType(type);
    setActivityModalVisible(true);
    if (stickerItem) {
      setSelectedStickerItem(stickerItem);
    }
  }

  const onInfoButtonPress = () => {
    // setModeratorDetailModalVisible(true);
    setModeratorDetailVisible(true);
  }

  const onViewModeratorProfile = () => {
    // console.log("moderator user", moderator.user)
    navigation.navigate('ModeratorProfile', { item: moderator.user, isFromChat: true })
  }

  const onBuyCoinsPress = () => {
    navigation.goBack();
    navigation.navigate('BuyCoinsTabStack')
  }

  const onDeleteConversation = async () => {
    setIsDeletingConversation(true);
    await dispatch(deleteConversation(moderator.user.id));
    setIsDeletingConversation(false);
    setIsDeleteConversationModalVisible(false);
    setModeratorDetailVisible(false);
  }

  const onBlockUser = async () => {
    setIsBlockingUser(true);
    await dispatch(blockModerator(moderator.user.id));
    setIsBlockingUser(false);
    setIsBlockUserModalVisible(false);
    setModeratorDetailVisible(false);
  }

  const getMessageDay = (date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const msgDate = new Date(date);
    if (
      today.getDate() === msgDate.getDate() &&
      today.getMonth() === today.getMonth()
    )
      return 'Today';
    if (
      yesterday.getDate() === msgDate.getDate() &&
      yesterday.getMonth() === msgDate.getMonth()
    )
      return 'Yesterday';
    return moment(msgDate).format('MM/DD');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : 'height'}
      enabled={Platform.OS === "ios" ? true : false}
      style={styles.container}
    >
      <View style={styles.container}>
        {moderatorDetailVisible ? (
          <View style={styles.container}>
            <BackHeader
              title={appLabels.messages}
              color={Colors.ui_primary}
              onBackPress={() => setModeratorDetailVisible(false)}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: hp(3) }}>
              <CommonImage
                touchable={true}
                size={wp(25)}
                borderColor={Colors.white}
                borderWidth={3}
                isShadow={true}
                source={{ uri: moderator.profile_picture }}
                onPress={() => dispatch(toggleGallerySwiperModal(true, [{ url: moderator.profile_picture }]))} />
              <AppText
                type={'bold'}
                size={hp(3)}
                style={{ marginBottom: -5, marginTop: 10 }}>{moderator.user.username}</AppText>
              <AppText
                onPress={onViewModeratorProfile}
                type={'bold'}
                size={hp(2.5)}
                color={Colors.ui_primary}
                style={{ textDecorationLine: 'underline' }}>{appLabels.view_profile}</AppText>
            </View>
            <TitleWithIcon
              title={appLabels.deleteconversation}
              icon={<DeleteBinIcon />}
              onPress={() => setIsDeleteConversationModalVisible(true)} />
            <TitleWithIcon
              title={appLabels.block_user}
              icon={<BlockIcon />}
              onPress={() => setIsBlockUserModalVisible(true)} />
          </View>
        ) : (
          <View style={styles.container}>
            <BackHeader
              title={appLabels.messages}
              color={Colors.ui_primary}
              onBackPress={() => navigation.goBack()}
            />
            <View style={styles.userDetailHeader}>
              <CommonImage
                touchable={true}
                size={wp(15)}
                borderColor={Colors.white}
                borderWidth={2}
                isShadow={true}
                source={{ uri: moderator.profile_picture }}
                onPress={() => dispatch(toggleGallerySwiperModal(true, [{ url: moderator.profile_picture }]))} />
              <View style={{ flex: 1, paddingHorizontal: 12 }}>
                <AppText type={'bold'} size={hp(2.8)}>{moderator.user.username}</AppText>
                <AppText type={'regular'} size={hp(2)} color={Colors.greydark}>{moderator.user.is_active * 1 == 1 ? appLabels.online : appLabels.offline}</AppText>
              </View>
              <TouchableOpacity
                onPress={onInfoButtonPress}
                style={{ marginBottom: -hp(2) }}>
                <InfoIcon width={hp(6)} height={hp(6)} />
              </TouchableOpacity>
            </View>
            {isLoadingConversation && messages.length == 0 ? (
              <AppIndicatorLoader />
              // <FlatList
              //   data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              //   contentContainerStyle={{ flexGrow: 1, paddingTop: 20 }}
              //   showsVerticalScrollIndicator={false}
              //   renderItem={({ item, index }) => (
              //     <MessagesListItemLoader key={String(index)} />
              //   )}
              //   keyExtractor={(item, index) => String(index)}
              // />
            ) : (
              <FlatList
                ref={(ref) => {
                  listViewRef = ref;
                }}
                onContentSizeChange={() => {
                  if (messages.length > 0) {
                    listViewRef.scrollToEnd({ animated: true })
                  }
                }}
                data={messages}
                extraData={messages}
                contentContainerStyle={{ flexGrow: 1, paddingTop: hp(3) }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <ChatBubble key={String(index)} item={item} isFromUser={isMessageFromUser(item)} />
                )}
                keyExtractor={(item, index) => String(index)}
                ListEmptyComponent={
                  <NoListData
                    icon={<ChatGradientIcon />}
                    title={appLabels.start_conversation} />}
              />
            )}
            <ChatInput
              value={messageText}
              placeholder={`${appLabels.type_message}...`}
              onSendPress={onSendTextMessage}
              onChangeMessage={(text) => setMessageText(text)}
              onSendItem={onSendItemToModerator}
              attachedDocument={attachedDoc}
              isAttachingDocument={isSendingDocument}
              onAttachDocument={(docFile) => setAttachedDocument(docFile)}
              onSubmitEditing={onSendTextMessage}
              // onFocus={() => {
              //   if (Platform.OS == 'ios') {
              //     setTimeout(() => {
              //       if (messages.length > 0) {
              //         listViewRef.scrollToEnd({ animated: true })
              //       }
              //     }, 100);
              //   }
              // }}
              isStickerOpen={props.route.params.isSticker} />
          </View>
        )}
        <ModeratorActivityModal
          visible={activityModalVisible}
          onHideModal={() => setActivityModalVisible(false)}
          moderator={{ id: moderator.user.id }}
          type={activityType}
          onSentItem={getChatMessages}
          onBuyCoins={onBuyCoinsPress}
          selectedStickerItem={selectedStickerItem}
        />
        <ModeratorChatDetailModal
          visible={moderatorDetailModalVisible}
          onHideModal={() => setModeratorDetailModalVisible(false)}
          moderator={moderator}
          onViewProfile={onViewModeratorProfile}
        />
        <AppAlertModal
          visible={isDeleteConversationModalVisible}
          onHideModal={() => setIsDeleteConversationModalVisible(false)}
          title={appLabels.deleteconversation}
          message={appLabels.deletealert}
          button1Title={appLabels.delete}
          isButton1Loading={isDeletingConversation}
          button2Title={appLabels.cancel}
          onButton1Press={onDeleteConversation}
        />
        <AppAlertModal
          visible={isBlockUserModalVisible}
          onHideModal={() => setIsBlockUserModalVisible(false)}
          title={appLabels.block_user}
          message={appLabels.are_you_sure_you_want_to_block}
          button1Title={appLabels.block}
          isButton1Loading={isBlockingUser}
          button2Title={appLabels.cancel}
          onButton1Press={onBlockUser}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export const MessagesListItemLoader = () => (
  <View style={styles.container}>
    <ContentLoader
      speed={1}
      width={SCREEN_WIDTH}
      height={80}
      viewBox={`0 0 ${SCREEN_WIDTH} 80`}
      backgroundColor={Colors.ui_background}
      foregroundColor={Colors.grey}
    >
      <Rect x="10" y="0" rx="15" ry="15" width={SCREEN_WIDTH / 2.5} height="30" />
      <Rect x={SCREEN_WIDTH / 1.8} y="40" rx="15" ry="15" width={SCREEN_WIDTH / 2.5} height="30" />
    </ContentLoader>
  </View>
);

const TitleWithIcon = ({ title, icon, onPress, loading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.titleWithIconContainer}>
      <AppText
        numderOfLines={1}
        type={'medium'}
        size={16}
        style={{ flex: 1 }}>{title}</AppText>
      {icon && (
        <View>
          {icon}
        </View>
      )}
    </TouchableOpacity>
  )
}