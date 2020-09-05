import {ActionDispatcher} from './index';
import {
  GET_APP_STRINGS_REQUEST,
  GET_APP_STRINGS_SUCCESS,
  GET_APP_STRINGS_FAIL,
} from './types';
import {client} from '../../services/api-service';

export const getAppStrings = (params) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(GET_APP_STRINGS_REQUEST));

    client
      .get(`/appsettings`)
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
