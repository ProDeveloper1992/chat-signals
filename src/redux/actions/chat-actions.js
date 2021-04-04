import { client } from '../../services/api-service';

export const sendMessage = (messageData) => (dispatch) =>
    new Promise(function (resolve, reject) {
        client
            .post(`/sendMessage`, messageData)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                resolve({ meta: { status: false } });
                reject(err);
            });
    });
