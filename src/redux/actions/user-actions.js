import {ActionDispatcher} from './index';
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL} from './types';
import {client} from '../../services/api-service';

export const registerUser = (requestData) => (dispatch) =>
  // dispatch(ActionDispatcher(LOGIN_SUCCESS));
  // dispatch(ActionDispatcher(LOGIN_FAIL));

  new Promise(function (resolve, reject) {
    client
      .post(`/registration`, requestData)
      .then((res) => {
        alert(JSON.stringify(res));
        resolve(res);
      })
      .catch((err) => {
        alert(JSON.stringify(err));
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
        alert(JSON.stringify(res));
        resolve(res);
      })
      .catch((err) => {
        dispatch(ActionDispatcher(LOGIN_FAIL));
        alert(JSON.stringify(err));
        resolve({data: {success: false}});
        reject(err);
      });
  });
