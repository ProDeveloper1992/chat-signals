import {ActionDispatcher} from './index';
import {
  GET_APP_STRINGS_REQUEST,
  GET_APP_STRINGS_SUCCESS,
  GET_APP_STRINGS_FAIL,
  CHANGE_APP_LANGUAGE,
} from './types';
import {client} from '../../services/api-service';
import {store} from '../../redux/store';

export const getAppStrings = (params) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(GET_APP_STRINGS_REQUEST));
    let state = store.getState();
    let user_language = state.userState.selectedLanguage;
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

export const changeAppLanguage = (language_code) => (dispatch) =>
  dispatch(ActionDispatcher(CHANGE_APP_LANGUAGE, language_code));
