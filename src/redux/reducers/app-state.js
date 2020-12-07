import Snackbar from 'react-native-snackbar';
import {act} from 'react-test-renderer';
import {Colors} from '../../constants';
import {
  GET_APP_STRINGS_REQUEST,
  GET_APP_STRINGS_SUCCESS,
  GET_APP_STRINGS_FAIL,
  CHANGE_APP_LANGUAGE,
  SHOW_TOAST,
} from '../actions/types';

const initialState = {
  appLoading: true,
  selectedLanguage: 'en',
  appLabels: {
    Thisistest: 'this is testing',
    at: 'AT',
    ch: 'CH',
    confirm_password: 'Confirm Password',
    country: 'Country',
    create_one: 'Create One',
    dashboard: 'Dashboard',
    de: 'DE',
    dont_have_an_account: "Don't you have an account?",
    email: 'Email',
    email_error_1: 'Please enter email address!',
    email_error_2: 'Invalid email address!',
    failed: 'These credentials do not match our records.',
    forgot_password: 'Forgot password?',
    i_am: 'I am',
    i_am_looking_for: "I'm looking for",
    login: 'Login',
    next: 'Next',
    password: 'Password',
    password_error_1: 'Please enter password!',
    password_error_2: "Password doesn't match!",
    picture_pool: 'Picture Pool',
    postal_code: 'Postal Code',
    register_with_email: 'Register with email',
    register_with_facebook: 'Register with facebook',
    register_with_google: 'Register with google',
    registration: 'Registration',
    rigister: 'Register',
    settings: 'Settings',
    skip: 'Skip',
    support: 'Support',
    throttle: 'Too many login attempts. Please try again in :seconds seconds.',
    user_details: 'User Details',
    user_management: 'User Management',
    user_name: 'Username',
  },
};

function getLanguageStrings(language_code) {
  switch (language_code) {
    case 'en':
      return initialState.en;
    case 'de':
      return initialState.de;
    default:
      return initialState.en;
  }
}

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
        // appStrings: getLanguageStrings(action.payload),
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

    default:
      return state;
  }
}
