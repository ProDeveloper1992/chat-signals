import { ActionDispatcher } from '.';
import { client } from '../../services/api-service';
import { showToast } from './app-actions';
import { GET_CHAT_CONVERSATION_FAILED, GET_CHAT_CONVERSATION_REQUEST, GET_CHAT_CONVERSATION_SUCCESS, GET_USER_CHAT_LIST_FAIL, GET_USER_CHAT_LIST_REQUEST, GET_USER_CHAT_LIST_SUCCESS } from './types';
import { userProfileDetail } from './user-actions'

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


export const sendMessage = (messageData) => (dispatch) =>
    new Promise(function (resolve, reject) {
        client
            .post(`/sendMessage`, messageData)
            .then((res) => {
                if (res.meta.status) {
                    dispatch(userProfileDetail())
                } else {
                    dispatch(showToast('negative', res.meta.message))
                }
                resolve(res);
            })
            .catch((err) => {
                resolve({ meta: { status: false } });
                reject(err);
            });
    });

export const deleteConversation = (moderatorId) => (dispatch, getState) =>
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
            .post(`/deleteConversation`, requestData)
            .then((res) => {
                if (res.meta.status) {
                    dispatch(getChatConversation(moderatorId));
                } else {
                    dispatch(showToast('negative', res.meta.message))
                }
                resolve(res);
            })
            .catch((err) => {
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
                if (res.meta.status) {
                    dispatch(getUserChatList());
                }
                resolve(res);
            })
            .catch((err) => {
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