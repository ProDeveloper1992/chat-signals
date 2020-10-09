import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {Colors, Icons} from '../../../constants';
import {GradientButton, AppText} from '../../index';
import styles from './style';

export default function ActivityModal({visible, onHideModal, type}) {
  const getTitle = (type) => {
    switch (type) {
      case 'kisses':
        return 'Kisses';

      case 'like':
        return 'Like';

      case 'chat':
        return 'Chat';

      case 'addfriend':
        return 'Add Friend';

      default:
        return 'Title';
    }
  };

  const getActivityImage = (type) => {
    switch (type) {
      case 'kisses':
        return Icons.kiss_icon;

      case 'like':
        return Icons.like_icon;

      case 'chat':
        return Icons.chat_flat_icon;

      case 'addfriend':
        return Icons.add_friend_icon;

      default:
        return Icons.kiss_icon;
    }
  };

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
        <AppText type={'bold'} size={18} color={Colors.ui_primary_dark}>
          {getTitle(type)}
        </AppText>
        <Image
          style={{
            width: 60,
            height: 60,
            borderRadius: 5,
            marginVertical: 10,
          }}
          source={getActivityImage(type)}
        />
        <AppText type={'bold'} size={16} color={Colors.black}>
          {'4 Coins'}
        </AppText>
        <GradientButton
          title={'Send'}
          style={{marginVertical: 10}}
          onPress={onHideModal}
        />
        <TouchableOpacity onPress={onHideModal}>
          <AppText color={Colors.grey}>{'Back'}</AppText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
