import {ActionDispatcher} from './index';
import {
  GET_FLIRTS_REQUEST,
  GET_FLIRTS_SUCCESS,
  GET_FLIRTS_FAILED,
} from './types';
import {client} from '../../services/api-service';
import {showToast} from './app-actions';

export const getFlirtsList = (requestData) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(GET_FLIRTS_REQUEST));
    client
      .post(`/profile_list`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_FLIRTS_SUCCESS, res.data));
        } else {
          dispatch(ActionDispatcher(GET_FLIRTS_FAILED));
          dispatch(showToast('negative', res.meta.message));
        }
        resolve(res);
      })
      .catch((err) => {
        dispatch(ActionDispatcher(GET_FLIRTS_FAILED));
        dispatch(showToast('negative', 'Something went wrong!'));
        resolve({data: {success: false}});
        reject(err);
      });
  });