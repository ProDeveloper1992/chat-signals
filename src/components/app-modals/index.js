import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleAddPassionsModal,
  toggleFlirtFilterModal,
  toggleGallerySwiperModal,
  toggleLanguageModal,
  toggleMoreGenderModal,
  toggleSexualOrientationModal
} from '../../redux/actions/app-modals-actions';
import LanguageSelectionModal from './language-selection-modal';
import ModeratorActivityModal from './moderator-activity-modal';
import GallerySwiperModal from './gallery-swiper-modal';
import WebViewModal from './webview-modal';
import RegisterLandingModal from './register-landing-modal';
import ForgotPasswordModal from './forgot-password-modal';
import DeleteAccountModal from './delete-account-modal';
import AddPassionsModal from './add-passions-modal';
import MoreGenderModal from './more-gender-modal';
import SexualOrientationModal from './sexual-orientation-modal';
import FlirtFilterModal from './filter-flirts-modal';

export { ModeratorActivityModal, WebViewModal, RegisterLandingModal, ForgotPasswordModal, DeleteAccountModal };

export default function AppModals(props) {
  const dispatch = useDispatch();

  const { isLanguageModalVisible,
    isGAllerySwiperModalVisible,
    isAddPassionsModalVisible,
    isMoreGenderModalVisible,
    isSexualOrientationModalVisible,
    isFlirtFilterModalVisible } = useSelector((state) => state.appModalState);

  const LANGUAGE_MODAL = 'LANGUAGE_MODAL';
  const GALLERY_SWIPER_MODAL = 'GALLERY_SWIPER_MODAL';
  const ADD_PASSIONS_MODAL = 'ADD_PASSIONS_MODAL';
  const MORE_GENDER_MODAL = 'MORE_GENDER_MODAL';
  const SEXUAL_ORIENTATION_MODAL = 'SEXUAL_ORIENTATION_MODAL';
  const FLIRT_FILTER_MODAL = 'FLIRT_FILTER_MODAL';

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
      case MORE_GENDER_MODAL:
        dispatch(toggleMoreGenderModal(false));
        break;
      case SEXUAL_ORIENTATION_MODAL:
        dispatch(toggleSexualOrientationModal(false));
        break;
      case FLIRT_FILTER_MODAL:
        dispatch(toggleFlirtFilterModal(false));
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
      <MoreGenderModal
        visible={isMoreGenderModalVisible}
        onHideModal={() => onCloseModal(MORE_GENDER_MODAL)}
      />
      <SexualOrientationModal
        visible={isSexualOrientationModalVisible}
        onHideModal={() => onCloseModal(SEXUAL_ORIENTATION_MODAL)}
      />
      <FlirtFilterModal
        visible={isFlirtFilterModalVisible}
        onHideModal={() => onCloseModal(FLIRT_FILTER_MODAL)}
      />
    </>
  );
}
