import {ActionDispatcher} from './index';
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL} from './types';
import {client} from '../../services/api-service';

export const loginUser = (params) => (dispatch) =>
  // dispatch(ActionDispatcher(LOGIN_SUCCESS));
  // dispatch(ActionDispatcher(LOGIN_FAIL));

  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(LOGIN_REQUEST));

    client
      .get(`/appsettings`)
      .then((res) => {
        alert(JSON.stringify(res));
        resolve(res);
      })
      .catch((err) => {
        alert(JSON.stringify(err));
        reject(err);
      });
  });
