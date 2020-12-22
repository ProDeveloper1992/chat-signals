import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../../constants';
import { LanguagePicker, AppText } from '../../index';
import styles from './style';

export default function LanguageSelectionModal({ visible, onHideModal }) {

  const onChangeAppLanguage = () => {
    onHideModal();
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
          {'Select your language'}
        </AppText>
        <LanguagePicker onChangeLanguage={onChangeAppLanguage} />
      </View>
    </Modal>
  );
}
