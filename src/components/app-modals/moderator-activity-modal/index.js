import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { Colors, Icons } from '../../../constants';
import { AppButton, AppText } from '../../index';
import styles from './style';
import { CloseIcon, FriendGradientIcon32, KissGradientIcon32, LikeGradientIcon32, ChatGradientIcon, StickerGradientIcon32 } from '../../../constants/svg-icons'

export default function ActivityModal({ visible, onHideModal, type }) {

  const { appLabels, generalSettings } = useSelector((state) => state.appState);


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
          onPress={onHideModal}
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
