import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import userState from './user-state';
import appState from './app-state';
import flirtsState from './flirts-state';
import appModalState from './app-modals-state';
import bookmarkState from './bookmarks-state';
import chatState from './chat-state';
import { ActionDispatcher } from '../actions';
import { client } from '../../services/api-service';
import { navigate } from '../../navigators/root-navigation';
import { wait } from '../../utils/common';
export const LOGOUT_USER = 'LOGOUT_USER';

const allReducers = combineReducers({
  userState: userState,
  appState: appState,
  appModalState: appModalState,
  flirtsState: flirtsState,
  bookmarkState: bookmarkState,
  chatState: chatState
});

export const logoutUser = () => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    const { userData } = getState().userState;
    let userId = null;
    if (userData) {
      userId = userData.id;
    }
    let requestData = {
      customer_id: userId
    }
    client
      .post(`/logout`, requestData)
      .then((res) => {
        if (res.meta.status) {
          wait(500).then(() => {
            dispatch(ActionDispatcher(LOGOUT_USER));
          })
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({ meta: { status: false } })
        reject(err);
      });
  });

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    console.log("LOGOUT_USER")
    console.log("state", state)
    Object.keys(state).forEach((key) => {
      AsyncStorage.removeItem(`persist:${key}`);
    });
    navigate('auth-stack');
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducer;
