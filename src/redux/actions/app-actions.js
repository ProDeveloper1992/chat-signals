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
  GET_SEAL_URL_FAILED
} from './types';
import { client } from '../../services/api-service';
import { store } from '../../redux/store';

export const getAppStrings = (params) => (dispatch) =>
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

export const changeAppLanguage = (language_code) => async (dispatch) => {
  await dispatch(ActionDispatcher(CHANGE_APP_LANGUAGE, language_code));
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
