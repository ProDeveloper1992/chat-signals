import { ActionDispatcher } from ".";
import {
    TOGGLE_LANGUAGE_SELECTION_MODAL,
    TOGGLE_GALLERY_SWIPER_MODAL,
    TOGGLE_ADD_PASSIONS_MODAL,
    TOGGLE_MORE_GENDER_MODAL,
    TOGGLE_SEXUAL_ORIENTATION_MODAL,
    TOGGLE_FLIRT_FILTER_MODAL,
    TOGGLE_COINS_EARNING_MODAL
} from "./types";


export const toggleLanguageModal = (visible) => (dispatch) =>
    dispatch(ActionDispatcher(TOGGLE_LANGUAGE_SELECTION_MODAL, visible));

export const toggleGallerySwiperModal = (visible, images, initialImageIndex) => (dispatch) =>
    dispatch(ActionDispatcher(TOGGLE_GALLERY_SWIPER_MODAL, { visible: visible, images: images, imageIndex: initialImageIndex }));

export const toggleAddPassionsModal = (visible) => (dispatch) =>
    dispatch(ActionDispatcher(TOGGLE_ADD_PASSIONS_MODAL, visible));

export const toggleMoreGenderModal = (visible) => (dispatch) =>
    dispatch(ActionDispatcher(TOGGLE_MORE_GENDER_MODAL, visible));

export const toggleSexualOrientationModal = (visible) => (dispatch) =>
    dispatch(ActionDispatcher(TOGGLE_SEXUAL_ORIENTATION_MODAL, visible));

export const toggleFlirtFilterModal = (visible) => (dispatch) =>
    dispatch(ActionDispatcher(TOGGLE_FLIRT_FILTER_MODAL, visible));

export const toggleCoinsEarningModal = (visible, coins) => (dispatch) =>
    dispatch(ActionDispatcher(TOGGLE_COINS_EARNING_MODAL, { visible: visible, coins: coins }));