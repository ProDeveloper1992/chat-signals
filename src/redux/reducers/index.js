import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import userState from './user-state';
import appState from './app-state';
import flirtsState from './flirts-state';
import appModalState from './app-modals-state';
import bookmarkState from './bookmarks-state';
import { ActionDispatcher } from '../actions';

export const LOGOUT_USER = 'LOGOUT_USER';

const allReducers = combineReducers({
  userState: userState,
  appState: appState,
  appModalState: appModalState,
  flirtsState: flirtsState,
  bookmarkState: bookmarkState
});

export const logoutUser = (user) => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    // dispatch({
    //   type: LOGOUT_USER,
    // });
    dispatch(ActionDispatcher(LOGOUT_USER, true));
    resolve(true);
  });

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_USER) {
      Object.keys(state).forEach((key) => {
        AsyncStorage.removeItem(`persist:${key}`);
      });
      AsyncStorage.removeItem('userToken');
      state = undefined;
    }
  return allReducers(state, action);
};

export default rootReducer;
