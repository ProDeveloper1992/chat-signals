import {
  GET_APP_STRINGS_REQUEST,
  GET_APP_STRINGS_SUCCESS,
  GET_APP_STRINGS_FAIL,
} from '../actions/types';

const initialState = {
  appStrings: null,
  appLoading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_APP_STRINGS_REQUEST:
      return {
        ...state,
        appLoading: true,
      };

    case GET_APP_STRINGS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        appStrings: action.payload,
        appLoading: false,
      };

    case GET_APP_STRINGS_FAIL:
      return {
        ...state,
        appLoading: false,
      };

    default:
      return state;
  }
}
