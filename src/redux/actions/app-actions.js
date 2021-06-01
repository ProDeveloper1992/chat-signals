import { ActionDispatcher } from './index';
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
  GET_HELP_TICKET_LIST_SUCCESS,
  GET_APP_LANGUAGES_SUCCESS
} from './types';
import { client } from '../../services/api-service';
import { store } from '../../redux/store';

export const getAppLanguages = () => (dispatch) =>
  new Promise(function (resolve, reject) {
    client
      .get(`/language`)
      .then((res) => {
        if (res.data) {
          dispatch(ActionDispatcher(GET_APP_LANGUAGES_SUCCESS, res.data));
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getAppStrings = () => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(GET_APP_STRINGS_REQUEST));
    let state = store.getState();
    let user_language = state.appState.selectedLanguage;
    client
      .get(`/appsettings/${user_language}`)
      .then((res) => {
        if (res.data) {
          dispatch(ActionDispatcher(GET_APP_STRINGS_SUCCESS, res.data));
        } else {
          dispatch(ActionDispatcher(GET_APP_STRINGS_FAIL));
        }
        resolve(res);
      })
      .catch((err) => {
        dispatch(ActionDispatcher(GET_APP_STRINGS_FAIL));
        reject(err);
      });
  });

export const changeAppLanguage = (key) => async (dispatch) => {
  await dispatch(ActionDispatcher(CHANGE_APP_LANGUAGE, key));
  await dispatch(getAppStrings());
};

export const showToast = (type, title) => (dispatch) =>
  dispatch(ActionDispatcher(SHOW_TOAST, { type: type, title: title }));

export const getPaymentModule = () => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(GET_PAYMENT_MODULE_REQUEST));
    client
      .post(`/payment_module`)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_PAYMENT_MODULE_SUCCESS, res.data));
        } else {
          dispatch(ActionDispatcher(GET_PAYMENT_MODULE_FAIL));
        }
        resolve(res);
      })
      .catch((err) => {
        dispatch(ActionDispatcher(GET_PAYMENT_MODULE_FAIL));
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

export const getGeneralSettings = () => (dispatch) =>
  new Promise(function (resolve, reject) {
    client
      .post(`/general_settings`)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_GENERAL_SETTINGS_SUCCESS, res.data));
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getSealUrl = (requestData) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(GET_SEAL_URL_REQUEST));
    client
      .post(`/sear_url`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_SEAL_URL_SUCCESS));
        }
        resolve(res);
      })
      .catch((err) => {
        dispatch(ActionDispatcher(GET_SEAL_URL_FAILED));
        resolve({ meta: { status: false } })
        reject(err);
      });
  });

//Passions list
export const getPassionList = (query = '') => (dispatch) =>
  new Promise(function (resolve, reject) {
    let state = store.getState();
    let selectedLanguage = state.appState.selectedLanguage;
    let requestData = {
      language: selectedLanguage,
      search: query
    }
    client
      .post(`/passion_list`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_PASSION_LIST_SUCCESS, res.data));
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } })
        reject(err);
      });
  });

//Sexual orientations list
export const getSexualOrientationList = () => (dispatch) =>
  new Promise(function (resolve, reject) {
    let state = store.getState();
    let selectedLanguage = state.appState.selectedLanguage;
    let requestData = {
      language: selectedLanguage,
    }
    client
      .post(`/sexual_orientation`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_SEXUAL_ORIENTATION_LIST_SUCCESS, res.data));
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } })
        reject(err);
      });
  });

//Gender List
export const getGenderList = () => (dispatch) =>
  new Promise(function (resolve, reject) {
    let state = store.getState();
    let selectedLanguage = state.appState.selectedLanguage;
    let requestData = {
      language: selectedLanguage,
    }
    client
      .post(`/genders_list`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_GENDERS_LIST_SUCCESS, res.data));
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } })
        reject(err);
      });
  });

//Get Help Ticket Subjects List
export const getHelpTicketSubjects = () => (dispatch) =>
  new Promise(function (resolve, reject) {
    let state = store.getState();
    let selectedLanguage = state.appState.selectedLanguage;
    let requestData = {
      language: selectedLanguage,
    }
    client
      .post(`/ticket_catagory_list`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_HELP_TICKET_SUBJECTS_SUCCESS, res.data));
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } })
        reject(err);
      });
  });
