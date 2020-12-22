import { ActionDispatcher } from './index';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_USER_CHAT_LIST_REQUEST,
  GET_USER_CHAT_LIST_SUCCESS,
  GET_USER_CHAT_LIST_FAIL,
  SET_SELECTED_USER_GENDER,
  SET_SELECTED_LOOKING_GENDER,
  SET_USER_COUNTRY
} from './types';
import { client } from '../../services/api-service';
import { showToast } from './app-actions';

export const setSelectedGender = (genderData) => (dispatch) =>
  dispatch(ActionDispatcher(SET_SELECTED_USER_GENDER, genderData));

export const setSelectedLookingGender = (genderData) => (dispatch) =>
  dispatch(ActionDispatcher(SET_SELECTED_LOOKING_GENDER, genderData));

export const setUserCountry = (countryData) => (dispatch) =>
  dispatch(ActionDispatcher(SET_USER_COUNTRY, countryData));

export const registerUser = (requestData) => (dispatch) =>
  new Promise(function (resolve, reject) {
    client
      .post(`/registration`, requestData)
      .then((res) => {
        console.log(res);
        if (res.meta.status === true) {
          dispatch(showToast('positive', res.meta.message));
        } else {
          dispatch(showToast('negative', res.meta.message));
        }
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        dispatch(showToast('negative', 'Something went wrong!'));
        resolve({ data: { success: false } });
        reject(err);
      });
  });

export const loginUser = (requestData) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(LOGIN_REQUEST));
    client
      .post(`/login`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(LOGIN_SUCCESS, res));
          dispatch(showToast('positive', res.meta.message));
        } else {
          dispatch(ActionDispatcher(LOGIN_FAIL));
          dispatch(showToast('negative', res.meta.message));
        }
        resolve(res);
      })
      .catch((err) => {
        dispatch(ActionDispatcher(LOGIN_FAIL));
        dispatch(showToast('negative', 'Something went wrong!'));
        resolve({ data: { success: false } });
        reject(err);
      });
  });

export const forgotPassword = (requestData) => (dispatch) =>
  new Promise(function (resolve, reject) {
    client
      .post(`/resetPasswordEmailSend`, requestData)
      .then((res) => {
        console.log(res);
        if (res.meta.status === true) {
          dispatch(showToast('positive', res.meta.message));
        } else {
          dispatch(showToast('negative', res.meta.message));
        }
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        dispatch(showToast('negative', 'Something went wrong!'));
        resolve({ data: { success: false } });
        reject(err);
      });
  });

export const userProfileDetail = (requestData) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(GET_USER_PROFILE_REQUEST));
    client
      .post(`/profile_detail`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_USER_PROFILE_SUCCESS, res.data));
        } else {
          dispatch(ActionDispatcher(GET_USER_PROFILE_FAIL));
        }
        resolve(res);
      })
      .catch((err) => {
        dispatch(ActionDispatcher(GET_USER_PROFILE_FAIL));
        resolve({ data: { success: false } });
        reject(err);
      });
  });

export const getUserChatList = () => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(GET_USER_CHAT_LIST_REQUEST));
    const userData = getState().userState.userData;
    let userId = null;
    if (userData) {
      userId = userData.id;
    }
    let requestData = {
      customer_id: userId
    }
    client
      .post(`/chat_list`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_USER_CHAT_LIST_SUCCESS, res.data));
        } else {
          dispatch(ActionDispatcher(GET_USER_CHAT_LIST_FAIL));
        }
        resolve(res);
      })
      .catch((err) => {
        dispatch(ActionDispatcher(GET_USER_CHAT_LIST_FAIL));
        resolve({ data: { success: false } });
        reject(err);
      });
  });
