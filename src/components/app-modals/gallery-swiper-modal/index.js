import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import GallerySwiper from 'react-native-gallery-swiper';

import {Colors} from '../../../constants';
import { AppText} from '../../index';
import styles from './style';

export default function GallerySwiperModal({visible, onHideModal}) {
  const dispatch = useDispatch();

  const {gallerySwiperImages, initialGalleryImageIndex}=useSelector((state)=>state.appModalState);

  const photosList=[
    {
      uri: 'https://picsum.photos/200',
    },
    {
      uri: 'https://picsum.photos/300',
    },
    {
      uri: 'https://picsum.photos/220',
    },
    {
      uri: 'https://picsum.photos/240',
    },
    {
      uri: 'https://picsum.photos/260',
    },
  ]

  return (
    <Modal
      isVisible={visible}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      backdropOpacity={0.5}
      // animationInTiming={600}
      // animationOutTiming={600}
      onBackdropPress={onHideModal}
      onBackButtonPress={onHideModal}
      style={styles.modalContainer}>
      <View style={styles.modalSubContainer}>
        <GallerySwiper
          images={gallerySwiperImages}
          // initialNumToRender={4}
          initialPage={initialGalleryImageIndex}
          sensitiveScroll={true}
          pageMargin={10}
          scrollViewStyle={{flexGrow:1}}
          resizeMode={'contain'}
          style={{flex:1, backgroundColor:'transparent'}}
        />
      </View>
    </Modal>
  );
}
