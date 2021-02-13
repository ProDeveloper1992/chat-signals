import { TOGGLE_GALLERY_SWIPER_MODAL, TOGGLE_LANGUAGE_SELECTION_MODAL, TOGGLE_ADD_PASSIONS_MODAL } from '../actions/types';

const initialState = {
    isLanguageModalVisible: false,
    isGAllerySwiperModalVisible: false,
    isAddPassionsModalVisible: false,
    gallerySwiperImages: [],
    initialGalleryImageIndex: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_LANGUAGE_SELECTION_MODAL:
            return {
                ...state,
                isLanguageModalVisible: action.payload
            };

        case TOGGLE_GALLERY_SWIPER_MODAL:
            return {
                ...state,
                initialGalleryImageIndex: action.payload.imageIndex,
                gallerySwiperImages: action.payload.images,
                isGAllerySwiperModalVisible: action.payload.visible,
            };

        case TOGGLE_ADD_PASSIONS_MODAL:
            return {
                ...state,
                isAddPassionsModalVisible: action.payload
            }

        default:
            return state;
    }
}
