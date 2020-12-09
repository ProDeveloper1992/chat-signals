import {act} from 'react-test-renderer';
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  ET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
} from '../actions/types';

const initialState = {
  isLoggedIn: false,
  selectedLanguage: 'en',
  userData: null,
  authToken: null,
  userProfileDetailList: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload.data,
        authToken: action.payload.jwtToken,
      };

    case LOGIN_FAIL:
      return {
        ...state,
      };

    case GET_USER_PROFILE_REQUEST:
      return {
        ...state,
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userProfileDetailList: action.payload,
      };

    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
}
