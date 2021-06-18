import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { Colors } from '../../../constants';
import { LanguagePicker, AppText } from '../../index';
import styles from './style';

export default function LanguageSelectionModal({ visible, onHideModal }) {

  const { appLabels } = useSelector((state) => state.appState);

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
          {appLabels.select_your_language}
        </AppText>
        <LanguagePicker onChangeLanguage={onChangeAppLanguage} />
      </View>
    </Modal>
  );
}
