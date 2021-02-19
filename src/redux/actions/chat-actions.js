import { ActionDispatcher } from './index';
import {
    GET_FLIRTS_REQUEST,
    GET_FLIRTS_SUCCESS,
    GET_FLIRTS_FAILED,
} from './types';
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
