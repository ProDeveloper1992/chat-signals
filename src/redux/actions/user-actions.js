import {ActionDispatcher} from './index';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
} from './types';
import {client} from '../../services/api-service';
import {showToast} from './app-actions';

export const registerUser = (requestData) => (dispatch) =>
  // dispatch(ActionDispatcher(LOGIN_SUCCESS));
  // dispatch(ActionDispatcher(LOGIN_FAIL));

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
        resolve({data: {success: false}});
        reject(err);
      });
  });

export const loginUser = (requestData) => (dispatch) =>
  // dispatch(ActionDispatcher(LOGIN_SUCCESS));
  // dispatch(ActionDispatcher(LOGIN_FAIL));

  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(LOGIN_REQUEST));
    client
      .post(`/login`, requestData)
      .then((res) => {
        // alert(JSON.stringify(res));
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
        // alert(JSON.stringify(err));
        resolve({data: {success: false}});
        reject(err);
      });
  });

export const forgotPassword = (requestData) => (dispatch) =>
  // dispatch(ActionDispatcher(LOGIN_SUCCESS));
  // dispatch(ActionDispatcher(LOGIN_FAIL));

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
        resolve({data: {success: false}});
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
        resolve({data: {success: false}});
        reject(err);
      });
  });
