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
  SET_USER_COUNTRY,
  SET_USER_PASSIONS
} from '../actions/types';

const initialState = {
  isLoggedIn: false,
  selectedLanguage: 'en',
  userData: null,
  authToken: null,
  userProfileDetailList: null,
  userChatList: [],
  loadingChatList: false,
  userPassions: [],

  passions: [
    {
      title: 'Netflix'
    },
    {
      title: 'Walking'
    },
    {
      title: 'Traveling'
    },
    {
      title: 'Gym'
    },
    {
      title: 'Music'
    }
  ],

  otherGenders: [
    {
      gender_id: 4,
      gender: 'Agender',
    },
    {
      gender_id: 5,
      gender: 'Androgyne',
    },
    {
      gender_id: 6,
      gender: 'Androgynous',
    },
    {
      gender_id: 7,
      gender: 'Bigender',
    },
    {
      gender_id: 8,
      gender: 'Female to Male',
    },
    {
      gender_id: 9,
      gender: 'FTM',
    },
    {
      gender_id: 10,
      gender: 'Gender Fluid',
    },
    {
      gender_id: 11,
      gender: 'Gender Nonconforming',
    },
  ],

  //Gender
  genderList: [
    {
      gender_id: 1,
      gender: 'Man',
    },

    {
      gender_id: 2,
      gender: 'Woman',
    },

    {
      gender_id: 3,
      gender: 'More',
    }
  ],

  selectedUserGender: {
    gender_id: 1,
    gender: 'Male',
  },
  selectedLookingGender: {
    gender_id: 2,
    gender: 'Female',
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

    case SET_USER_PASSIONS:
      return {
        ...state,
        userPassions: action.payload
      }

    default:
      return state;
  }
}
