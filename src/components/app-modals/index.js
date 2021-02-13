import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddPassionsModal, toggleGallerySwiperModal, toggleLanguageModal } from '../../redux/actions/app-modals-actions';
import LanguageSelectionModal from './language-selection-modal';
import ModeratorActivityModal from './moderator-activity-modal';
import GallerySwiperModal from './gallery-swiper-modal';
import WebViewModal from './webview-modal';
import RegisterLandingModal from './register-landing-modal';
import ForgotPasswordModal from './forgot-password-modal';
import DeleteAccountModal from './delete-account-modal';
import AddPassionsModal from './add-passions-modal';

export { ModeratorActivityModal, WebViewModal, RegisterLandingModal, ForgotPasswordModal, DeleteAccountModal };

export default function AppModals(props) {
  const dispatch = useDispatch();

  const { isLanguageModalVisible,
    isGAllerySwiperModalVisible,
    isAddPassionsModalVisible } = useSelector((state) => state.appModalState);

  const LANGUAGE_MODAL = 'LANGUAGE_MODAL';
  const GALLERY_SWIPER_MODAL = 'GALLERY_SWIPER_MODAL';
  const ADD_PASSIONS_MODAL = 'ADD_PASSIONS_MODAL';

  const onCloseModal = (modal) => {
    switch (modal) {
      case LANGUAGE_MODAL:
        dispatch(toggleLanguageModal(false));
        break;
      case GALLERY_SWIPER_MODAL:
        dispatch(toggleGallerySwiperModal(false, []));
        break;
      case ADD_PASSIONS_MODAL:
        dispatch(toggleAddPassionsModal(false));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <LanguageSelectionModal
        visible={isLanguageModalVisible}
        onHideModal={() => onCloseModal(LANGUAGE_MODAL)}
      />
      <GallerySwiperModal
        visible={isGAllerySwiperModalVisible}
        onHideModal={() => onCloseModal(GALLERY_SWIPER_MODAL)}
      />
      <AddPassionsModal
        visible={isAddPassionsModalVisible}
        onHideModal={() => onCloseModal(ADD_PASSIONS_MODAL)}
      />
    </>
  );
}
