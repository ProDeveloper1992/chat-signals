import Snackbar from 'react-native-snackbar';
import { act } from 'react-test-renderer';
import { Colors } from '../../constants';
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
    register: 'Register',
    settings: 'Settings',
    skip: 'Skip',
    support: 'Support',
    throttle: 'Too many login attempts. Please try again in :seconds seconds.',
    user_details: 'User Details',
    user_management: 'User Management',
    user_name: 'Username',
    //New Labels
    home: 'Home',
    contact: 'Contact',
    chat: 'Chat',
    daily_coins: 'Daily Coins',
    purchase: 'Purchase',
    flirts: 'Flirts',
    super_flirts: 'ProFlirts',
    bookmarks: 'Bookmarks',
    bookmark: 'Bookmark',
    friends: 'Friends',
    visitors: 'Visitors',
    blocked: 'Blocked',
    no_bookmarks: 'No bookmarks found!',
    no_friends: 'No friends found!',
    no_visitors: 'No visitors found!',
    no_blocked: 'No blocked contacts found!',
    charge_coins: 'Charge Coins',
    get_super_flirt: 'Get Super-Flirted Now!',
    kisses: 'Kisses',
    likes: 'Likes',
    like: 'Like',
    add_friend: 'Add Friend',
    stickers: 'Stickers',
    heart: 'Heart',
    photos: 'Photos',
    profile_info: 'Profile-Info',
    action: 'Action',
    gender: 'Gender',
    country: 'Country',
    distance: 'Distance',
    age: 'Age',
    zodiac_sign: 'Zodiac Sign',
    height: 'Height',
    figure: 'Figure',
    hair_color: 'Hair Color',
    eye_color: 'Eye Color',
    skin_color: 'Skin Color',
    edit_profile: 'Edit Profile',
    change_password: 'Change Password',
    deactivate_account: 'Deactivate Account',
    credit_log: 'Credit Log',
    logout: 'Logout',
    privacy_policy: 'Privacy Policy',
    terms_of_service: 'Terms of Service',
    revocation: 'Revocation',
    about_chat_signal: 'About ChatSignal',
    contact: 'Contact',
    give_away_coins: 'Give away coins',
    report_user: 'Report User',
    block_user: 'Block User',
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
