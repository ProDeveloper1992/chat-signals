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
  GET_FRIENDS_LIST_SUCCESS,
  GET_CHAT_CONVERSATION_FAILED,
  GET_CHAT_CONVERSATION_REQUEST,
  GET_CHAT_CONVERSATION_SUCCESS,
  GET_CUSTOMER_LIKES_SUCCESS,
  GET_CUSTOMER_KISSES_SUCCESS,
  GET_CUSTOMER_HEARTS_SUCCESS,
  GET_HELP_TICKET_LIST_SUCCESS,
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
    dispatch(ActionDispatcher(GET_CHAT_CONVERSATION_REQUEST));
    client
      .post(`/get_chat_message`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_CHAT_CONVERSATION_SUCCESS, res.data));
        } else {
          dispatch(ActionDispatcher(GET_CHAT_CONVERSATION_FAILED));
        }
        resolve(res);
      })
      .catch((err) => {
        dispatch(ActionDispatcher(GET_CHAT_CONVERSATION_FAILED));
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Mark Conversation as Seen
export const markConversationAsSeen = (moderatorId) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    const userData = getState().userState.userData;
    let userId = null;
    if (userData) {
      userId = userData.id;
    }
    let requestData = {
      customer_id: moderatorId,
      id: userId,
    }
    client
      .post(`/makeseen`, requestData)
      .then((res) => {
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

//Accept or Reject Friend Request
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

//Pending APIS

//Open Gift Box
export const openGiftBox = () => (dispatch, getState) =>
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
      .post(`/open_gift_box`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(showToast('positive', res.meta.message));
          dispatch(userProfileDetail());
        } else {
          dispatch(showToast('negative', res.meta.message));
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Create Help and Support Ticket
export const createHelpTicket = (requestData) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    client
      .post(`/create_ticket`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(showToast('positive', res.meta.message));
          dispatch(getHelpTicketList());
        } else {
          dispatch(showToast('negative', res.meta.message));
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Get Kisses list for customer
export const getKissesList = () => (dispatch, getState) =>
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
      .post(`/customer_kiss_list`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_CUSTOMER_KISSES_SUCCESS, res.data));
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Get Likes list for customer
export const getLikesList = () => (dispatch, getState) =>
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
      .post(`/customer_like_list`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_CUSTOMER_LIKES_SUCCESS, res.data));
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Get Hearts list for customer
export const getHeartsList = () => (dispatch, getState) =>
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
      .post(`/customer_heart_list`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_CUSTOMER_HEARTS_SUCCESS, res.data));
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Get Stickers list for customer
export const getStickersList = () => (dispatch, getState) =>
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
      .post(`/get_stickers_list`, requestData)
      .then((res) => {
        if (res.meta.status) {
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Set Photo as Profile photo
export const setAsProfilePhoto = (photoId) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    const userData = getState().userState.userData;
    let userId = null;
    if (userData) {
      userId = userData.id;
    }
    let requestData = {
      customer_id: userId,
      // photoId
    }
    client
      .post(`/set_profile_photo`, requestData)
      .then((res) => {
        if (res.meta.status) {
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Delete Photo from Customer photos
export const deleteCustomerPhoto = (photoId) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    const userData = getState().userState.userData;
    let userId = null;
    if (userData) {
      userId = userData.id;
    }
    let requestData = {
      customer_id: userId,
      id: photoId
    }
    client
      .post(`/customer_delete_photo`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(showToast('positive', res.meta.message));
          dispatch(userProfileDetail());
        } else {
          dispatch(showToast('positive', res.meta.message));
        }
        resolve(res);
      })
      .catch((err) => {
        dispatch(showToast('positive', "Something went wrong! Try again!"));
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Delete Customer Account
export const deleteCustomerAccount = () => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    const userData = getState().userState.userData;
    let userId = null;
    if (userData) {
      userId = userData.id;
    }
    let requestData = {
      customer_id: userId,
    }
    client
      .post(`/delete_customer_account`, requestData)
      .then((res) => {
        if (res.meta.status) {
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } });
        reject(err);
      });
  });

//Get Help Tickets List
export const getHelpTicketList = () => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    let state = getState();
    let selectedLanguage = state.appState.selectedLanguage;
    const userData = state.userState.userData;
    let emailId = null;
    if (userData) {
      emailId = userData.email;
    }
    let requestData = {
      email: emailId,
      language: selectedLanguage,
    }
    client
      .post(`/help`, requestData)
      .then((res) => {
        if (res.meta.status) {
          dispatch(ActionDispatcher(GET_HELP_TICKET_LIST_SUCCESS, res.data));
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } })
        reject(err);
      });
  });

//Get User Ticket Response
export const getUserTicketResponse = (ticketId) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    let requestData = {
      ticket_id: ticketId
    }
    client
      .post(`/user_response_ticket`, requestData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } })
        reject(err);
      });
  });

//Send User Ticket Response
export const sendUserTicketMessage = (ticketId, message) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    let state = getState();
    let selectedLanguage = state.appState.selectedLanguage;
    let requestData = {
      ticket_id: ticketId,
      responseMessage: message,
      language: selectedLanguage
    }
    client
      .post(`/user_send_ticket`, requestData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } })
        reject(err);
      });
  });