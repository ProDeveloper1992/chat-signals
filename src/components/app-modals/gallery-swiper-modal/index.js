import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';

import styles from './style';
import { CloseWhiteTransparentIcon } from '../../../constants/svg-icons';
import { AppText } from '../..';
import { Colors, DEFAULT_AVATAR_URL, DEFAULT_IMAGE_URL } from '../../../constants';

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
        <ImageViewer
          style={{ flex: 1 }}
          imageUrls={gallerySwiperImages}
          enableSwipeDown
          enablePreload
          index={initialGalleryImageIndex}
          swipeDownThreshold={150}
          onSwipeDown={onHideModal}
          renderIndicator={() => null}
          failImageSource={{ url: DEFAULT_IMAGE_URL }}
          loadingRender={() => (
            <AppText size={18} color={Colors.white}>
              {'Loading ...'}
            </AppText>
          )}
        />
      </View>
      {/* <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20 }} onPress={onHideModal}>
        <CloseWhiteTransparentIcon width={30} height={30} />
      </TouchableOpacity> */}
    </Modal>
  );
}
