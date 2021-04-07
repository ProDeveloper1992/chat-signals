import { client } from '../../services/api-service';
import { showToast } from './app-actions';
import { getChatConversation, userProfileDetail } from './user-actions'

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