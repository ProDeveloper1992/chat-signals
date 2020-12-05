import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../../constants';
import {changeAppLanguage} from '../../../redux/actions/app-actions';
import {CountryPicker, GradientButton, AppText} from '../../index';
import styles from './style';

export default function LanguageSelectionModal({visible, onHideModal}) {
  const dispatch = useDispatch();
  const {appLabels} = useSelector((state) => state.appState);

  const onChangeAppLanguage = (language) => {
    // dispatch(changeAppLanguage(language.country_code));
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
        <CountryPicker onChangeLanguage={onChangeAppLanguage} />
      </View>
    </Modal>
  );
}
