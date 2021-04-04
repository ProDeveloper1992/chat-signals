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
  SET_SEXUAL_ORIENTATION,
  SET_USER_COUNTRY,
  SET_USER_PASSIONS,
  GET_BOOKMARKS_REQUEST,
  GET_BOOKMARKS_SUCCESS,
  GET_BOOKMARKS_FAILED,
  GET_FRIENDS_LIST_SUCCESS
} from './types';
import { client } from '../../services/api-service';
import { showToast } from './app-actions';

export const setSelectedGender = (genderData) => (dispatch) =>
  dispatch(ActionDispatcher(SET_SELECTED_USER_GENDER, genderData));

export const setSexualOrientation = (sexualOrientation) => (dispatch) =>
  dispatch(ActionDispatcher(SET_SEXUAL_ORIENTATION, sexualOrientation));

export const setSelectedLookingGender = (genderData) => (dispatch) =>
  dispatch(ActionDispatcher(SET_SELECTED_LOOKING_GENDER, genderData));

export const setUserCountry = (countryData) => (dispatch) =>
  dispatch(ActionDispatcher(SET_USER_COUNTRY, countryData));

export const setUserPassions = (passions) => (dispatch) =>
  dispatch(ActionDispatcher(SET_USER_PASSIONS, passions));

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
        resolve({ meta: { status: false } });
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
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

export const loginWithSocialMedia = (requestData) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(LOGIN_REQUEST));
    client
      .post(`/social_login`, requestData)
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
        resolve({ meta: { status: false } });
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
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

export const userProfileDetail = () => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(GET_USER_PROFILE_REQUEST));
    let state = getState();
    let userData = state.userState.userData
    let userId = null;
    if (userData) {
      userId = userData.id;
    }
    let requestData = {
      customer_id: userId
    }
    client
      .post(`/customer_profile`, requestData)
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
        resolve({ meta: { status: false } });
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
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

export const getChatConversation = (moderatorId) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    const userData = getState().userState.userData;
    let userId = null;
    if (userData) {
      userId = userData.id;
    }
    let requestData = {
      profile_id: userId,
      customer_id: moderatorId
    }
    client
      .post(`/get_chat_message`, requestData)
      .then((res) => {
        dispatch(userProfileDetail());
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Get Favorites
export const getFavorites = () => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    const userData = getState().userState.userData;
    let userId = null;
    if (userData) {
      userId = userData.id;
    }
    let requestData = {
      // customer_id: 5
      customer_id: userId
    }
    dispatch(ActionDispatcher(GET_BOOKMARKS_REQUEST));
    client
      .post(`/favorites`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_BOOKMARKS_SUCCESS, res.data));
        } else {
          dispatch(ActionDispatcher(GET_BOOKMARKS_FAILED));
        }
        resolve(res);
      })
      .catch((err) => {
        dispatch(ActionDispatcher(GET_BOOKMARKS_FAILED));
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Add to Favorite
export const addToFavorite = (favoriteId, action) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    const userData = getState().userState.userData;
    let userId = null;
    if (userData) {
      userId = userData.id;
    }
    let requestData = {
      action: action,
      favorite_id: favoriteId,
      customer_id: userId
    }
    client
      .post(`/addfevorite`, requestData)
      .then((res) => {
        dispatch(getFavorites());
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Get Friends
export const getFriendsList = () => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    const userData = getState().userState.userData;
    let userId = null;
    if (userData) {
      userId = userData.id;
    }
    let requestData = {
      customer_id: userId
    }
    client
      .post(`/get_friend_list`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_FRIENDS_LIST_SUCCESS, res.data))
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Get Friends
export const acceptRejectFriendRequest = (friendId, type) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    let requestData = {
      id: friendId,
      type: type
    }
    client
      .post(`/get_friend_accept_reject`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(getFriendsList())
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } });
        reject(err);
      });
  });