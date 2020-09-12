import { ActionDispatcher } from ".";
import { TOGGLE_LANGUAGE_SELECTION_MODAL } from "./types";


export const toggleLanguageModal = (visible) => (dispatch) =>
    dispatch(ActionDispatcher(TOGGLE_LANGUAGE_SELECTION_MODAL, visible))
