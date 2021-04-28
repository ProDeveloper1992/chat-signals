import { ActionDispatcher } from './index';
import {
  GET_FLIRTS_REQUEST,
  GET_FLIRTS_SUCCESS,
  GET_FLIRTS_FAILED,
  GET_SPOT_LIGHTS_REQUEST,
  GET_SPOT_LIGHTS_SUCCESS,
  GET_SPOT_LIGHTS_FAILED,
  IS_LOAD_MORE_FLIRTS,
  IS_LOAD_MORE_SPOTLIGHTS
} from './types';
import { client } from '../../services/api-service';
import { showToast } from './app-actions';

export const getFlirtsList = (requestData) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(GET_FLIRTS_REQUEST));
    let state = getState();
    let flirtList = state.flirtsState.flirtsList;
    client
      .post(`/profile_list`, requestData)
      .then((res) => {
        if (res.meta.status) {
          if (res.data.length >= 10) {
            dispatch(ActionDispatcher(IS_LOAD_MORE_FLIRTS, true));
          } else {
            dispatch(ActionDispatcher(IS_LOAD_MORE_FLIRTS, false));
          }

          if (requestData.page == 1) {
            dispatch(ActionDispatcher(GET_FLIRTS_SUCCESS, res.data));
          } else {
            for (let flirt of res.data) {
              flirtList.push(flirt);
            }
            dispatch(ActionDispatcher(GET_FLIRTS_SUCCESS, flirtList));
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
          if (res.data.length >= 10) {
            dispatch(ActionDispatcher(IS_LOAD_MORE_SPOTLIGHTS, true));
          } else {
            dispatch(ActionDispatcher(IS_LOAD_MORE_SPOTLIGHTS, false));
          }

          if (requestData.page == 1) {
            dispatch(ActionDispatcher(GET_SPOT_LIGHTS_SUCCESS, res.data));
          } else {
            for (let spotlight of res.data) {
              spotLightsList.push(spotlight);
            }
            dispatch(ActionDispatcher(GET_SPOT_LIGHTS_SUCCESS, spotLightsList));
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

//Get Moderator Profile Detail
export const getModeratorProfileDetail = (moderatorId) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    const userData = getState().userState.userData;
    let userId = null;
    if (userData) {
      userId = userData.id;
    }
    let requestData = {
      id: moderatorId,
      customer_id: userId
    }
    client
      .post(`/profile_detail`, requestData)
      .then((res) => {
        if (res.meta.status) {
          // dispatch(getFriendsList())
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Block Moderator
export const blockModerator = (moderatorId) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    const userData = getState().userState.userData;
    let userId = null;
    if (userData) {
      userId = userData.id;
    }
    let requestData = {
      customer_id: userId,
      profile_id: moderatorId
    }
    client
      .post(`/customer_block`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(showToast('positive', res.meta.message));
          let flirtRequestData = {
            page: 1,
            customer_id: userData.id,
            gender: '',
          }
          dispatch(getFlirtsList(flirtRequestData));
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Report Moderator
export const reportModerator = (moderatorId) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    const userData = getState().userState.userData;
    let userId = null;
    if (userData) {
      userId = userData.id;
    }
    let requestData = {
      customer_id: userId,
      profile_id: moderatorId,
      description: ''
    }
    client
      .post(`/customer_report`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(showToast('positive', res.meta.message))
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } });
        reject(err);
      });
  });