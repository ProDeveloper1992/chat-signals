import { ActionDispatcher } from './index';
import {
  GET_FLIRTS_REQUEST,
  GET_FLIRTS_SUCCESS,
  GET_FLIRTS_FAILED,
} from './types';
import { client } from '../../services/api-service';

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
        }
        resolve(res);
      })
      .catch((err) => {
        dispatch(ActionDispatcher(GET_FLIRTS_FAILED));
        resolve({ meta: { status: false } });
        reject(err);
      });
  });
