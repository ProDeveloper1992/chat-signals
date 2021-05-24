import Snackbar from 'react-native-snackbar';
import { act } from 'react-test-renderer';
import { Colors } from '../../constants';
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
  appLanguages: [],
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
      language_id: 1,
      language_code: 'en',
      name: 'English',
      country_flag:
        'https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png',
    },

    {
      language_id: 2,
      language_code: 'de',
      name: 'German',
      country_flag:
        'https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png',
    },

    {
      language_id: 3,
      language_code: 'es',
      name: 'Spanish',
      country_flag:
        'https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png',
    },

    {
      language_id: 4,
      language_code: 'fr',
      name: 'French',
      country_flag:
        'https://www.countryflags.com/wp-content/uploads/france-flag-png-large.png',
    },
  ],
  appLabels: {
    Coins: "Coins",
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
    dob: "Date of birth",
    //need to update in DB
    find_your_match: "Find your match with our poweful algorithms",
    casual_chating: "Casual chatting and flirting",
    login_with_google: "Log in with Google",
    login_with_facebook: "Log in with Facebook",
    back: "Back",
    or: "or",
    create_account: "Create account",
    birthday: "Birthday",
    select_date: "Select date",
    optional: "Optional",
    passions: "Passions",
    add_passions: "Add passions",
    sexual_orientation: "Sexual orientation",
    add_sexual_orientation: "Add sexual orientation",
    select_language: "Select language",
    continue: "Continue",
    select_profile_picture: "Select profile picture",
    forgot_password_title: "Did you forgot your password?",
    forgot_password_description: "Please enter your email address you are using for your account bellow and we will send you a password reset link.",
    request_new_password: "Request New Password",
    back_to_login: "Back to login",
    spotlight: "Spotlight",
    filter_flirt_suggestions: "Filter flirt suggestions",
    age_range: "Age Range",
    city: "City",
    max_distance: "Max. distance",
    save: "Save",
    reset_filters: "Reset Filters",
    erotic_image: "Erotic Image",
    unlock_for: "Unlock for",
    interests: "Interests",
    details: "Details",
    kiss: "Kiss",
    sticker: "Sticker",
    friend_request: "Friend request",
    messages: "Messages",
    send_message_for: "Send message for",
    type_message: "Type message",
    cancel: "Cancel",
    view_profile: "View profile",
    delete_conversation: "Delete Conversation"
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

    case GET_APP_LANGUAGES_SUCCESS:
      return {
        ...state,
        appLanguages: action.payload
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
