import {
  GET_APP_STRINGS_REQUEST,
  GET_APP_STRINGS_SUCCESS,
  GET_APP_STRINGS_FAIL,
  CHANGE_APP_LANGUAGE,
} from '../actions/types';

const initialState = {
  appLoading: true,
  appStrings: {
    landing: {
      rigister: 'Register',
      login: 'Login',
    },
    register: {
      register_with_email: 'Rigister with email',
      register_with_google: 'Rigister with google',
      register_with_facebook: 'Rigister with facebook',
      user_details: 'User Details',
      registration: 'Registration',
      user_name: 'Username',
      i_am: 'I am',
      i_am_looking_for: "I'm looking for",
      country: 'Country',
      de: 'DE',
      at: 'AT',
      ch: 'CH',
      postal_code: 'Postal Code',
      next: 'Next',
      skip: 'Skip',
      email: 'Email',
      password: 'Password',
      confirm_password: 'Confirm Password',
      register: 'Register',
      email_error_1: 'Please enter email address!',
      email_error_2: 'Invalid email address!',
      password_error_1: 'Please enter password!',
      password_error_2: "Password doesn't match!",
    },
    login: {
      email: 'Email',
      password: 'Password',
      forgot_password: 'Forgot password?',
      login: 'Login',
      dont_have_an_account: "Don't you have an account?",
      create_one: 'Create One',
    },
  },
  en: {
    landing: {
      rigister: 'Register',
      login: 'Login',
    },
    register: {
      register_with_email: 'Rigister with email',
      register_with_google: 'Rigister with google',
      register_with_facebook: 'Rigister with facebook',
      user_details: 'User Details',
      registration: 'Registration',
      user_name: 'Username',
      i_am: 'I am',
      i_am_looking_for: "I'm looking for",
      country: 'Country',
      de: 'DE',
      at: 'AT',
      ch: 'CH',
      postal_code: 'Postal Code',
      next: 'Next',
      skip: 'Skip',
      email: 'Email',
      password: 'Password',
      confirm_password: 'Confirm Password',
      register: 'Register',
      email_error_1: 'Please enter email address!',
      email_error_2: 'Invalid email address!',
      password_error_1: 'Please enter password!',
      password_error_2: "Password doesn't match!",
    },
    login: {
      email: 'Email',
      password: 'Password',
      forgot_password: 'Forgot password?',
      login: 'Login',
      dont_have_an_account: "Don't you have an account?",
      create_one: 'Create One',
    },
  },
  de: {
    landing: {
      register: 'Registrieren',
      login: 'Einloggen',
    },
    register: {
      register_with_email: 'Rigister mit E-Mail',
      register_with_google: 'Rigister mit Google',
      register_with_facebook: 'Rigister mit Facebook',
      user_details: 'Nutzerdetails',
      registration: 'Anmeldung',
      user_name: 'Nutzername',
      i_am: 'ich bin',
      i_am_looking_for: 'Ich suche',
      country: 'Land',
      de: 'DE',
      at: 'AT',
      ch: 'CH',
      postal_code: 'Postleitzahl',
      next: 'Nächster',
      skip: 'Überspringen',
      email: 'Email',
      password: 'Passwort',
      confirm_password: 'Passwort bestätigen',
      register: 'Registrieren',
      email_error_1: 'Bitte geben Sie Ihre E-Mail-Adresse ein!',
      email_error_2: 'Ungültige E-Mail-Adresse!',
      password_error_1: 'Bitte Passwort eingeben!',
      password_error_2: 'Passwort stimmt nicht überein!',
    },
    login: {
      email: 'Email',
      password: 'Passwort',
      forgot_password: 'Passwort vergessen?',
      login: 'Einloggen',
      dont_have_an_account: 'Hast du keinen Account?',
      create_one: 'Erstelle einen',
    },
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
        // appStrings: action.payload,
        appLoading: false,
      };

    case GET_APP_STRINGS_FAIL:
      return {
        ...state,
        appLoading: false,
      };

    case CHANGE_APP_LANGUAGE:
      return {
        ...state,
        appStrings: getLanguageStrings(action.payload),
      };

    default:
      return state;
  }
}
