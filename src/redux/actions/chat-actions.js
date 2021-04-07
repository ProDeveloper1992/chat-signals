import { client } from '../../services/api-service';
import { showToast } from './app-actions';
import { userProfileDetail } from './user-actions'

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
