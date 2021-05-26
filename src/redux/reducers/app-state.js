import Snackbar from 'react-native-snackbar';
import { act } from 'react-test-renderer';
import { Colors } from '../../constants';
import { APP_STRINGS } from '../../constants/app-strings';
import {
  GET_APP_STRINGS_REQUEST,
  GET_APP_STRINGS_SUCCESS,
  GET_APP_STRINGS_FAIL,
  CHANGE_APP_LANGUAGE,
  SHOW_TOAST,
  GET_PAYMENT_MODULE_REQUEST,
  GET_PAYMENT_MODULE_SUCCESS,
  GET_PAYMENT_MODULE_FAIL,
  GET_GENERAL_SETTINGS_SUCCESS,
  GET_SEAL_URL_REQUEST,
  GET_SEAL_URL_SUCCESS,
  GET_SEAL_URL_FAILED,
  GET_PASSION_LIST_SUCCESS,
  GET_SEXUAL_ORIENTATION_LIST_SUCCESS,
  GET_GENDERS_LIST_SUCCESS,
  GET_HELP_TICKET_SUBJECTS_SUCCESS,
  GET_APP_LANGUAGES_SUCCESS
} from '../actions/types';

const initialState = {
  appLoading: true,
  selectedLanguage: 'en',
  loadingPaymentGateways: false,
  gettingSealUrl: false,
  paymentGateways: [],
  generalSettings: [],
  genderList: [],
  passionList: [],
  sexualOrientations: [],
  helpTicketSubjects: [],
  languages: [
    {
      key: 'en',
      lang: 'English',
      image:
        'http://chat-signal.com/public/assets/images/flag-en.jpg',
    },

    {
      key: 'de',
      lang: 'Dutch',
      image:
        'http://chat-signal.com/public/assets/images/flag-du.jpg',
    },

    {
      key: 'es',
      lang: 'Español',
      image:
        'http://chat-signal.com/public/assets/images/flag-spain.jpg',
    },

    {
      key: 'fr',
      lang: 'Francis',
      image:
        'http://chat-signal.com/public/assets/images/flag-france.jpg',
    },
  ],
  appLabels: APP_STRINGS,
};

function getToastBackgroundColor(type) {
  switch (type) {
    case 'positive':
      return Colors.green;
    case 'negative':
      return Colors.ui_error;
    default:
      return Colors.black;
  }
}

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_APP_LANGUAGES_SUCCESS:
      console.log("GET_APP_LANGUAGES_SUCCESS", action.payload)
      return {
        ...state,
        languages: action.payload
      }

    case GET_APP_STRINGS_REQUEST:
      return {
        ...state,
        appLoading: true,
      };

    case GET_APP_STRINGS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        appLoading: false,
        appLabels: action.payload,
      };

    case GET_APP_STRINGS_FAIL:
      return {
        ...state,
        appLoading: false,
      };

    case CHANGE_APP_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.payload,
      };

    case SHOW_TOAST:
      Snackbar.show({
        text: action.payload.title,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: getToastBackgroundColor(action.payload.type),
      });
      return {
        ...state,
      };

    //Payment module
    case GET_PAYMENT_MODULE_REQUEST:
      return {
        ...state,
        loadingPaymentGateways: true
      };

    case GET_PAYMENT_MODULE_SUCCESS:
      console.log('GET_PAYMENT_MODULE_SUCCESS...', action.payload)
      return {
        ...state,
        paymentGateways: action.payload,
        loadingPaymentGateways: false
      };

    case GET_PAYMENT_MODULE_FAIL:
      return {
        ...state,
        loadingPaymentGateways: false
      };

    case GET_GENERAL_SETTINGS_SUCCESS:
      return {
        ...state,
        generalSettings: action.payload
      };

    //Get Seal Url
    case GET_SEAL_URL_REQUEST:
      return {
        ...state,
        gettingSealUrl: true,
      };

    case GET_SEAL_URL_SUCCESS:
      return {
        ...state,
        gettingSealUrl: false,
      };

    case GET_SEAL_URL_FAILED:
      return {
        ...state,
        gettingSealUrl: false,
      };

    case GET_PASSION_LIST_SUCCESS:
      console.log("GET_PASSION_LIST_SUCCESS", action.payload)
      return {
        ...state,
        passionList: action.payload
      };


    case GET_SEXUAL_ORIENTATION_LIST_SUCCESS:
      console.log("GET_SEXUAL_ORIENTATION_LIST_SUCCESS", action.payload)
      return {
        ...state,
        sexualOrientations: action.payload
      };


    case GET_GENDERS_LIST_SUCCESS:
      console.log("GET_GENDERS_LIST_SUCCESS", action.payload)
      return {
        ...state,
        genderList: action.payload
      };


    case GET_HELP_TICKET_SUBJECTS_SUCCESS:
      console.log("GET_HELP_TICKET_SUBJECTS_SUCCESS", action.payload)
      return {
        ...state,
        helpTicketSubjects: action.payload
      };

    default:
      return state;
  }
}
