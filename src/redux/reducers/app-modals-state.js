import { TOGGLE_LANGUAGE_SELECTION_MODAL } from '../actions/types';

const initialState = {
    isLanguageModalVisible: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_LANGUAGE_SELECTION_MODAL:
            return {
                ...state,
                isLanguageModalVisible: action.payload
            };

        default:
            return state;
    }
}
