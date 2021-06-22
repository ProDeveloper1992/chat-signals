import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleAddPassionsModal,
  toggleCoinsEarningModal,
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
import ForgotPasswordModal from './forgot-password-modal';
import DeleteAccountModal from './delete-account-modal';
import AddPassionsModal from './add-passions-modal';
import MoreGenderModal from './more-gender-modal';
import SexualOrientationModal from './sexual-orientation-modal';
import FlirtFilterModal from './filter-flirts-modal';
import SpotlightModal from './spotlight-modal';
import CoinsEarningModal from './coins-earning-modal';
import ModeratorChatDetailModal from './moderator-chat-detail-modal';
import AppAlertModal from './app-alert-modal';
import BoostProfileModal from './boost-profile-modal';
import { DEFAULT_AVATAR_URL } from '../../constants';

export {
  ModeratorActivityModal,
  ModeratorChatDetailModal,
  WebViewModal,
  ForgotPasswordModal,
  DeleteAccountModal,
  SpotlightModal,
  AppAlertModal,
  BoostProfileModal
};

export default function AppModals(props) {
  const dispatch = useDispatch();

  const { isLanguageModalVisible,
    isGAllerySwiperModalVisible,
    isAddPassionsModalVisible,
    isMoreGenderModalVisible,
    isSexualOrientationModalVisible,
    isFlirtFilterModalVisible,
    isCoinsEarningModalVisible } = useSelector((state) => state.appModalState);

  const LANGUAGE_MODAL = 'LANGUAGE_MODAL';
  const GALLERY_SWIPER_MODAL = 'GALLERY_SWIPER_MODAL';
  const ADD_PASSIONS_MODAL = 'ADD_PASSIONS_MODAL';
  const MORE_GENDER_MODAL = 'MORE_GENDER_MODAL';
  const SEXUAL_ORIENTATION_MODAL = 'SEXUAL_ORIENTATION_MODAL';
  const FLIRT_FILTER_MODAL = 'FLIRT_FILTER_MODAL';
  const COINS_EARNING_MODAL = 'COINS_EARNING_MODAL';

  const onCloseModal = (modal) => {
    switch (modal) {
      case LANGUAGE_MODAL:
        dispatch(toggleLanguageModal(false));
        break;
      case GALLERY_SWIPER_MODAL:
        dispatch(toggleGallerySwiperModal(false, [{ url: DEFAULT_AVATAR_URL }]));
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
      case COINS_EARNING_MODAL:
        dispatch(toggleCoinsEarningModal(false));
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
      <CoinsEarningModal
        visible={isCoinsEarningModalVisible}
        onHideModal={() => onCloseModal(COINS_EARNING_MODAL)}
      />
    </>
  );
}
