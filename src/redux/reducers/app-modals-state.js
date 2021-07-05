import {
    TOGGLE_GALLERY_SWIPER_MODAL,
    TOGGLE_LANGUAGE_SELECTION_MODAL,
    TOGGLE_ADD_PASSIONS_MODAL,
    TOGGLE_MORE_GENDER_MODAL,
    TOGGLE_SEXUAL_ORIENTATION_MODAL,
    TOGGLE_FLIRT_FILTER_MODAL,
    TOGGLE_COINS_EARNING_MODAL
} from '../actions/types';

const initialState = {
    isLanguageModalVisible: false,
    isGAllerySwiperModalVisible: false,
    isAddPassionsModalVisible: false,
    isMoreGenderModalVisible: false,
    isSexualOrientationModalVisible: false,
    isFlirtFilterModalVisible: false,
    isCoinsEarningModalVisible: false,
    dailyBonusCoins: 0,
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

        case TOGGLE_MORE_GENDER_MODAL:
            return {
                ...state,
                isMoreGenderModalVisible: action.payload
            }

        case TOGGLE_SEXUAL_ORIENTATION_MODAL:
            return {
                ...state,
                isSexualOrientationModalVisible: action.payload
            }

        case TOGGLE_FLIRT_FILTER_MODAL:
            return {
                ...state,
                isFlirtFilterModalVisible: action.payload
            }

        case TOGGLE_COINS_EARNING_MODAL:
            return {
                ...state,
                isCoinsEarningModalVisible: action.payload.visible,
                dailyBonusCoins: action.payload.coins,
            }

        default:
            return state;
    }
}
