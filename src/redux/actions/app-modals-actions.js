import { ActionDispatcher } from ".";
import { TOGGLE_LANGUAGE_SELECTION_MODAL, TOGGLE_GALLERY_SWIPER_MODAL } from "./types";


export const toggleLanguageModal = (visible) => (dispatch) =>
    dispatch(ActionDispatcher(TOGGLE_LANGUAGE_SELECTION_MODAL, visible));

    export const toggleGallerySwiperModal = (visible, images, initialImageIndex) => (dispatch) =>
    dispatch(ActionDispatcher(TOGGLE_GALLERY_SWIPER_MODAL, {visible:visible, images:images, imageIndex:initialImageIndex}));