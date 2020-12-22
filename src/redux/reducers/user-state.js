import { act } from 'react-test-renderer';
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  ET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_CHAT_LIST_REQUEST,
  GET_USER_CHAT_LIST_SUCCESS,
  GET_USER_CHAT_LIST_FAIL,
  SET_SELECTED_USER_GENDER,
  SET_SELECTED_LOOKING_GENDER,
  SET_USER_COUNTRY
} from '../actions/types';

const initialState = {
  isLoggedIn: false,
  selectedLanguage: 'en',
  userData: null,
  authToken: null,
  userProfileDetailList: null,
  userChatList: [],
  loadingChatList: false,

  //Gender
  genderList: [
    {
      gender_id: 1,
      gender: 'Male',
      gender_icon:
        'https://img2.pngio.com/download-free-png-male-icon-png-102234-free-icons-library-male-logo-png-512_512.png',
    },

    {
      gender_id: 2,
      gender: 'Female',
      gender_icon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Female_symbol.svg/512px-Female_symbol.svg.png',
    },

    {
      gender_id: 3,
      gender: 'Transgender',
      gender_icon:
        'https://img.pngio.com/gender-symbol-gender-wiki-fandom-powered-by-wikia-gender-symbol-png-300_300.png',
    }
  ],
  selectedUserGender: {
    gender_id: 1,
    gender: 'Male',
    gender_icon:
      'https://img2.pngio.com/download-free-png-male-icon-png-102234-free-icons-library-male-logo-png-512_512.png'
  },
  selectedLookingGender: {
    gender_id: 2,
    gender: 'Female',
    gender_icon:
      'https://img2.pngio.com/download-free-png-male-icon-png-102234-free-icons-library-male-logo-png-512_512.png'
  },

  userCountry: {
    country_id: 1,
    country_code: 'DE',
    country_flag:
      'https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png',
  },

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

    //User's Chat List
    case GET_USER_CHAT_LIST_REQUEST:
      return {
        ...state,
        loadingChatList: true
      };

    case GET_USER_CHAT_LIST_SUCCESS:
      console.log("User Chat List Fetched...", action.payload)
      return {
        ...state,
        userChatList: action.payload,
        loadingChatList: false
      };

    case GET_USER_CHAT_LIST_FAIL:
      return {
        ...state,
        loadingChatList: false
      };

    case SET_SELECTED_USER_GENDER:
      return {
        ...state,
        selectedUserGender: action.payload
      }

    case SET_SELECTED_LOOKING_GENDER:
      return {
        ...state,
        selectedLookingGender: action.payload
      }

    case SET_USER_COUNTRY:
      return {
        ...state,
        userCountry: action.payload
      }

    default:
      return state;
  }
}
