import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, Icons } from '../../../constants';
import { AppButton, AppText } from '../../index';
import styles from './style';
import { CloseIcon, FriendGradientIcon32, KissGradientIcon32, LikeGradientIcon32, ChatGradientIcon, StickerGradientIcon32, HeartGradientIcon32 } from '../../../constants/svg-icons'
import { sendMessage } from '../../../redux/actions/chat-actions'

export default function ActivityModal({ visible, onHideModal, type, moderator, onSentItem }) {

  const dispatch = useDispatch();

  const { appLabels, generalSettings } = useSelector((state) => state.appState);
  const { userData } = useSelector((state) => state.userState);

  const [isSending, setIsSending] = useState(false);


  const getTitle = (type) => {
    switch (type) {
      case 'kiss':
        return appLabels.kisses;

      case 'like':
        return appLabels.like;

      case 'chat':
        return appLabels.chat;

      case 'addfriend':
        return "Friend request";

      case 'sticker':
        return "Sticker";

      case 'heart':
        return "Heart";

      default:
        return 'Title';
    }
  };

  const getActivityImage = (type) => {
    switch (type) {
      case 'kiss':
        return <KissGradientIcon32 width={150} height={150} />;

      case 'like':
        return <LikeGradientIcon32 width={150} height={150} />;

      case 'chat':
        return <ChatGradientIcon width={150} height={150} />;

      case 'addfriend':
        return <FriendGradientIcon32 width={150} height={150} />;

      case 'sticker':
        return <StickerGradientIcon32 width={150} height={150} />;

      case 'heart':
        return <HeartGradientIcon32 width={150} height={150} />;

      default:
        return null;
    }
  };

  const getTypeCost = (type) => {
    switch (type) {
      case 'kiss':
        return getCoinByType('prices_kiss');

      case 'like':
        return getCoinByType('prices_kiss');

      case 'chat':
        return 0;

      case 'addfriend':
        return getCoinByType('prices_friend');

      case 'sticker':
        return getCoinByType('prices_kiss');

      case 'heart':
        return getCoinByType('prices_kiss');

      default:
        return 0;
    }
  };

  const getCoinByType = (type) => {
    if (generalSettings.length > 0) {
      let type_value = 0;
      for (let setting of generalSettings) {
        if (setting.name === type) {
          type_value = setting.value;
        }
      }
      return type_value;
    } else {
      return 0;
    }
  }

  const onSendPress = async () => {
    switch (type) {
      case 'kiss':
        let kisMessageToSend = {
          id: moderator.id,
          customer_id: userData.id,
          // message: '',
          send_kiss: 3
        };
        console.log("kisMessageToSend", kisMessageToSend)
        setIsSending(true);
        await dispatch(sendMessage(kisMessageToSend));
        setIsSending(false);
        onSentItem();
        onHideModal();
        break;
      case 'like':
        let likeMessageToSend = {
          id: moderator.id,
          customer_id: userData.id,
          // message: '',
          send_like: 2
        };
        console.log("likeMessageToSend", likeMessageToSend)
        setIsSending(true);
        await dispatch(sendMessage(likeMessageToSend));
        setIsSending(false);
        onSentItem();
        onHideModal();
        break;

      case 'addfriend':
        let messageToSend = {
          id: moderator.id,
          customer_id: userData.id,
          // message: '',
          send_friends: 1
        };
        console.log("messageToSend", messageToSend)
        setIsSending(true);
        await dispatch(sendMessage(messageToSend));
        setIsSending(false);
        onSentItem();
        onHideModal();
        break;

      case 'sticker':
        onHideModal();
        break;

      case 'heart':
        onHideModal();
        break;

      default:
        onHideModal();
        break;
    }
  }

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.4}
      animationInTiming={500}
      animationOutTiming={500}
      onBackdropPress={onHideModal}
      onBackButtonPress={onHideModal}
      style={styles.modalContainer}>
      <View style={styles.modalSubContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={onHideModal}>
            <CloseIcon width={28} height={28} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginTop: '5%', marginBottom: '20%' }}>
          <AppText type={'bold'} size={24} color={Colors.black}>
            {type != 'chat' && 'Send '}{getTitle(type)}
          </AppText>
          {/* <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 5,
              marginVertical: 10,
            }}
            source={getActivityImage(type)}
          /> */}
          {getActivityImage(type)}
          {getTypeCost(type) * 1 > 0 && (
            <AppText
              type={'bold'}
              size={16}
              color={Colors.black}
              style={{ marginTop: -30 }}>
              <AppText>{'Cost '}</AppText>
              {`${getTypeCost(type)} ${appLabels.Coins}`}
            </AppText>
          )}
        </View>
        <AppButton
          title={'Send'}
          style={{ marginVertical: 10 }}
          onPress={onSendPress}
          loading={isSending}
        />
        <AppButton
          type={'light'}
          title={'Cancel'}
          onPress={onHideModal}
        />
      </View>
    </Modal>
  );
}
