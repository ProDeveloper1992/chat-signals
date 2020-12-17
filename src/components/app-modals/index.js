import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleGallerySwiperModal, toggleLanguageModal } from '../../redux/actions/app-modals-actions';
import LanguageSelectionModal from './language-selection-modal';
import ModeratorActivityModal from './moderator-activity-modal';
import GallerySwiperModal from './gallery-swiper-modal';

export { ModeratorActivityModal };

export default function AppModals(props) {
  const dispatch = useDispatch();

  const { isLanguageModalVisible, isGAllerySwiperModalVisible } = useSelector((state) => state.appModalState);

  const LANGUAGE_MODAL = 'LANGUAGE_MODAL';
  const GALLERY_SWIPER_MODAL = 'GALLERY_SWIPER_MODAL';

  const onCloseModal = (modal) => {
    switch (modal) {
      case LANGUAGE_MODAL:
        dispatch(toggleLanguageModal(false));
        break;
      case GALLERY_SWIPER_MODAL:
        dispatch(toggleGallerySwiperModal(false,[]));
      default:
        break;
    }
  };

  return (
    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <LanguageSelectionModal
        visible={isLanguageModalVisible}
        onHideModal={()=>onCloseModal(LANGUAGE_MODAL)}
      />
      <GallerySwiperModal
        visible={isGAllerySwiperModalVisible}
        onHideModal={()=>onCloseModal(GALLERY_SWIPER_MODAL)}
      />
    </View>
  );
}
