import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import GallerySwiper from 'react-native-gallery-swiper';

import styles from './style';
import { CloseWhiteTransparentIcon } from '../../../constants/svg-icons';

export default function GallerySwiperModal({ visible, onHideModal }) {
  const dispatch = useDispatch();

  const { gallerySwiperImages, initialGalleryImageIndex } = useSelector((state) => state.appModalState);

  return (
    <Modal
      isVisible={visible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0.7}
      onBackdropPress={onHideModal}
      onBackButtonPress={onHideModal}
      style={styles.modalContainer}>
      <View style={styles.modalSubContainer}>
        <GallerySwiper
          images={gallerySwiperImages}
          initialPage={initialGalleryImageIndex}
          sensitiveScroll={true}
          enableScale={false}
          pageMargin={10}
          scrollViewStyle={{ flexGrow: 1 }}
          resizeMode={'contain'}
          style={{ flex: 1, backgroundColor: 'transparent' }}
        />
      </View>
      <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20 }} onPress={onHideModal}>
        <CloseWhiteTransparentIcon width={30} height={30} />
      </TouchableOpacity>
    </Modal>
  );
}
