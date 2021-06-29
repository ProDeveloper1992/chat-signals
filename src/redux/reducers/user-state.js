import { act } from 'react-test-renderer';
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  SET_SELECTED_USER_GENDER,
  SET_SELECTED_LOOKING_GENDER,
  SET_USER_COUNTRY,
  SET_USER_PASSIONS,
  SET_SEXUAL_ORIENTATION,
  GET_FRIENDS_LIST_SUCCESS,
  GET_CUSTOMER_LIKES_SUCCESS,
  GET_CUSTOMER_KISSES_SUCCESS,
  GET_CUSTOMER_HEARTS_SUCCESS,
  GET_CUSTOMER_STICKERS_SUCCESS,
  GET_HELP_TICKET_LIST_SUCCESS,
  GET_CUSTOMER_APPEARANCE_AND_INTERETS_SUCCESS,
  GET_NOTIFICATIONS_LIST_SUCCESS,
  STORE_FCM_TOKEN,
  GET_STICKERS_LIST_SUCCESS
} from '../actions/types';

const initialState = {
  isLoggedIn: false,
  selectedLanguage: 'en',
  userData: null,
  authToken: null,
  fcmToken: null,
  userProfileDetailList: null,
  userPassions: [],
  friendsList: [],
  customerLikesList: [],
  customerKissesList: [],
  customerHeartsList: [],
  customerStickersList: [],
  customerHelpTicketList: [],
  customerAppearanceInterests: [],
  customerNotifications: [],
  stickersList: [],
  userSexualOrientation: {
    id: 1,
    deleted_at: null,
    name: "Straighy",
    is_active: "0",
    lang: "en"
  },

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
    id: 1,
    deleted_at: null,
    name: "Male",
    is_active: "0",
    lang: "en"
  },

  selectedLookingGender: {
    gender_id: 2,
    gender: 'Female',
  },

  userCountry: {
    country_id: 1,
    country_code: 'DE',
    image:
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
      console.log("GET_USER_PROFILE_SUCCESS", action.payload)
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload
        // userProfileDetailList: action.payload,
      };

    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
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
      console.log("SET_USER_PASSIONS", action.payload)
      return {
        ...state,
        userPassions: action.payload
      }

    case SET_SEXUAL_ORIENTATION:
      return {
        ...state,
        userSexualOrientation: action.payload
      }

    case GET_FRIENDS_LIST_SUCCESS:
      console.log("GET_FRIENDS_LIST_SUCCESS", action.payload)
      return {
        ...state,
        friendsList: action.payload
      }

    case GET_CUSTOMER_LIKES_SUCCESS:
      console.log("GET_CUSTOMER_LIKES_SUCCESS", action.payload)
      return {
        ...state,
        customerLikesList: action.payload
      };

    case GET_CUSTOMER_KISSES_SUCCESS:
      console.log("GET_CUSTOMER_KISSES_SUCCESS", action.payload)
      return {
        ...state,
        customerKissesList: action.payload
      };

    case GET_CUSTOMER_HEARTS_SUCCESS:
      console.log("GET_CUSTOMER_HEARTS_SUCCESS", action.payload)
      return {
        ...state,
        customerHeartsList: action.payload
      }

    case GET_CUSTOMER_STICKERS_SUCCESS:
      console.log("GET_CUSTOMER_STICKERS_SUCCESS", action.payload)
      return {
        ...state,
        customerStickersList: action.payload
      }

    case GET_HELP_TICKET_LIST_SUCCESS:
      console.log("GET_HELP_TICKET_LIST_SUCCESS", action.payload)
      return {
        ...state,
        customerHelpTicketList: action.payload
      }

    case GET_CUSTOMER_APPEARANCE_AND_INTERETS_SUCCESS:
      console.log("GET_CUSTOMER_APPEARANCE_AND_INTERETS_SUCCESS", action.payload)
      return {
        ...state,
        customerAppearanceInterests: action.payload
      }

    case GET_NOTIFICATIONS_LIST_SUCCESS:
      console.log("GET_NOTIFICATIONS_LIST_SUCCESS", action.payload)
      return {
        ...state,
        customerNotifications: action.payload
      }

    case STORE_FCM_TOKEN:
      console.log("STORE_FCM_TOKEN", action.payload)
      return {
        ...state,
        fcmToken: action.payload
      }

    case GET_STICKERS_LIST_SUCCESS:
      console.log("GET_STICKERS_LIST_SUCCESS", action.payload)
      return {
        ...state,
        stickersList: action.payload
      }

    default:
      return state;
  }
}
