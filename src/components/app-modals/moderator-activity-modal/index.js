import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, Icons } from '../../../constants';
import { AppButton, AppText } from '../../index';
import styles from './style';
import {
  CloseIcon,
  FriendGradientIcon32,
  KissGradientIcon32,
  LikeGradientIcon32,
  ChatGradientIcon,
  StickerGradientIcon32,
  HeartGradientIcon32,
  CoinGradientIcon
} from '../../../constants/svg-icons'
import { sendMessage } from '../../../redux/actions/chat-actions'
import { getGeneralSettingValueByName } from '../../../utils/common';

export default function ActivityModal({ visible, onHideModal, type, moderator, onSentItem, onBuyCoins }) {

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
        return getGeneralSettingValueByName('prices_kiss');

      case 'like':
        return getGeneralSettingValueByName('prices_kiss');

      case 'chat':
        return 0;

      case 'addfriend':
        return getGeneralSettingValueByName('prices_friend');

      case 'sticker':
        return getGeneralSettingValueByName('prices_kiss');

      case 'heart':
        return getGeneralSettingValueByName('prices_kiss');

      default:
        return 0;
    }
  };

  const onSendPress = async () => {
    switch (type) {
      case 'kiss':
        let kisMessageToSend = {
          id: moderator.id,
          customer_id: userData.id,
          message: `💋 You sent a kiss.`,
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
          message: `👍🏽 You sent a like.`,
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
          message: `👯 You sent a friend request.`,
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

  const isEnoughCredit = () => {
    if (userData && userData.credit * 1 > 0) {
      let userCredit = userData.credit * 1;
      if (userCredit >= getTypeCost(type) * 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const onBuyCoinsPress = () => {
    onHideModal();
    onBuyCoins();
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
        {isEnoughCredit() ? (
          <View style={{ flexGrow: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', marginTop: '5%', marginBottom: '20%' }}>
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
        ) : (
          <View style={{ flexGrow: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', marginTop: '5%', marginBottom: '20%' }}>
              <AppText type={'bold'} size={24} color={Colors.black}>
                {"Not enough coins"}
              </AppText>
              <View style={{ alignItems: 'center', justifyContent: 'center', maxWidth: '65%', marginTop: "10%" }}>
                <CoinGradientIcon width={100} height={100} />
                <AppText size={16} style={{ textAlign: 'center', marginTop: -20 }}>{"Sorry, but you don’t have enough coins to send this message."}</AppText>
              </View>
            </View>

            <AppButton title={"Buy coins now"} onPress={onBuyCoinsPress} />
          </View>
        )}
      </View>
    </Modal>
  );
}
