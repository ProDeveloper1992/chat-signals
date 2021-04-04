import { ActionDispatcher } from './index';
import {
  GET_FLIRTS_REQUEST,
  GET_FLIRTS_SUCCESS,
  GET_FLIRTS_FAILED,
  GET_SPOT_LIGHTS_REQUEST,
  GET_SPOT_LIGHTS_SUCCESS,
  GET_SPOT_LIGHTS_FAILED
} from './types';
import { client } from '../../services/api-service';

export const getFlirtsList = (requestData) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(GET_FLIRTS_REQUEST));
    let state = getState();
    let flirtList = state.flirtsState.flirtsList;
    client
      .post(`/profile_list`, requestData)
      .then((res) => {
        if (res.meta.status) {
          if (res.meta.next == "true") {
            for (let flirt of res.data) {
              flirtList.push(flirt);
            }
            dispatch(ActionDispatcher(GET_FLIRTS_SUCCESS, flirtList));
          } else {
            dispatch(ActionDispatcher(GET_FLIRTS_SUCCESS, res.data));
          }
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

export const getProFlirtsList = (requestData) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(GET_SPOT_LIGHTS_REQUEST));
    let state = getState();
    let spotLightsList = state.flirtsState.spotLightsList;
    client
      .post(`/get_spotlights_list`, requestData)
      .then((res) => {
        if (res.meta.status) {
          if (res.meta.next == "true") {
            for (let flirt of res.data) {
              spotLightsList.push(flirt);
            }
            dispatch(ActionDispatcher(GET_SPOT_LIGHTS_SUCCESS, spotLightsList));
          } else {
            dispatch(ActionDispatcher(GET_SPOT_LIGHTS_SUCCESS, res.data));
          }
        } else {
          dispatch(ActionDispatcher(GET_SPOT_LIGHTS_FAILED));
        }
        resolve(res);
      })
      .catch((err) => {
        dispatch(ActionDispatcher(GET_SPOT_LIGHTS_FAILED));
        resolve({ meta: { status: false } });
        reject(err);
      });
  });